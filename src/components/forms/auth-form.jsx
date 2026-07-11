"use client"
import styled from "styled-components";
import AuthButton from "@/components/auth-button";
import {useUser} from "@/hooks/useUser";
import Loading from "@/app/loading";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {PAGE} from "@/constants";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";


const AuthFormWrap = styled.div`
`

const AuthFormBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
`

const AuthFormTitle = styled.h2`
    font-size: clamp(1.6rem, 3vw, 2.6rem);
    font-weight: 500;
`


const AuthFormTg = styled.div`
    display: flex;
    justify-content: center;
`

const AuthFormInner = styled.div`
`

const AuthForm = ({onClose}) => {

  const router = useRouter();

  const {user, isLoading} = useUser();

  useEffect(() => {
    if (user && user?.data) {
      onClose();
    }
  }, [user, isLoading]);

  return (
    <AuthFormWrap>
      <AuthFormBody>
        <AuthFormTitle as={"p"}>Авторизация</AuthFormTitle>
        <AuthFormInner>
          {isLoading && !user ? (
            <Loading/>
          ) : (
            <>
              {!isLoading && !user && !user?.data && (
                <AuthFormTg>
                  <AuthButton/>
                </AuthFormTg>
              )}
            </>
          )}
        </AuthFormInner>
      </AuthFormBody>
    </AuthFormWrap>
  );
};

export default AuthForm;
