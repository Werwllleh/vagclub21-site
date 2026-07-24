'use client'

import {usePartnersLabels} from "@/hooks/usePartners";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {customTheme} from "@/styles/theme";


import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, FreeMode} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export const PartnersLabelsWrapper = styled.div`
    padding-block: clamp(4rem, 5vw, 7rem);

    .swiper {
        overflow: unset;

        .swiper-wrapper {
            transition-timing-function: linear;
            align-items: stretch;
        }

        .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
`

const PartnersLabelsItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 3rem;
    padding-block: 2rem;
    border-radius: ${customTheme.radius.r10};
        //background-color: ${customTheme.color.white};
    box-shadow: 0 0 .5rem .5rem #0000000f;
    background-color: #ffffffa1;
    backdrop-filter: blur(1rem);
    height: 100%;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        padding-inline: 5rem;
    }

    img {
        object-fit: contain;
        height: 10rem;
        width: 22rem;
        opacity: .8;
        filter: grayscale(1);
        transition: opacity ${customTheme.transition.small}, filter ${customTheme.transition.small};

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            height: 13rem;
            width: 25rem;
        }
    }

    &:hover {

        img {
            opacity: 1;
            filter: grayscale(0);
        }
    }
`


const PartnersLabels = ({initialData = null}) => {
  const {isLoading, partnerLabelsData} = usePartnersLabels(initialData);

  if (isLoading || !partnerLabelsData?.length) {
    return null;
  }

  const duplicatedLabels = partnerLabelsData
    ? Array.from({length: 10}).flatMap(() => partnerLabelsData)
    : [];

  return (
    <PartnersLabelsWrapper>
      {!!duplicatedLabels.length && (
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween="30"
          loop={duplicatedLabels.length > 0}
          speed={3000}
          autoplay={{
            enabled: true,
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
        >
          {duplicatedLabels.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`}>
              <PartnersLabelsItem href={`/partner/${item.slug}`} scroll={true}>
                {item?.logo?.url && (
                  <Image
                    loading="lazy"
                    src={item.logo.url}
                    alt={item.logo.alt || ''}
                    width={item.logo.width}
                    height={item.logo.height}
                  />
                )}
              </PartnersLabelsItem>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </PartnersLabelsWrapper>
  );
};

export default PartnersLabels;
