"use client"
import {Button} from "antd";
import AuthService from "@/services/auth.service";
import {loginData} from "@/data/test";
import {LoginButton} from "@telegram-auth/react";

const AuthButton = () => {



  return (
    <>
      <Button
        className="style-btn style-btn-primary"
        type="primary"
        onClick={async () => {
          await AuthService.login(loginData)
        }}
      >
        Войти
      </Button>
      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
        onAuthCallback={async (data) => {
          await AuthService.login(data)
        }}
        buttonSize="medium" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="ru"
      />
    </>
  );
};

export default AuthButton;
