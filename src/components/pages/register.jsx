"use client";
import React, {useState} from 'react';
import UserForm from "@/components/user-form";
import H1 from "@/components/UI/h1";

const Register = () => {

  const [step, setStep] = useState(1);

  return (
    <div className="page register ppt ppb">
      <div className="container">
        <div className="register__body">
          <H1 className="register__title">Регистрация</H1>
          <div className="register__content">
            <div className="register__form">
              {step === 1 && <UserForm setStep={setStep} type={'create'} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
