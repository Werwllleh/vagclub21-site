'use client'
import {useUser} from "@/hooks/useUser";
import {Avatar, Button, Modal} from "antd";
import {useEffect, useState} from "react";
import Loader from "@/components/loader";
import ProfileCarForm from "@/components/pages/profile/profile-car-form";
import UserForm from "@/components/user-form";
import {useUserCars} from "@/hooks/useUserCars";
import CarForm from "@/components/car-form";
import ProfileCarCard from "@/components/profile-car-card";
import {PlusOutlined} from "@ant-design/icons";

// import dynamic from 'next/dynamic'


const Profile = () => {

  const {isLoading, user} = useUser();
  const {isLoading: userCarsLoading, userCars} = useUserCars();

  const [mounted, setMounted] = useState(false);

  const [isModalActive, setIsModalActive] = useState(false);
  const [selectCarData, setSelectCarData] = useState({});

  const [isModalAddCarActive, setIsModalAddCarActive] = useState(false);
  const openAddCarModal = () => {
    setIsModalAddCarActive(true)
  }
  const closeAddCarModal = () => {
    setIsModalAddCarActive(false)
  }

  useEffect(() => {
    console.log(userCars)
  }, [userCars]);


  const handleOpenModal = (data) => {
    setSelectCarData(data);
    setIsModalActive(true);
  }

  const handleCloseModal = () => {
    setIsModalActive(false);
    setSelectCarData({});
  }

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <>
      <div className="page profile">
        <div className="container">
          <h1 className="profile__title">Профиль</h1>
          {isLoading && <Loader/>}
          {!isLoading && user && Object.values(user).length && (
            <div className="profile__body">
              <div className="profile__top">
                <div className="profile__avatar">
                  <Avatar src={user?.userPhoto || false}/>
                </div>
                <div className="profile__user">
                  <UserForm type={'update'} initialValues={{
                    name: user?.data?.name,
                    instagram: user?.data?.instagram,
                  }}/>
                </div>
              </div>
              <div className="profile__bottom">
                {userCarsLoading && !userCars && <Loader/>}
                {!userCarsLoading && userCars ? (
                  <div className="profile__cars">
                    <h3>Ваши авто</h3>
                    <div className="profile__cars--list">
                      <>
                        {userCars.map((car) => {
                          return (
                            <ProfileCarCard key={car.id} data={car}/>
                          )
                          /*return (
                            <Button
                              key={car.car_number}
                              onClick={() => handleOpenModal(car)}
                              type="primary"
                              className="style-btn style-btn-default profile-page__cars_button"
                            >
                              {car.car_number}
                            </Button>
                          )*/
                        })}
                        <Button
                          onClick={openAddCarModal}
                          type="primary"
                          className="style-btn style-btn-primary"
                        >
                          <PlusOutlined />
                          Добавить
                        </Button>
                      </>
                    </div>
                  </div>
                ) : (
                  <div className="profile__cars--empty">
                    <p>Сейчас нет добавленных автомобилей</p>
                    <Button
                      onClick={openAddCarModal}
                      type="primary"
                      className="style-btn style-btn-primary"
                    >
                      Добавить авто
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={isModalActive} onCancel={handleCloseModal} footer={false}>
        {/*<ProfileCarForm onClose={handleCloseModal} key={selectCarData.car_number} car={selectCarData}/>*/}
      </Modal>
      <Modal open={isModalAddCarActive} onCancel={closeAddCarModal} footer={false}>
        <CarForm type={'register'} onClose={closeAddCarModal}/>
      </Modal>
    </>
  );
};

export default Profile;
