'use client'
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {CMS_URL} from "@/constants";
import {Button} from "antd";


const ProductItem = ({product}) => {

  const router = useRouter();

  return (
    <div className="product-item">
      <div className="product-item__body">
        <div className="product-item__image">
          <img src={`${CMS_URL}${product.preview_image.url}`} alt=""/>
        </div>
        <div className="product-item__status"></div>
        <div className="product-item__info">
          <span className="product-item__type">{product.type}</span>
          <h4 className="product-item__title">{product.title}</h4>
          <div className="product-item__price">
            <span className="product-item__price_current">{product.price}₽</span>
            <span className="product-item__price_old">{product.price_old}₽</span>
          </div>
        </div>
        <Button onClick={() => router.push(`/products/${product.slug}`)} type="primary" className="product-item__button style-btn style-btn-primary" >Подробнее</Button>
        <Link className="product-item__link" href={`/products/${product.slug}`} />
      </div>
    </div>
  );
};

export default ProductItem;
