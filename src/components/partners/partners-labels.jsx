'use client'

import {usePartnersLabels} from "@/hooks/usePartners";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import {customTheme} from "@/styles/theme";


import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay, FreeMode } from 'swiper/modules';
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
        }
    }
`

const PartnersLabelsItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20rem;
    border-radius: ${customTheme.radius.r10};

    img {
        object-fit: contain;
        height: 12rem;
        width: 15rem;
        mix-blend-mode: hard-light;
        opacity: .8;
        filter: grayscale(1);
        transition: opacity ${customTheme.transition.small}, filter ${customTheme.transition.small};
    }
    
    &:hover {
        
        img {
            opacity: 1;
            filter: grayscale(0);
        }
    }
`


const PartnersLabels = () => {
  const { isLoading, partnerLabelsData } = usePartnersLabels();

  if (isLoading || !partnerLabelsData?.length) {
    return null;
  }

  const duplicatedLabels = partnerLabelsData
    ? Array.from({ length: 10 }).flatMap(() => partnerLabelsData)
    : [];

  return (
    <PartnersLabelsWrapper>
      {!!duplicatedLabels.length && (
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={20}
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
