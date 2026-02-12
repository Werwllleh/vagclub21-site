'use client'
import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import 'swiper/css';
import Link from "next/link";
import {motion, useScroll, useTransform} from "motion/react"
import {heroBlockContent} from "@/data/content";

const HeroBlock = () => {

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
          {heroBlockContent && heroBlockContent.length ? heroBlockContent.map((card, i) => {
            return (
              <SwiperSlide>
                <div className="hero-block-card">
                  <div className="hero-block-card__container container">
                    <div className="hero-block-card__body">
                      <motion.div
                        className="hero-block-card__text"
                        style={{ y: textY, opacity: textOpacity }}
                      >
                        <h1 className="hero-block-card__title h1">
                          {card.title}
                        </h1>
                        <div className="hero-block-card__description">
                          {card.text}
                        </div>
                        {card.link && card.link !== '' ? (
                          <Link
                            href={card.link}
                            className="btn default l hero-block-card__link"
                          >
                            Подробнее
                          </Link>
                        ) : null}
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="hero-block-card__background"
                    style={{ filter: bgFilter, scale: bgScale }}
                  >
                    <img src={card.image} alt={card.title}/>
                  </motion.div>
                </div>
              </SwiperSlide>
            )
          }) : null }
          {/*<SwiperSlide>
            <div className="hero-block-card">
              <div className="hero-block-card__container container">
                <div className="hero-block-card__body">
                  <motion.div
                    className="hero-block-card__text"
                    style={{ y: textY, opacity: textOpacity }}
                  >
                    <h1 className="hero-block-card__title h1">
                      Встреча клуба 21.02.2026
                    </h1>
                    <div className="hero-block-card__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid corporis cupiditate
                        deleniti dolor earum explicabo mollitia officia placeat quaerat quidem, quod soluta suscipit
                        temporibus velit vitae, voluptas, voluptatem voluptatum!</p>
                    </div>
                    <Link href='/' className="btn default l hero-block-card__link">Подробнее</Link>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="hero-block-card__background"
                style={{ filter: bgFilter, scale: bgScale }}
              >
                <img src="./images/hero-block/2.webp" alt=""/>
              </motion.div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-block-card">
              <div className="hero-block-card__container container">
                <div className="hero-block-card__body">
                  <motion.div
                    className="hero-block-card__text"
                    style={{ y: textY, opacity: textOpacity }}
                  >
                    <h1 className="hero-block-card__title h1">
                      Встреча клуба 21.02.2026
                    </h1>
                    <div className="hero-block-card__description">
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid corporis cupiditate
                        deleniti dolor earum explicabo mollitia officia placeat quaerat quidem, quod soluta suscipit
                        temporibus velit vitae, voluptas, voluptatem voluptatum!</p>
                    </div>
                    <Link href='/' className="btn default l hero-block-card__link">Подробнее</Link>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="hero-block-card__background"
                style={{ filter: bgFilter, scale: bgScale }}
              >
                <img src="./images/hero-block/3.webp" alt=""/>
              </motion.div>
            </div>
          </SwiperSlide>*/}
        </Swiper>
      </div>
    </motion.div>
  );
};

export default HeroBlock;
