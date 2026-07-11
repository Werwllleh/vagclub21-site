"use client"
import {Button} from "antd";
import AuthService from "@/services/auth.service";
import {loginData} from "@/data/test";
import {LoginButton} from "@telegram-auth/react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

const AuthButton = () => {

  const [domain, setDomain] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data) => AuthService.login(data),
    onSuccess: async (response) => {
      if (response.status === 200) {
        await queryClient.refetchQueries(['user']);
        toast.success('Успешная авторизация!');
        router.push(PROTECTED_PAGES.PROFILE);
      } else {
        toast.error('Ошибка авторизации');
      }
    },
    onError: (error) => {
      toast.error('Ошибка при выполнении запроса');
    },
  });

  const loginHandler = async (data) => {
    loginMutation.mutate(data);
  }

  if (domain === 'localhost') {
    return (
      <Button
        className="btn default l"
        type="primary"
        onClick={() => loginHandler(loginData)}
      >
        Войти
      </Button>
    )
  }

  return (
    <LoginButton
      botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
      onAuthCallback={async (data) => {
        await loginHandler(data)
      }}
      buttonSize="medium" // "large" | "medium" | "small"
      cornerRadius={5} // 0 - 20
      showAvatar={true} // true | false
      lang="ru"
    />
  );
};

export default AuthButton;
