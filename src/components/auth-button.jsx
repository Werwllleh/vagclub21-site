"use client"
import {Button} from "antd";
import AuthService from "@/services/auth.service";
import {loginData} from "@/data/test";
import {LoginButton} from "@telegram-auth/react";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {useEffect, useState} from "react";

const AuthButton = () => {

  const [domain, setDomain] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname);
    }
  }, []);

  const loginHandler = async (data) => {
    const response = await AuthService.login(data);
    if (response.status !== 200) return toast.error('Ошибка авторизации');

    toast.success('Успешная авторизация!');
    redirect(PUBLIC_PAGES.HOME.URL);
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
