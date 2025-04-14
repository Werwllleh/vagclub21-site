'use client'
import {useUser} from "@/hooks/useUser";
import {Avatar, Button, Form, Input} from "antd";
import {useState} from "react";
import UserService from "@/services/user.service";
import Loader from "@/components/loader";
import toast from "react-hot-toast";
import ProfileCarForm from "@/components/pages/profile/profile-car-form";


const ProfileLayout = () => {

  const {isLoading, user} = useUser();
  const [isPendingForm, setIsPendingForm] = useState(false);

  const handleUpdateUserData = async (values) => {
    // console.log(values);

    try {
      setIsPendingForm(true);

      const response = await UserService.updateUserData(values)

      if (!response) return

      setIsPendingForm(false);

      toast.success("Данные обновлены")

    } catch (err) {
      setIsPendingForm(false);
      toast.error("Ошибка при обновлении")
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-page__title">Профиль</h1>
        {isLoading && <Loader/>}
        {user && (
          <>
            <div className="profile-page__grid">
              <div className="profile-page__avatar">
                <Avatar src={user?.userPhoto || false}/>
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
                      <Input/>
                    </Form.Item>
                    <Form.Item label="Профиль в Instagram" name="userInstagram">
                      <Input placeholder=""/>
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
            {!!user?.data?.cars.length && (
              <div className="profile-page__cars">
                {user.data.cars.map((car) => {
                  return <ProfileCarForm key={car.car_number} car={car} />
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileLayout;
