import AuthButton from "@/components/auth-button";

const Page = () => {

  return (
    <div className="page ppt ppb">
      <div className="container">
        <div className="login-page">
          <h1 className="login-page__title h1">Авторизация</h1>
          <div className="login-page__auth-button">
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
