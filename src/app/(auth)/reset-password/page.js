import ResetPasswordForm from "@/components/forms/reset-password-form";

export const metadata = {
  title: 'Сброс пароля',
  description: 'Установка нового пароля для аккаунта VAGClub21',
  robots: { index: false, follow: false },
};

const Page = () => {
  return (
    <div className="page ppt ppb">
      <div className="container">
        <div className="login-page">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default Page;
