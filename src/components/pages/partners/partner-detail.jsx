'use client'

import styled from "styled-components";
import Container from "@/components/container";
import H1 from "@/components/UI/h1";
import Image from "next/image";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {customTheme} from "@/styles/theme";
import AnimateSection from "@/components/blocks/animate-section";

const PartnerWrap = styled(AnimateSection)`
  background-color: ${customTheme.color.greyLight};
`

const PartnerHero = styled.section`
    position: relative;
    min-height: 100dvh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const PartnerSwiper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    inset: 0;

    .swiper {

        .swiper-wrapper {
            align-items: stretch;
        }

        .swiper-slide {
            height: auto;

            img {
                width: 100%;
                height: 100%;
                max-height: 100dvh;
                object-fit: cover;
                object-position: center;
            }
        }
    }

    &::before {
        content: "";
        position: absolute;
        z-index: 2;
        inset: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #000000 0%, transparent 80%);
        pointer-events: none;
    }

`

const PartnerInfo = styled.div`
    height: 100%;
    user-select: none;
    pointer-events: none;
    padding-block: 12rem 8rem;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
`

const PartnerInfoBody = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 3rem;
    color: ${customTheme.color.white};

    h1 {
        font-weight: 500;
        text-transform: uppercase;
        max-width: 72rem;
    }
`

const PartnerInfoDescription = styled.div`
    max-width: 105rem;
    font-size: clamp(1.4rem, 5vw, 1.8rem);
    white-space: pre-wrap;
`

const PartnerTagList = styled.ul`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 72rem;
    gap: 1rem 2rem;
`

const PartnerTag = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${customTheme.radius.r30};
    border: 1px solid ${customTheme.color.white};
    background-color: ${customTheme.color.white};
    color: ${customTheme.color.primaryDark};
    padding-block: 1.2rem;
    padding-inline: 2rem;
    font-size: clamp(1.1rem, 5vw, 1.4rem);
    max-width: max-content;
    white-space: nowrap;
`

const PartnerMain = styled.section`
  padding-block: clamp(3rem, 5vw, 5rem) clamp(5rem, 5vw, 10rem);
`

const PartnerContacts = styled.div`
`

const PartnerDetail = ({partnerData}) => {

  console.log(partnerData);

  return (
    <PartnerWrap as="div">
      <PartnerHero>
        {partnerData?.gallery ? (
          <PartnerSwiper>
            <Swiper
              modules={[Autoplay]}
              effect="fade"
              loop={partnerData.gallery.length >= 3}
              spaceBetween={0}
              slidesPerView="auto"
              speed={1500}
              autoplay={{
                delay: 20000,
              }}
            >
              {partnerData.gallery.map(slide => (
                <SwiperSlide key={slide?.id}>
                  <Image src={slide?.url} alt={slide?.alt} width={1920} height={500} loading="eager"/>
                </SwiperSlide>
              ))}
            </Swiper>
          </PartnerSwiper>
        ) : null}
        <PartnerInfo>
          <Container>
            <PartnerInfoBody>
              <H1>{partnerData?.title}</H1>
              {partnerData?.categories?.length && (
                <PartnerTagList>
                  {partnerData.categories.map(category => (
                    <li key={category.id}>
                      <PartnerTag>{category.title}</PartnerTag>
                    </li>
                  ))}
                </PartnerTagList>
              )}
            </PartnerInfoBody>
          </Container>
        </PartnerInfo>
      </PartnerHero>
      <PartnerMain>
        <Container>
          {partnerData?.description && (
            <PartnerInfoDescription>
              <p>{partnerData.description}</p>
            </PartnerInfoDescription>
          )}
          {partnerData?.contacts?.length && (
            <PartnerContacts>
              h3
            </PartnerContacts>
          )}
        </Container>
      </PartnerMain>
    </PartnerWrap>
  );
};

export default PartnerDetail;
