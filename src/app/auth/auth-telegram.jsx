'use client'
import {LoginButton} from "@telegram-auth/react";
import AuthTokenService from "@/services/auth-token.service";

const AuthTelegram = () => {
  return (
    <div>
      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
        // authCallbackUrl="/"
        onAuthCallback={(data) => {

          AuthTokenService.saveAccessToken(JSON.stringify(data));

          console.log(data);
        }}
        buttonSize="medium" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="ru"
      />
    </div>
  );
};

export default AuthTelegram;
