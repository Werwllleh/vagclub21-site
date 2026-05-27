'use client';

import {useProduct} from "@/hooks/useProducts";
import {CMS_URL} from "@/constants";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Loader from "@/components/loader";
import {useEffect} from "react";
import {RichText} from "@payloadcms/richtext-lexical/react";
import Link from "next/link";

const ProductDetail = ({slug}) => {

  const {product, isLoading} = useProduct(slug);

  useEffect(() => {
    console.log(product)
  }, [product]);

  return (
    <div className="product-detail ppt ppb">
      <div className="container">
        {isLoading && <Loader />}
        {product && (
          <>
            <div className="product-detail__head">
              <h1 className="h2">{product.name}</h1>
            </div>
            <div className="product-detail__body">
              <div className="product-detail__top">
                {!!product?.gallery?.length && (
                  <div className="product-detail__images">
                    <Swiper
                      modules={[EffectFade, Autoplay, Pagination]}
                      effect="fade"
                      spaceBetween={0}
                      pagination={{
                        enabled: true,
                        clickable: true,
                      }}
                      slidesPerView="auto"
                      // onSlideChange={() => console.log('slide change')}
                      // onSwiper={(swiper) => console.log(swiper)}
                    >
                      <>
                        <SwiperSlide key={product.mainImage.id}>
                          <img src={product.mainImage.url} alt={product.mainImage.alt}/>
                        </SwiperSlide>
                        {product.gallery.map((image) => {
                          return (
                            <SwiperSlide key={image.id}>
                              <img src={image.url} alt={image.alt}/>
                              <img src={image.url} alt={image.alt}/>
                              <span></span>
                            </SwiperSlide>
                          )
                        })}
                      </>
                    </Swiper>
                  </div>
                )}
                {!!product?.characteristics?.length && (
                  <div className="product-detail__charateristics white-block">
                    {product?.characteristics.map((characteristic) => {
                      return (
                        <div key={characteristic.id} className="characteristic">
                          {characteristic?.category ? (
                            <h5 className="characteristic__title">{characteristic.category}</h5>) : null}
                          {characteristic?.values ? (
                            <ul className="characteristic__list">
                              {characteristic.values.map((item) => {
                                return (
                                  <li className="characteristic__item" key={item.id}>
                                    <p className="label">{item.label}</p>
                                    <span className="separator"></span>
                                    <p className="value">{item.value}</p>
                                  </li>
                                )
                              })}
                            </ul>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                )}
                <div className="product-detail__purchase white-block">
                  {product?.pricing && (
                    <div className="price">
                      {product.pricing?.price && <span className="price__current">{product.pricing.price}₽</span>}
                      {product.pricing?.oldPrice && <span className="price__old">{product.pricing.oldPrice}₽</span>}
                    </div>
                  )}
                  <span className={`availability ${product?.inStock ? 'available' : ''}`}>
                    {product?.inStock ? <p>В наличии</p> : <p>Нет в наличии</p>}
                  </span>
                  <Link
                    className="btn default m btn-buy"
                    href="https://t.me/c/2219612991/118"
                    target="_blank" rel="noopener norefferer"
                  >Купить</Link>
                </div>
                {product.description && (
                  <div className="product-detail__description white-block">
                    <h5>Описание</h5>
                    <RichText data={product.description} />
                  </div>
                )}
              </div>
              <div className="product-detail__bottom">

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
