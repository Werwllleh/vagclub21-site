'use client'
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import Link from "next/link";

const HeroBlock = () => {
  return (
    <div className="hero-block">
      <div className="hero-block__swiper">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            enabled: false,
            delay: 10000,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
        >
          <SwiperSlide>
            <div className="hero-block-card">
              <div className="hero-block-card__container container">
                <div className="hero-block-card__body">
                  <div className="hero-block-card__text">
                    <h1 className="hero-block-card__title h1">
                      Встреча клуба 21.02.2026
                    </h1>
                    <div className="hero-block-card__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid corporis cupiditate
                        deleniti dolor earum explicabo mollitia officia placeat quaerat quidem, quod soluta suscipit
                        temporibus velit vitae, voluptas, voluptatem voluptatum!</p>
                    </div>
                    <Link href='/' className="btn default l hero-block-card__link">Подробнее</Link>
                  </div>
                </div>
              </div>
              <div className="hero-block-card__background">
                <img src="./images/hero-block/1.webp" alt=""/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-block-card">
              <div className="hero-block-card__container container">
                <div className="hero-block-card__body">
                  <div className="hero-block-card__text">
                    <h1 className="hero-block-card__title h1">
                      Встреча клуба 21.02.2026
                    </h1>
                    <div className="hero-block-card__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid corporis cupiditate
                        deleniti dolor earum explicabo mollitia officia placeat quaerat quidem, quod soluta suscipit
                        temporibus velit vitae, voluptas, voluptatem voluptatum!</p>
                    </div>
                    <Link href='/' className="btn default l hero-block-card__link">Подробнее</Link>
                  </div>
                </div>
              </div>
              <div className="hero-block-card__background">
                <img src="./images/hero-block/2.webp" alt=""/>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-block-card">
              <div className="hero-block-card__container container">
                <div className="hero-block-card__body">
                  <div className="hero-block-card__text">
                    <h1 className="hero-block-card__title h1">
                      Встреча клуба 21.02.2026
                    </h1>
                    <div className="hero-block-card__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid corporis cupiditate
                        deleniti dolor earum explicabo mollitia officia placeat quaerat quidem, quod soluta suscipit
                        temporibus velit vitae, voluptas, voluptatem voluptatum!</p>
                    </div>
                    <Link href='/' className="btn default l hero-block-card__link">Подробнее</Link>
                  </div>
                </div>
              </div>
              <div className="hero-block-card__background">
                <img src="./images/hero-block/3.webp" alt=""/>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroBlock;
