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
                      {product.gallery.map((image) => {
                        return (
                          <SwiperSlide key={image.id}>
                            <img src={image.url} alt={image.alt}/>
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>
                )}
                <div className="product-detail__purchase">
                  {product?.pricing && (
                    <div className="price">
                      {product.pricing?.price && <span className="price__current">{product.pricing.price}₽</span>}
                      {product.pricing?.oldPrice && <span className="price__old">{product.pricing.oldPrice}₽</span>}
                    </div>
                  )}
                  <span className={`availability ${product?.inStock ? 'available' : ''}`}>
                    {product?.inStock ? <p>В наличии</p> : <p>Нет в наличии</p>}
                  </span>
                </div>
              </div>
              <div className="product-detail__bottom">
                {product.description && (
                  <div className="product-detail__description">
                    <h4>Описание</h4>
                    <RichText data={product.description} />
                  </div>
                )}
              </div>
            </div>
            <div className="product-detail__top">

              <div className="product-detail__info">
                {/*<span className="product-detail__info_type">{product.type}</span>*/}
                <div className="product-detail__price">
                  <div className="product-detail__price_values">
                    <span className="product-detail__price_current">{product.price} ₽</span>
                    {product.price_old && <span className="product-detail__price_old">{product.price_old} ₽</span>}
                  </div>
                </div>
                {product.specifications && !!Object.values(product.specifications)?.length && (
                  <ul className="product-detail__specifications">
                    {Object.values(product.specifications).map((specification, index) => (
                      <li className="product-detail__specifications_item text" key={index}>
                        <span className="product-detail__specifications_label">{specification.label}:</span>
                        <span className="product-detail__specifications_value">{specification.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
