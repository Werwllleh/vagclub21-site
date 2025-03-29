'use client'
import React from 'react';
import Link from "next/link";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {CMS_URL} from "@/constants";

const ProductItem = ({product}) => {

  return (
    <div className="product-item">
      <div className="product-item__body">
        <div className="product-item__images">
          <Swiper
            modules={[EffectFade, Autoplay, Pagination]}
            effect="fade"
            spaceBetween={0}
            pagination={{
              enabled: true,
              clickable: true,
            }}
            slidesPerView={1}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {!!product.images && product.images.map((image) => {
              return (
                <SwiperSlide key={image.documentId}>
                  <img src={`${CMS_URL}${image.url}`} alt=""/>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <div className="product-item__status"></div>
        <div className="product-item__info">
          <span className="product-item__type">{product.type}</span>
          <h4 className="product-item__title">{product.title}</h4>
          <span className="product-item__price">
            <span>Стоимость</span>
            <span>{product.price}₽</span>
          </span>
        </div>
        <Link className="product-item__link" href={`/products/${product.slug}`} />
      </div>
    </div>
  );
};

export default ProductItem;
