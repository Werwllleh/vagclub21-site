"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal, Form, Input } from "antd";
import {
  LockOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import authService from "@/services/auth.service";
import { customTheme } from "@/styles/theme";

const SecurityCard = styled.div`
  margin-top: 3.5rem;
  padding: 2.4rem;
  background-color: ${customTheme.color.lightBlue};
  border-radius: ${customTheme.radius.r20};
  border: 1px solid #e2e8f0;

  @media (max-width: ${customTheme.breakpoint.mobile}) {
    padding: 1.6rem;
  }
`;

const SecurityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: ${customTheme.color.primaryDark};
  }

  .icon {
    font-size: 2.2rem;
    color: ${customTheme.color.primary};
  }
`;

const SecurityDescription = styled.p`
  font-size: 1.4rem;
  color: ${customTheme.color.grey};
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 2rem;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  background-color: ${customTheme.color.white};
  border-radius: ${customTheme.radius.r10};
  font-size: 1.4rem;

  .label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: ${customTheme.color.primaryDark};
    font-weight: 500;
  }

  .value {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 1.3rem;
  }

  .status-active {
    color: ${customTheme.color.positive};
    font-weight: 500;
  }

  .status-inactive {
    color: ${customTheme.color.grey};
  }
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    font-size: 1.4rem;
    padding-inline: 2.4rem;
    padding-block: 1rem;
  }
`;

const StyledModalForm = styled(Form)`
  margin-top: 1.5rem;

  .ant-form-item {
    margin-bottom: 1.6rem;
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

  .modal-submit-btn {
    width: 100%;
    margin-top: 0.8rem;
    height: 4.4rem;
    font-size: 1.5rem;
  }
`;

const ProfileSecurity = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const email = user?.data?.email;
  const hasPassword = Boolean(user?.data?.hasPassword);
  const isTelegramLinked = Number(user?.data?.chatId) > 0;

  const openModal = () => {
    form.setFieldsValue({
      email: email || '',
      password: '',
      confirmPassword: '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const res = await authService.setCredentials({
        email: values.email,
        password: values.password,
        currentPassword: values.currentPassword,
      });

      if (res.status === 200) {
        toast.success('Данные для входа успешно сохранены!');
        queryClient.invalidateQueries({ queryKey: ['user'] });
        closeModal();
      }
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Ошибка сохранения данных';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SecurityCard>
        <SecurityHeader>
          <SafetyCertificateOutlined className="icon" />
          <h3>Безопасность и вход</h3>
        </SecurityHeader>
        <SecurityDescription>
          Вы можете привязать Email и пароль к вашему аккаунту, чтобы входить на сайт без использования Telegram.
        </SecurityDescription>

        <StatusList>
          <StatusRow>
            <span className="label">
              <MailOutlined />
              Email
            </span>
            <span className="value">
              {email ? (
                <span className="status-active">
                  <CheckCircleOutlined /> {email}
                </span>
              ) : (
                <span className="status-inactive">
                  <ExclamationCircleOutlined /> Не привязан
                </span>
              )}
            </span>
          </StatusRow>

          <StatusRow>
            <span className="label">
              <KeyOutlined />
              Пароль
            </span>
            <span className="value">
              {hasPassword ? (
                <span className="status-active">
                  <CheckCircleOutlined /> Установлен
                </span>
              ) : (
                <span className="status-inactive">
                  <ExclamationCircleOutlined /> Не установлен
                </span>
              )}
            </span>
          </StatusRow>

          <StatusRow>
            <span className="label">
              <LockOutlined />
              Вход через Telegram
            </span>
            <span className="value">
              {isTelegramLinked ? (
                <span className="status-active">
                  <CheckCircleOutlined /> Подключен
                </span>
              ) : (
                <span className="status-inactive">Не подключен</span>
              )}
            </span>
          </StatusRow>
        </StatusList>

        <ActionRow>
          <Button
            type="primary"
            className="btn default"
            onClick={openModal}
          >
            {hasPassword ? 'Изменить Email или пароль' : 'Установить Email и пароль'}
          </Button>
        </ActionRow>
      </SecurityCard>

      <Modal
        title={hasPassword ? 'Смена Email и пароля' : 'Установка Email и пароля'}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
        destroyOnClose
      >
        <StyledModalForm
          form={form}
          layout="vertical"
          variant="filled"
          onFinish={handleSubmit}
          disabled={isSubmitting}
          requiredMark={false}
        >
          {hasPassword && (
            <Form.Item
              label="Текущий пароль"
              name="currentPassword"
              rules={[{ required: true, message: 'Введите текущий пароль для подтверждения' }]}
            >
              <Input.Password placeholder="Текущий пароль" autoComplete="current-password" />
            </Form.Item>
          )}

          <Form.Item
            label="Email для входа"
            name="email"
            rules={[
              { required: true, message: 'Введите адрес email' },
              { type: 'email', message: 'Некорректный формат email' },
            ]}
          >
            <Input placeholder="example@mail.ru" autoComplete="email" />
          </Form.Item>

          <Form.Item
            label="Новый пароль"
            name="password"
            rules={[
              { required: true, message: 'Введите новый пароль' },
              { min: 6, message: 'Пароль должен быть не менее 6 символов' },
            ]}
          >
            <Input.Password placeholder="Минимум 6 символов" autoComplete="new-password" />
          </Form.Item>

          <Form.Item
            label="Повторите пароль"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Повторите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Повторите пароль" autoComplete="new-password" />
          </Form.Item>

          <Button
            className="btn default l modal-submit-btn"
            type="primary"
            htmlType="submit"
            loading={isSubmitting}
          >
            Сохранить данные
          </Button>
        </StyledModalForm>
      </Modal>
    </>
  );
};

export default ProfileSecurity;
