'use client'
import {LoginButton} from "@telegram-auth/react";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";
import { TG_AUTH_REDIRECT_URL } from '@/constants'

const AuthTelegram = () => {
  return (
    <div>
      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
        // authCallbackUrl={TG_AUTH_REDIRECT_URL}
        onAuthCallback={async (data) => {
          console.log('Data from Telegram: ', data);
          await AuthService.login(data)

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
