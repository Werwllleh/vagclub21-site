import AuthButton from "@/components/auth-button";
import H1 from "@/components/UI/h1";

const Page = () => {

  return (
    <div className="page ppt ppb">
      <div className="container">
        <div className="login-page">
          <H1 className="login-page__title pageTitle">Авторизация</H1>
          <div className="login-page__auth-button">
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
