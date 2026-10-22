"use client"
import styled from "styled-components";
import {useState, useEffect} from "react";
import {Form, Input, Button} from "antd";
import {useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import AuthButton from "@/components/auth-button";
import {useUser} from "@/hooks/useUser";
import Loading from "@/components/loading";
import authService from "@/services/auth.service";
import {PROTECTED_PAGES} from "@/config/pages/protected.config";
import {customTheme} from "@/styles/theme";

const AuthFormWrap = styled.div`
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
`;

const AuthFormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.6rem;
`;

const AuthFormTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 500;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const TabSwitcher = styled.div`
  display: flex;
  background-color: ${customTheme.color.lightBlue};
  border-radius: ${customTheme.radius.r20};
  padding: 0.4rem;
  gap: 0.5rem;
`;

const TabButton = styled.button`
  flex: 1;
  border-radius: ${customTheme.radius.r15};
  font-family: ${customTheme.font.primary};
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 1.6rem;
  border: none;
  cursor: pointer;
  background-color: ${({$active}) => ($active ? customTheme.color.primary : 'transparent')};
  color: ${({$active}) => ($active ? customTheme.color.white : customTheme.color.primaryDark)};
  transition: all 0.2s ease;

  &:hover {
    color: ${({$active}) => ($active ? customTheme.color.white : customTheme.color.primary)};
  }
`;

const StyledForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 1.4rem;
  }

  .ant-form-item-label > label {
    font-size: 1.3rem;
    font-weight: 500;
  }

  .ant-input,
  .ant-input-password {
    border-radius: 6px;
    font-size: 1.4rem;
  }

  .submit-btn {
    width: 100%;
    margin-top: 0.6rem;
    height: 4.4rem;
    font-size: 1.5rem;
  }
`;

const DividerWrap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${customTheme.color.grey};
  font-size: 1.3rem;
  margin: 1.2rem 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  span {
    padding: 0 1rem;
  }
`;

const TgButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  .btn {
    width: 100%;
    justify-content: center;
    height: 4.4rem;
  }
`;

const ForgotPasswordRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -0.6rem;
  margin-bottom: 1.2rem;

  .forgot-btn {
    background: none;
    border: none;
    padding: 0;
    color: ${customTheme.color.primary};
    font-size: 1.25rem;
    cursor: pointer;
    text-decoration: underline;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const ForgotDescription = styled.p`
  font-size: 1.35rem;
  color: ${customTheme.color.grey};
  line-height: 1.5;
  margin-bottom: 1.6rem;
  text-align: center;
`;

const SuccessMessageBox = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 1.4rem;
  border-radius: ${customTheme.radius.r10};
  font-size: 1.35rem;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 1.6rem;
`;

const BackToLoginButton = styled.button`
  background: none;
  border: none;
  color: ${customTheme.color.primary};
  font-size: 1.35rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.2rem;
  width: 100%;
  justify-content: center;
  font-family: inherit;

  &:hover {
    text-decoration: underline;
  }
`;

const AuthForm = ({
  onClose,
  redirectTo = PROTECTED_PAGES.PROFILE,
  redirectOnSuccess,
}) => {
  const shouldRedirect = redirectOnSuccess !== undefined ? redirectOnSuccess : !onClose;
  const [activeTab, setActiveTab] = useState("login"); // "login" | "register"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const queryClient = useQueryClient();

  const {user, isLoading} = useUser();

  useEffect(() => {
    if (user && user?.data && onClose) {
      onClose();
    }
  }, [user, onClose]);

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await authService.loginCredentials({
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.success('Успешная авторизация!');
        if (onClose) onClose();
        if (shouldRedirect) {
          window.location.assign(redirectTo);
        }
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Ошибка авторизации';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await authService.forgotPassword({
        email: values.email,
      });

      if (res.status === 200) {
        setForgotSent(true);
        toast.success('Инструкция отправлена!');
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Ошибка при отправке запроса';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await authService.registerCredentials({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        queryClient.invalidateQueries({queryKey: ['user']});
        toast.success('Регистрация успешна!');
        if (onClose) onClose();
        if (shouldRedirect) {
          window.location.assign(redirectTo);
        }
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Ошибка при регистрации';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTelegramSuccess = () => {
    if (onClose) onClose();
    if (shouldRedirect) {
      window.location.assign(redirectTo);
    }
  };

  if (isLoading && !user) {
    return (
      <AuthFormWrap>
        <Loading />
      </AuthFormWrap>
    );
  }

  return (
    <AuthFormWrap>
      <AuthFormBody>
        <AuthFormTitle>
          {showForgot
            ? "Восстановление пароля"
            : activeTab === "login"
            ? "Вход в аккаунт"
            : "Регистрация"}
        </AuthFormTitle>

        {!showForgot && (
          <TabSwitcher>
            <TabButton
              type="button"
              $active={activeTab === "login"}
              onClick={() => {
                setActiveTab("login");
                setShowForgot(false);
              }}
            >
              Вход
            </TabButton>
            <TabButton
              type="button"
              $active={activeTab === "register"}
              onClick={() => {
                setActiveTab("register");
                setShowForgot(false);
              }}
            >
              Регистрация
            </TabButton>
          </TabSwitcher>
        )}

        {showForgot ? (
          <div>
            {forgotSent ? (
              <>
                <SuccessMessageBox>
                  Ссылка для сброса пароля отправлена! Проверьте Telegram-бот <b>VW21AuthBot</b> или вашу электронную почту. Ссылка действует 1 час.
                </SuccessMessageBox>
                <BackToLoginButton
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotSent(false);
                    forgotForm.resetFields();
                  }}
                >
                  ← Вернуться ко входу
                </BackToLoginButton>
              </>
            ) : (
              <>
                <ForgotDescription>
                  Введите ваш email, и мы отправим ссылку для установки нового пароля в Telegram или на почту.
                </ForgotDescription>
                <StyledForm
                  form={forgotForm}
                  layout="vertical"
                  variant="filled"
                  onFinish={handleForgot}
                  disabled={isSubmitting}
                  requiredMark={false}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: 'Введите адрес email' },
                      { type: 'email', message: 'Некорректный формат email' },
                    ]}
                  >
                    <Input placeholder="example@mail.ru" autoComplete="email" />
                  </Form.Item>

                  <Button
                    className="btn default l submit-btn"
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Отправить ссылку
                  </Button>
                </StyledForm>
                <BackToLoginButton
                  type="button"
                  onClick={() => {
                    setShowForgot(false);
                    setForgotSent(false);
                  }}
                >
                  ← Назад ко входу
                </BackToLoginButton>
              </>
            )}
          </div>
        ) : activeTab === "login" ? (
          <StyledForm
            form={loginForm}
            layout="vertical"
            variant="filled"
            onFinish={handleLogin}
            disabled={isSubmitting}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {required: true, message: 'Введите адрес email'},
                {type: 'email', message: 'Некорректный формат email'},
              ]}
            >
              <Input placeholder="example@mail.ru" autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[{required: true, message: 'Введите пароль'}]}
            >
              <Input.Password placeholder="Ваш пароль" autoComplete="current-password" />
            </Form.Item>

            <ForgotPasswordRow>
              <button
                type="button"
                className="forgot-btn"
                onClick={() => {
                  setShowForgot(true);
                  setForgotSent(false);
                }}
              >
                Забыли пароль?
              </button>
            </ForgotPasswordRow>

            <Button
              className="btn default l submit-btn"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Войти
            </Button>
          </StyledForm>
        ) : (
          <StyledForm
            form={registerForm}
            layout="vertical"
            variant="filled"
            onFinish={handleRegister}
            disabled={isSubmitting}
            requiredMark={false}
          >
            <Form.Item
              label="Имя"
              name="name"
              rules={[
                {required: true, message: 'Введите ваше имя'},
                {min: 2, message: 'Минимум 2 символа'},
              ]}
            >
              <Input placeholder="Как к вам обращаться" autoComplete="name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {required: true, message: 'Введите адрес email'},
                {type: 'email', message: 'Некорректный формат email'},
              ]}
            >
              <Input placeholder="example@mail.ru" autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                {required: true, message: 'Придумайте пароль'},
                {min: 6, message: 'Пароль должен быть не менее 6 символов'},
              ]}
            >
              <Input.Password
                placeholder="Минимум 6 символов"
                autoComplete="new-password"
              />
            </Form.Item>

            <Button
              className="btn default l submit-btn"
              type="primary"
              htmlType="submit"
              loading={isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </StyledForm>
        )}

        {!showForgot && (
          <>
            <DividerWrap>
              <span>или через Telegram</span>
            </DividerWrap>

            <TgButtonWrap>
              <AuthButton onSuccess={handleTelegramSuccess} redirectTo={redirectTo} />
            </TgButtonWrap>
          </>
        )}
      </AuthFormBody>
    </AuthFormWrap>
  );
};

export default AuthForm;
