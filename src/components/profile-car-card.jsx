"use client"
import React, {useState} from 'react';
import CarForm from "@/components/car-form";
import {Button, Image, Modal} from "antd";

// Import Swiper
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {API_URL} from "@/constants";
import {EditOutlined} from "@ant-design/icons";

const profileCarCard = ({carId, data}) => {

  const [isModalUpdateCarActive, setIsModalUpdateCarActive] = useState(false);

  const openUpdateCarModal = () => {
    setIsModalUpdateCarActive(true)
  }
  const closeUpdateCarModal = () => {
    setIsModalUpdateCarActive(false)
  }

  return (
    <>
      <div className="profile-car-card">
        <div className="profile-car-card__body">
          {data.carsImages.length ? (
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
    </>
  );
};

export default profileCarCard;
