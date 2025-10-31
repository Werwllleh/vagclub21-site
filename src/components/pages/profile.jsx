'use client'
import {useUser} from "@/hooks/useUser";
import {Avatar, Button, Modal} from "antd";
import {useEffect, useState} from "react";
import Loader from "@/components/loader";
import ProfileCarForm from "@/components/pages/profile/profile-car-form";
import UserForm from "@/components/user-form";


const Profile = () => {

  const {isLoading, user} = useUser();

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectCarData, setSelectCarData] = useState({});

  const handleOpenModal = (data) => {
    setSelectCarData(data);
    setIsModalActive(true);
  }

  const handleCloseModal = () => {
    setIsModalActive(false);
    setSelectCarData({});
  }

  return (
    <>
      <div className="page profile-page">
        <div className="container">
          <h1 className="profile-page__title">Профиль</h1>
          {isLoading && <Loader/>}
          {isLoading ? <Loader/> : (
            user && Object.values(user).length ? (
              <div className="profile-page__grid">
                <div className="profile-page__avatar">
                  <Avatar src={user?.userPhoto || false}/>
                </div>
                <div className="profile-page__user">
                  <UserForm type={'update'} initialValues={{
                    name: user?.data?.name,
                    instagram: user?.data?.instagram,
                  }}/>
                </div>
                {!!user?.data?.cars.length && (
                  <div className="profile-page__cars">
                    {user.data.cars.map((car) => {
                      // console.log(car)
                      return (
                        <Button
                          key={car.car_number}
                          onClick={() => handleOpenModal(car)}
                          type="primary"
                          className="style-btn style-btn-default profile-page__cars_button"
                        >
                          {car.car_number}
                        </Button>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : ''
          )}
        </div>
      </div>
      <Modal open={isModalActive} onCancel={handleCloseModal} footer={false}>
        <ProfileCarForm onClose={handleCloseModal} key={selectCarData.car_number} car={selectCarData}/>
      </Modal>
    </>
  );
};

export default Profile;
