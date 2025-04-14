'use client'

import {useCar} from "@/hooks/useCar";
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

const CarDetail = ({carNumber}) => {

  const {isLoading, carData} = useCar(carNumber);

  console.log(carData)

  return (
    <div className="car-detail">
      <BackButton url={'/cars'} title={'К списку авто'}/>
      {isLoading && <Loader/>}
      {carData && (
        <div className="car-detail__body">
          <div className="car-detail__images">
            {!!JSON.parse(carData.car_images).length && (
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
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
              >
                {JSON.parse(carData.car_images).map((image) => {
                  return (
                    <SwiperSlide key={image}>
                      <img src={`${API_URL}/car/${image}`} alt=""/>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
          </div>
          <div className="car-detail__description">
            <div className="car-detail__info">
              <h1>{`${carData.car_brand} ${carData.car_model} ${carData.car_year}`}</h1>
              <span className="car-detail__info_row">
                <p className="car-detail__info_number">
                  {carData.car_number}
                </p>
                {carData.user.user_instagram && (
                  <Link href={`https://www.instagram.com/${carData.user.user_instagram}`} target="_blank"
                        className="car-detail__info_instagram">
                    <InstagramIcon/>
                  </Link>
                )}
              </span>
              {carData?.car_drive2 && (
                <span className="car-detail__info_drive2">
                <Drive2Icon url={carData.car_drive2}/>
              </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
