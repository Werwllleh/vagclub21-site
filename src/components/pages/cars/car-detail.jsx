'use client'

import Loader from "@/components/loader";
import {API_URL, CMS_URL} from "@/constants";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay, Pagination} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Link from "next/link";
import InstagramIcon from "@/components/icons/instagram-icon";
import Drive2Icon from "@/components/icons/drive2-icon";
import BackButton from "@/components/back-button";
import {useEffect, useState} from "react";
import {Image} from "antd";
import {useCarInfo} from "@/hooks/useCarInfo";
import CarsOthers from "@/components/pages/cars/cars-others";
import CarService from "@/services/car.service";

const CarDetail = ({carId}) => {

  const {isLoading, carData} = useCarInfo(carId);

  const [carImages, setCarImages] = useState([])

  useEffect(() => {

    if (!!carData?.carsImages.length) {
      setCarImages(carData.carsImages.map((image) => `${API_URL}/image/${image.source}`))
    }

  }, [carData]);

  return (
    <div className="car-detail">
      <BackButton url={'/cars'} title={'К списку авто'}/>
      {isLoading && <Loader/>}
      {carData && (
        <div className="car-detail__body">
          <div className="car-detail__images">
            {!!carImages.length && (
              <Swiper
                modules={[EffectFade, Autoplay, Pagination]}
                effect="fade"
                autoHeight={true}
                spaceBetween={0}
                pagination={{
                  enabled: true,
                  clickable: true,
                }}
                slidesPerView={1}
              >
                {carImages.map((image, index) => {
                  return (
                    <SwiperSlide key={image}>
                      <Image.PreviewGroup
                        items={carImages}
                      >
                        <Image
                          key={index}
                          src={image}
                          preview={{
                            mask: false,
                            movable: false
                          }}
                          alt={`${carData.brand}_${carData.model}_${carData.number}_${index}`}
                        />
                      </Image.PreviewGroup>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
          </div>
          <div className="car-detail__description">
            <div className="car-detail__info">
              <h1>{`${carData.brand} ${carData.model} ${carData.year}`}</h1>
              <span className="car-detail__info_row">
                <p className="car-detail__info_number">
                  {carData.number}
                </p>
                {carData.user.instagram && (
                  <Link href={`https://www.instagram.com/${carData.user.instagram}`} target="_blank"
                        className="car-detail__info_instagram">
                    <InstagramIcon/>
                  </Link>
                )}
              </span>
              {carData?.drive2 && (
                <span className="car-detail__info_drive2">
                  <Drive2Icon url={carData.drive2}/>
                </span>
              )}
              {carData?.note && (
                <p className="car-detail__info_note">
                  {carData.note}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {carData && <div className="car-detail__others"><CarsOthers /></div>}
    </div>
  );
};

export default CarDetail;
