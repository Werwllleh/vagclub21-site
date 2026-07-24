"use client"
import {Button} from "antd";
import AuthService from "@/services/auth.service";
import {loginData} from "@/data/test";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";

// Иконка Telegram (самолётик)
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="1.6em" height="1.6em" fill="currentColor" aria-hidden="true">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71l-4.14-3.05-1.99 1.93c-.23.23-.42.42-.83.42z"/>
  </svg>
);

const AuthButton = () => {

  const [domain, setDomain] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDomain(window.location.hostname);
    }
  }, []);

  // Подгружаем официальный скрипт Telegram — он даёт window.Telegram.Login.auth (popup)
  useEffect(() => {
    if (document.getElementById('telegram-widget-script')) return;
    const script = document.createElement('script');
    script.id = 'telegram-widget-script';
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    document.body.appendChild(script);
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
    onError: () => {
      toast.error('Ошибка при выполнении запроса');
    },
  });

  const loginHandler = (data) => {
    loginMutation.mutate(data);
  }

  // Открытие popup-авторизации Telegram по клику на нашу кнопку
  const openTelegramLogin = () => {
    const botId = process.env.NEXT_PUBLIC_BOT_ID;

    if (!window.Telegram?.Login?.auth) {
      toast.error('Telegram ещё загружается, попробуйте ещё раз');
      return;
    }

    window.Telegram.Login.auth(
      {bot_id: botId, request_access: 'write'},
      (data) => {
        // data === false, если пользователь закрыл окно
        if (data) loginHandler(data);
      },
    );
  };

  // На localhost popup Telegram недоступен (домен привязан к боту) — тестовый вход
  const onClick = domain === 'localhost'
    ? () => loginHandler(loginData)
    : openTelegramLogin;

  return (
    <Button
      className="btn default l"
      type="primary"
      onClick={onClick}
      loading={loginMutation.isPending}
      icon={<TelegramIcon/>}
    >
      Войти через Telegram
    </Button>
  );
};

export default AuthButton;
