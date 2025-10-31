"use client";
import React, {useState} from 'react';
import UserForm from "@/components/user-form";

const Register = () => {

  const [step, setStep] = useState(1);

  return (
    <div className="page register">
      <div className="container">
        <div className="register__body">
          <h1 className="register__title">Регистрация</h1>
          <div className="register__content">
            <div className="register__form">
              {step === 1 && <UserForm setStep={setStep} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
