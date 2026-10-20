import AuthForm from "@/components/forms/auth-form";

export const metadata = {
  title: 'Вход в аккаунт',
  description: 'Авторизация в автомобильном сообществе VAGClub21',
  robots: { index: false, follow: false },
};

const Page = () => {
  return (
    <div className="page ppt ppb">
      <div className="container">
        <div className="login-page">
          <AuthForm redirectOnSuccess={true} />
        </div>
      </div>
    </div>
  );
};

export default Page;
