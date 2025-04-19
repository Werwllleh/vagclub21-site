import React from 'react';
import AuthButton from "@/components/auth-button";

const Page = () => {

  return (
    <div className="page">
      <div className="container">
        <div className="login-page">
          <h1 className="login-page__title">Войти</h1>
          <div className="login-page__auth-button">
            <AuthButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
