"use client"

import CarCard from "@/components/cars/car-card";

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {useOtherCars} from "@/hooks/useOtherCars";
import {useEffect, useRef} from "react";
import SvgIcon from "@/components/svg-icon";
import {usePathname} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import styled from "styled-components";
import {customTheme} from "@/styles/theme";

const Wrapper = styled.div`
`

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 4rem;
`

const Title = styled.h3`
`

const Main = styled.div`
    margin-top: 3rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        margin-top: 5rem;
    }
`

const Navigation = styled.div`
    display: none;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: flex;
        align-items: center;
        gap: 0 1rem;

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 4rem;
            height: 4rem;

            @media (min-width: ${customTheme.breakpoint.tablet}) {
                width: 5rem;
                height: 5rem;
            }

            svg {
                width: 3rem;
                height: 3rem;
                color: ${customTheme.color.black};

                @media (min-width: ${customTheme.breakpoint.tablet}) {
                    width: 4rem;
                    height: 4rem;
                }
            }

            &:hover {
                svg {
                    color: ${customTheme.color.primary};
                }
            }

            &:first-child {
                transform: rotate(180deg);

                @include breakpoints.tablet {
                    &:hover {
                        transform: rotate(180deg) translateX(.5rem);
                    }
                }
            }

            &:nth-child(2) {

                @include breakpoints.tablet {
                    &:hover {
                        transform: translateX(.5rem);
                    }
                }
            }
        }
    }
`

const Gallery = styled.div`

    .swiper {
        overflow: unset;

        .swiper-wrapper {
            align-items: stretch;
        }

        .swiper-slide {
            width: auto;
            height: auto;

            .car-card {
                width: 25rem;
                height: 15rem;

                @media (min-width: ${customTheme.breakpoint.tablet}) {
                    width: 40rem;
                    height: 25rem;
                }

                .car-card__image--main {
                    width: auto;
                    height: 100%;
                    object-fit: contain;
                }
            }
        }
    }
`

const CarsOthers = ({title}) => {

  const pathname = usePathname();
  const queryClient = useQueryClient();

  const {otherCarsData} = useOtherCars(15);

  const refetchData = async () => {
    await queryClient.refetchQueries(['other-cars'])
  }

  useEffect(() => {
    refetchData()
  }, [pathname])

  const swiperRef = useRef(null);

  return (
    <>
      {!!otherCarsData.length && (
        <Wrapper>
          <Head>
            <Title className="h3">{title ? title : 'Другие авто'}</Title>
            <Navigation>
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Предыдущий"
              >
                <SvgIcon name={"arrow"}/>
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Следующий"
              >
                <SvgIcon name={"arrow"}/>
              </button>
            </Navigation>
          </Head>
          <Main>
            <Gallery>
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                spaceBetween={20}
                slidesPerView={"auto"}
              >
                {otherCarsData.map((car) => {
                  return (
                    <SwiperSlide key={car.id}>
                      <CarCard car={car} non_gallery={true}/>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Gallery>
          </Main>
        </Wrapper>
      )}
    </>
  );
};

export default CarsOthers;
