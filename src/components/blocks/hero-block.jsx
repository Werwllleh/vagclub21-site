'use client'
import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Parallax} from 'swiper/modules';
import 'swiper/css';
import Link from "next/link";
import {motion, useScroll, useTransform} from "framer-motion"
import {useHeroSlider} from "@/hooks/useHeroSlider";
import {RichText} from "@payloadcms/richtext-lexical/react";
import {H1Element} from "@/components/UI/h1";
import styled from "styled-components";
import {customTheme} from "@/styles/theme";
import Image from "next/image";

const SlideTitle = styled(H1Element)`
    text-align: center;
    font-weight: 600;
    font-family: ${customTheme.font.secondary};
    max-width: 90rem;
    margin-inline: auto;
`

const HeroBlock = ({initialData = null}) => {

  const {isLoading, slider} = useHeroSlider(initialData);

  const heroSection = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroSection,
    offset: ["start start", "end start"], // от начала hero до момента, когда hero ушёл вверх
  });

  // BACKGROUND: blur + scale
  const bgFilter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
            enabled: slider?.length > 1,
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
                      <SlideTitle
                        data-swiper-parallax-y="-200"
                        data-swiper-parallax-opacity="0.5"
                        data-swiper-parallax-duration="1200"
                      >
                        Загрузка...
                      </SlideTitle>
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
                          <SlideTitle
                            data-swiper-parallax-y="-200"
                            data-swiper-parallax-opacity="0.5"
                            data-swiper-parallax-duration="1200"
                          >
                            {slide.title}
                          </SlideTitle>
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

                        {slide?.detail_link && slide.detail_link?.url && slide.detail_link?.title && (
                          <div
                            data-swiper-parallax-y="-200"
                            data-swiper-parallax-opacity="0.5"
                            data-swiper-parallax-duration="1800"
                            className="hero-block-card__footer"
                          >
                            <Link
                              href={slide.detail_link.url}
                              className="btn default l hero-block-card__link"
                            >
                              {slide.detail_link.title}
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
                      <Image
                        loading={index === 0 ? 'eager' : 'lazy'}
                        priority={index === 0}
                        fetchPriority={index === 0 ? 'high' : undefined}
                        sizes="100vw"
                        width={1920}
                        height={1080}
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
