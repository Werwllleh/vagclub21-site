'use client'
import {useUser} from "@/hooks/useUser";
import {Avatar, Button, Modal} from "antd";
import {useEffect, useState} from "react";
import Loader from "@/components/loader";
import UserForm from "@/components/user-form";
import CarForm from "@/components/car-form";
import {PlusOutlined} from "@ant-design/icons";
import ProfileCarCard from "@/components/profile-car-card";
import {checkUrl} from "@/utils/utils";


const Profile = () => {

  const {isLoading, user} = useUser();

  const [photoAvailable, setPhotoAvailable] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!user?.userPhoto) {
        setPhotoAvailable(false);
        return;
      }

      const exists = await checkUrl(user.userPhoto);
      if (!cancelled) setPhotoAvailable(exists);
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [user?.userPhoto]);

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
                  {photoAvailable === true && (
                    <Avatar
                      src={user.userPhoto}
                      style={{backgroundColor: user?.data.user_color}}
                    />
                  )}
                  {photoAvailable === false && (
                    <span
                      className="profile__avatar--not"
                      style={{ backgroundColor: user.data.color}}
                    >
                      <span>{user.data.name.substring(0, 2).toUpperCase()}</span>
                    </span>
                  )}
                </div>
                <div className="profile__user">
                  <UserForm type={'update'} initialValues={{
                    name: user?.data?.name,
                    instagram: user?.data?.instagram,
                  }}/>
                </div>
              </div>
              <div className="profile__bottom">
                {isLoading && !user.data.cars && <Loader/>}
                {user.data.cars && user.data.cars.length ? (
                  <div className="profile__cars">
                    <h3>Ваши авто</h3>
                    <div className="profile__cars--list">
                      <>
                        {user.data.cars.map((car) => {
                          return (
                            <ProfileCarCard key={car.id} carId={car.id} data={car}/>
                          )
                        })}
                        <Button
                          onClick={openAddCarModal}
                          type="primary"
                          className="style-btn style-btn-default"
                        >
                          <PlusOutlined />
                          Добавить авто
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
