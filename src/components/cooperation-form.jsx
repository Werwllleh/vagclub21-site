'use client'
import {Button, Form, Input} from "antd";
import Link from "next/link";
import {MaskedInput} from "antd-mask-input";

const phoneRegex = /^\+7\s?\(\d{3}\)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const CooperationForm = () => {

  const [form] = Form.useForm();

  const submitHandler = async (values) => {
    console.log(values);
  }

  return (
    <div className="cooperation-form">
      <div className="container">
        <div className="cooperation-form__body">
          <h3 className="cooperation-form__title">Оставьте заявку на партнерство с нами</h3>
          <Form
            className="cooperation-form__form"
            requiredMark={false}
            form={form}
            onFinish={submitHandler}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Введите ваше имя',
                }
              ]}>
              <Input placeholder="Ваше имя" allowClear/>
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Укажите номер телефона',
                },
                {
                  pattern: phoneRegex,
                  message: 'Укажите номер телефона полностью',
                },
              ]}
            >
              <MaskedInput
                mask="+7 (000)-000-00-00"
              />
            </Form.Item>
            <Form.Item>
              <Button className="style-btn" type="primary" htmlType="submit">
                Отправить
              </Button>
            </Form.Item>
          </Form>
          <p className="cooperation-form__note">
            Нажимая на&nbsp;кнопку, вы&nbsp;даете согласие на&nbsp;обработку персональных данных и&nbsp;соглашаетесь
            с&nbsp;
            <Link href={'/'} target='_blank'>политикой конфиденциальности</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CooperationForm;
