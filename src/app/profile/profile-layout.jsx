'use client'
import {useUser} from "@/hooks/useUser";
import {Avatar, Button, Form, Input} from "antd";
import {useState} from "react";
import UserService from "@/services/user.service";


const ProfileLayout = () => {
  const { isLoading, user } = useUser();
  const [isPendingForm, setIsPendingForm] = useState(false);


  const handleUpdateUserData = async (values) => {
    console.log(values);

    try {
      setIsPendingForm(true);

      const response = await UserService.updateUserData(values)

      console.log(response)

      if (!response) return

      setIsPendingForm(false);

    } catch (err) {
      console.log(err)
      setIsPendingForm(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-page__title">Профиль</h1>
        {user && (
          <>
            <div className="profile-page__grid">
              <div className="profile-page__avatar">
                <Avatar src={user?.userPhoto || false} />
              </div>
              <div className="profile-page__user">
                <Form
                  className="profile-page__user_form"
                  layout="vertical"
                  variant="filled"
                  disabled={isPendingForm}
                  onFinish={handleUpdateUserData}
                  initialValues={{
                    userName: user?.data?.user_name,
                    userInstagram: user?.data?.user_instagram,
                  }}
                >
                  <div className="profile-page__user_form_fields">
                    <Form.Item label="Имя профиля" name="userName">
                      <Input />
                    </Form.Item>
                    <Form.Item label="Профиль в Instagram" name="userInstagram">
                      <Input placeholder="" />
                    </Form.Item>
                  </div>
                  <div className="profile-page__user_form_footer">
                    <Button className="style-btn style-btn-default" type="primary" htmlType="submit">
                      Обновить данные
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
