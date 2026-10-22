"use client";
import React, { useState, Suspense } from "react";
import styled from "styled-components";
import { Form, Input, Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import authService from "@/services/auth.service";
import Loading from "@/components/loading";
import { customTheme } from "@/styles/theme";

const FormWrap = styled.div`
  width: 100%;
  max-width: 42rem;
  margin: 0 auto;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.6rem;
`;

const FormTitle = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 500;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const FormSubtitle = styled.p`
  font-size: 1.35rem;
  color: ${customTheme.color.grey};
  line-height: 1.5;
  text-align: center;
  margin-bottom: 0.5rem;
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
    margin-top: 0.8rem;
    height: 4.4rem;
    font-size: 1.5rem;
  }
`;

const MessageBox = styled.div`
  background-color: ${({ $success }) => ($success ? "#f0fdf4" : "#fef2f2")};
  border: 1px solid ${({ $success }) => ($success ? "#bbf7d0" : "#fecaca")};
  color: ${({ $success }) => ($success ? "#166534" : "#991b1b")};
  padding: 1.6rem;
  border-radius: ${customTheme.radius.r10};
  font-size: 1.4rem;
  line-height: 1.6;
  text-align: center;
`;

const ActionButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.4rem;
  font-size: 1.5rem;
  border-radius: ${customTheme.radius.r15};
  background-color: ${customTheme.color.primary};
  color: ${customTheme.color.white};
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    color: ${customTheme.color.white};
  }
`;

const ResetPasswordInner = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (values) => {
    if (!token) {
      toast.error("Токен сброса пароля отсутствует");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await authService.resetPassword({
        token,
        password: values.password,
      });

      if (res.status === 200) {
        setIsSuccess(true);
        toast.success("Пароль успешно обновлён!");
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.message ||
        "Ошибка при установке нового пароля";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <FormWrap>
        <FormBody>
          <FormTitle>Сброс пароля</FormTitle>
          <MessageBox $success={false}>
            Ссылка для сброса пароля недействительна или не содержит токена.
            Попробуйте запросить сброс пароля заново на странице входа.
          </MessageBox>
          <ActionButton href="/login">Перейти ко входу</ActionButton>
        </FormBody>
      </FormWrap>
    );
  }

  if (isSuccess) {
    return (
      <FormWrap>
        <FormBody>
          <FormTitle>Пароль изменён</FormTitle>
          <MessageBox $success={true}>
            Новый пароль успешно сохранён! Теперь вы можете войти в аккаунт с
            новым паролем.
          </MessageBox>
          <ActionButton href="/login">Войти в аккаунт</ActionButton>
        </FormBody>
      </FormWrap>
    );
  }

  return (
    <FormWrap>
      <FormBody>
        <FormTitle>Новый пароль</FormTitle>
        <FormSubtitle>
          Придумайте новый надёжный пароль (минимум 6 символов)
        </FormSubtitle>

        <StyledForm
          form={form}
          layout="vertical"
          variant="filled"
          onFinish={handleSubmit}
          disabled={isSubmitting}
          requiredMark={false}
        >
          <Form.Item
            label="Новый пароль"
            name="password"
            rules={[
              { required: true, message: "Введите новый пароль" },
              { min: 6, message: "Пароль должен быть не менее 6 символов" },
            ]}
          >
            <Input.Password
              placeholder="Минимум 6 символов"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            label="Повторите пароль"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Повторите новый пароль" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Повторите пароль"
              autoComplete="new-password"
            />
          </Form.Item>

          <Button
            className="btn default l submit-btn"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            Сохранить пароль
          </Button>
        </StyledForm>
      </FormBody>
    </FormWrap>
  );
};

const ResetPasswordForm = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordInner />
    </Suspense>
  );
};

export default ResetPasswordForm;
