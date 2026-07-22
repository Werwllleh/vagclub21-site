"use client"
import {Button} from "antd";
import AuthService from "@/services/auth.service";
import {loginData} from "@/data/test";
import {LoginButton} from "@telegram-auth/react";
import toast from "react-hot-toast";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

const AuthButton = () => {

  const [domain, setDomain] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data) => AuthService.login(data),
    onSuccess: (response) => {
      if (response.status === 200) {
        // без await: invalidate обновляет пользователя в фоне
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.success('Успешная авторизация!');
        // полная навигация вместо router.push: клиентский Router Cache хранит
        // /profile как redirect на /login (закешировано до авторизации), из-за
        // чего push возвращал обратно на /login
        window.location.assign(PROTECTED_PAGES.PROFILE);
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
