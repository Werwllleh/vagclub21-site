"use client";
import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import UserService from "@/services/user.service";
import toast from "react-hot-toast";

const UserForm = ({initialValues, type, setStep}) => {

  const [form] = Form.useForm();

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const submitForm = async (values) => {

    setIsSubmittingForm(true);

    if (type === 'create') {
      const res = await UserService.createUser(values);

      if (res.status === 200 || res.status === 409) {
        setStep(2)
        form.resetFields()
        setIsSubmittingForm(false);
      } else {
        toast.success(res.data.message)
        setIsSubmittingForm(false);
      }
    }

    if (type === 'update') {
      const res = await UserService.updateUser(values);

      if (res.status === 200 || res.status === 409) {
        setStep(2)
        form.resetFields()
        setIsSubmittingForm(false);
      } else {
        toast.success(res.data.message)
        setIsSubmittingForm(false);
      }
    }

  }

  return (
    <div className="user-form">
      <Form
        form={form}
        className="user-form__form"
        layout="vertical"
        variant="filled"
        disabled={isSubmittingForm}
        onFinish={submitForm}
        initialValues={initialValues}
        requiredMark={false}
      >
        <div className="user-form__form--fields">
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Обязательное поле!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item label="Профиль в Instagram" name="instagram">
            <Input placeholder=""/>
          </Form.Item>
        </div>
        <div className="user-form__form--footer">
          <Button className="style-btn style-btn-default" type="primary" htmlType="submit">
            Отправить
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserForm;
