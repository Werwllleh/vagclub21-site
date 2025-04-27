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
    mutationFn: async (data) => await AuthService.login(data),
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success('Успешная авторизация!');
        await queryClient.invalidateQueries(['user']);
        router.push(PUBLIC_PAGES.HOME.URL);
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
        className="style-btn style-btn-primary"
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
