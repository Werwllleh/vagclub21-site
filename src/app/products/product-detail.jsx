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

const ProductDetail = ({slug}) => {

  const {isLoading, product} = useProduct(slug);

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail__body">
          {isLoading && '...Загрузка'}
          {product && (
            <>
              <div className="product-detail__top">
                <div className="product-detail__images">
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
                <div className="product-detail__info">
                  <span className="product-detail__info_type">{product.type}</span>
                  <h1>{product.title}</h1>
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
              <div className="product-detail__bottom">
                <div className="product-detail__description">
                  <h4>Описание</h4>
                  <p className="text">{product.description}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
