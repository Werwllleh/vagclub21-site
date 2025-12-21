"use client"
import React, {useEffect, useState} from 'react';
import CarForm from "@/components/car-form";
import {Button, Image, Modal} from "antd";

// Import Swiper
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {API_URL} from "@/constants";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import CarService from "@/services/car.service";
import toast from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";

const profileCarCard = ({carId, data}) => {

  const queryClient = useQueryClient();

  const [isModalUpdateCarActive, setIsModalUpdateCarActive] = useState(false);
  const [isModalDeleteCarActive, setIsModalDeleteCarActive] = useState(false);

  const openUpdateCarModal = () => {
    setIsModalUpdateCarActive(true)
  }
  const closeUpdateCarModal = () => {
    setIsModalUpdateCarActive(false)
  }

  const openDeleteCarModal = () => {
    setIsModalDeleteCarActive(true)
  }
  const closeDeleteCarModal = () => {
    setIsModalDeleteCarActive(false)
  }

  const deleteCar = async (carId) => {

    try {
      const res = await CarService.deleteUserCar(carId);

      if (res.status === 200) {
        await queryClient.invalidateQueries(['user-cars']);
        closeDeleteCarModal();
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data?.message || 'Ошибка на сервере');
    }
  }


  return (
    <>
      <div className="profile-car-card">
        <div className="profile-car-card__body">
          {data.carsImages?.length ? (
            <div className="profile-car-card__images">
              <Image.PreviewGroup>
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={0}
                  pagination={{
                    enabled: true,
                    clickable: true,
                  }}
                  slidesPerView={1}
                >
                  {data.carsImages.map((image) => {
                    return (
                      <SwiperSlide key={image.id}>
                        <div className="profile-car-card__image">
                          <Image
                            src={`${API_URL}/image/${image.source}`}
                          />
                          <img className="profile-car-card__image--bg" src={`${API_URL}/image/${image.source}`}/>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </Image.PreviewGroup>
            </div>
          ) : (
            <div className="profile-car-card__no-photo">
              <Button
                onClick={openUpdateCarModal}
                className="style-btn"
                size="medium"
              >
                Добавить фото
              </Button>
            </div>
          )}
          <div className="profile-car-card__footer">
            <div className="profile-car-card__info">
              <p className="profile-car-card__info--name">{data?.brand} {data?.model}</p>
              <p className="profile-car-card__info--year">{data?.year}</p>
              <p className="profile-car-card__info--number">{data?.number}</p>
            </div>
            <div className="profile-car-card__actions">
              <Button
                onClick={openUpdateCarModal}
                className="style-btn"
                size="small"
              >
                <EditOutlined/>
              </Button>
              <Button
                onClick={openDeleteCarModal}
                className="style-btn delete"
                size="small"
              >
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal open={isModalUpdateCarActive} onCancel={closeUpdateCarModal} footer={false}>
        <CarForm
          type={'update'}
          carIndex={carId}
          onClose={closeUpdateCarModal}
          images={data?.carsImages}
          initialValues={{
            brand: data?.brand,
            model: data?.model,
            number: data?.number,
            year: data?.year,
            drive2: data?.drive2,
            note: data?.note,
          }}/>
      </Modal>
      <Modal open={isModalDeleteCarActive} onCancel={closeDeleteCarModal} footer={false}>
        <div className="confirm-delete-car">
          <h3 className="confirm-delete-car__title">Удалить автомобиль из вашего профиля?</h3>
          <div className="confirm-delete-car__actions">
            <Button
              onClick={() => deleteCar(carId)}
              className="style-btn agree"
              size="small"
            >
              Да
            </Button>
            <Button
              onClick={closeDeleteCarModal}
              className="style-btn disagree"
              size="small"
            >
              Нет
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default profileCarCard;
