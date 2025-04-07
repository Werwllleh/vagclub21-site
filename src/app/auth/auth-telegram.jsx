'use client'
import {LoginButton} from "@telegram-auth/react";
import AuthService from "@/services/auth.service";
import UserService from "@/services/user.service";

const AuthTelegram = () => {
  return (
    <div>
      <LoginButton
        botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
        // authCallbackUrl="/"
        onAuthCallback={async (data) => {
          console.log('Data from Telegram: ', data);

          const response = await UserService.fetchUser(data.id)
          console.log(response)
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
