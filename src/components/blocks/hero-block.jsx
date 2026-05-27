'use client'
import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Parallax} from 'swiper/modules';
import 'swiper/css';
import Link from "next/link";
import {motion, useScroll, useTransform} from "motion/react"
import {useHeroSlider} from "@/hooks/useHeroSlider";
import {RichText} from "@payloadcms/richtext-lexical/react";

const HeroBlock = () => {

  const {isLoading, slider} = useHeroSlider();

  const heroSection = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroSection,
    offset: ["start start", "end start"], // от начала hero до момента, когда hero ушёл вверх
  });

  // BACKGROUND: blur + scale
  const bgFilter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // TEXT: вверх + fade out
  const textY = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.2, 0]);


  return (
    <motion.div
      ref={heroSection}
      className="hero-block"
    >
      <div className="hero-block__swiper">
        <Swiper
          modules={[Autoplay, Pagination, Parallax]}
          slidesPerView={1}
          loop={slider?.length >= 3}
          speed={1200}
          autoplay={{
            enabled: false,
            delay: 10000,
            pauseOnMouseEnter: true,
          }}
          parallax={{
            enabled: true,
          }}
          pagination={{
            enabled: true,
            clickable: true,
          }}
        >
          {isLoading && (
            <SwiperSlide>
              <div className="hero-block-card">
                <div className="hero-block-card__container container">
                  <div className="hero-block-card__body">
                    <motion.div
                      className="hero-block-card__text"
                      style={{ y: textY, opacity: textOpacity }}
                    >
                      <h1
                        data-swiper-parallax-y="-200"
                        data-swiper-parallax-opacity="0.5"
                        data-swiper-parallax-duration="1200"
                        className="hero-block-card__title h1"
                      >
                        Загрузка...
                      </h1>
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="hero-block-card__background loading"
                >
                </motion.div>
              </div>
            </SwiperSlide>
          )}
          {!isLoading && !!slider?.length && slider?.map((slide, index) => {
            return (
              <SwiperSlide id={slide.id}>
                <div className="hero-block-card">
                  <div className="hero-block-card__container container">
                    <div className="hero-block-card__body">
                      <motion.div
                        className="hero-block-card__text"
                        style={{ y: textY, opacity: textOpacity }}
                      >
                        {slide?.title && (
                          <h1
                            data-swiper-parallax-y="-200"
                            data-swiper-parallax-opacity="0.5"
                            data-swiper-parallax-duration="1200"
                            className="hero-block-card__title h1"
                          >
                            {slide.title}
                          </h1>
                        )}
                        {slide?.description && (
                          <div
                            data-swiper-parallax-y="-200"
                            data-swiper-parallax-opacity="0.5"
                            data-swiper-parallax-duration="1500"
                            className="hero-block-card__description"
                          >
                            <RichText data={slide.description} />
                          </div>
                        )}

                        {slide?.detail_link && (
                          <div
                            data-swiper-parallax-y="-200"
                            data-swiper-parallax-opacity="0.5"
                            data-swiper-parallax-duration="1800"
                            className="hero-block-card__footer"
                          >
                            <Link
                              href={slide.detail_link}
                              className="btn default l hero-block-card__link"
                            >
                              Подробнее
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                  {slide?.bg_image && slide?.bg_image?.url && (
                    <motion.div
                      className="hero-block-card__background"
                      style={{ filter: bgFilter, scale: bgScale }}
                    >
                      <img
                        src={slide.bg_image.url}
                        alt={slide.bg_image.alt ? slide.bg_image.alt : `Слайд #${index}`}
                      />
                    </motion.div>
                  )}
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default HeroBlock;
