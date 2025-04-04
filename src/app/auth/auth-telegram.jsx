'use client'
import {LoginButton} from "@telegram-auth/react";

const AuthTelegram = () => {
  return (
    <div>
      <LoginButton
        botUsername={"VW21ClubBot"}
        // botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME}
        authCallbackUrl="vagclub21-site.vercel.app"
        buttonSize="large" // "large" | "medium" | "small"
        cornerRadius={5} // 0 - 20
        showAvatar={true} // true | false
        lang="ru"
      />
    </div>
  );
};

export default AuthTelegram;
