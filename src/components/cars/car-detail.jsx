'use client'

import {API_URL, CMS_URL} from "@/constants";
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, Autoplay, Pagination} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import Link from "next/link";
import Drive2Icon from "@/components/icons/drive2-icon";
import {useEffect, useState} from "react";
import {Image} from "antd";
import CarsOthers from "@/components/cars/cars-others";
import SvgIcon from "@/components/svg-icon";
import styled from "styled-components";
import Container from "@/components/container";
import AnimateSection from "@/components/blocks/animate-section";
import {customTheme} from "@/styles/theme";


const Wrapper = styled.div`
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5rem 0;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        gap: 10rem 0;
    }

    @media (min-width: ${customTheme.breakpoint.w1250}) {
        gap: 14rem 0;
    }
`

const Main = styled(AnimateSection)`
    display: flex;
    flex-direction: column;
    gap: 4rem 0;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        flex-direction: row;
        align-items: flex-end;
        gap: 4rem 3rem;
    }

    @media (min-width: ${customTheme.breakpoint.w1250}) {
        gap: 4rem 5rem;
    }
`

const Footer = styled(AnimateSection)`
`

const Gallery = styled.div`
    position: relative;
    flex: 0 1 45%;
    width: 100%;
    border-radius: ${customTheme.radius.r15};
    overflow: hidden;
    box-shadow: 0 4px 15px 3px #00000040;
    
    @media (min-width: ${customTheme.breakpoint.w1250}) {
        flex: 0 1 60rem;
    }

    .swiper {
        width: 100%;

        .swiper-wrapper {
            align-items: stretch;
        }

        .swiper-slide {
            width: auto;
            height: auto;
            display: flex;
            justify-content: center;
            cursor: pointer;

            .ant-image {
                margin-inline: auto;

                img {
                    width: auto;
                    height: 25rem;
                    object-fit: contain;

                    @media (min-width: ${customTheme.breakpoint.mobile}) {
                        height: 30rem;
                    }

                    @media (min-width: ${customTheme.breakpoint.tablet}) {
                        height: 40rem;
                    }
                }

                .ant-image-cover {
                    display: none;
                }
            }

            .image-blur {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                display: block;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: -1;
                    filter: blur(1rem);
                }
            }
        }
    }

    .drive2 {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        border-radius: 0 0 0 ${customTheme.radius.r15};
        overflow: hidden;
    }
`

const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    margin-bottom: 2rem;
`

const InfoList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: .5rem 0;

    li {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: .75rem;

        span {
            color: ${customTheme.color.black};
            opacity: .75;
            font-size: 1.3rem;

            @media (min-width: ${customTheme.breakpoint.mobile}) {
                font-size: 1.4rem;
            }

            @media (min-width: ${customTheme.breakpoint.tablet}) {
                font-size: 1.6rem;
            }
        }

        hr {
            display: inline-block;
            flex: 1;
            width: 100%;
            height: 1px;
            background-color: ${customTheme.color.greyLight};
        }

        p {
            font-size: 1.4rem;
            text-transform: uppercase;

            @media (min-width: ${customTheme.breakpoint.mobile}) {
                font-size: 1.6rem;
            }

            @media (min-width: ${customTheme.breakpoint.tablet}) {
                font-size: 1.8rem;
            }
        }
    }
`

const InfoNote = styled.div`

    background-color: ${customTheme.color.greyLight};
    padding-block: 1rem;
    padding-inline: 2rem;
    border-radius: ${customTheme.radius.r15};

    span {
        color: ${customTheme.color.black};
        opacity: .75;
        font-size: 1.5rem;
    }

    p {
        margin-top: 1rem;
        font-size: 1.4rem;
        font-style: italic;
    }
`

const InfoSocials = styled.div`

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
        
        svg {
            width: 100%;
            height: 100%;
            color: ${customTheme.color.primaryDark};
        }
    }
`

const CarDetail = ({carData}) => {

  const [carImages, setCarImages] = useState([])

  useEffect(() => {

    if (!!carData?.carsImages.length) {
      setCarImages(carData.carsImages.map((image) => `${API_URL}/image/${image.source}`))
    }

  }, [carData]);

  return (
    <Wrapper className="ppt ppb">
      <Container>
        <Body>
          <Main>
            <Gallery>
              {!!carImages.length ? (
                <Swiper
                  modules={[EffectFade, Autoplay, Pagination]}
                  effect="fade"
                  className="custom-pagination"
                  spaceBetween={0}
                  pagination={{
                    enabled: true,
                    clickable: true,
                  }}
                  slidesPerView={"auto"}
                >
                  {carImages.map((image, index) => {
                    return (
                      <SwiperSlide key={image}>
                        <span className="image-blur">
                          <img src={image} alt="image-blur"/>
                        </span>
                        <Image.PreviewGroup
                          items={carImages}
                        >
                          <Image
                            key={index}
                            src={image}
                            preview={{
                              mask: false,
                              movable: false
                            }}
                            alt={`${carData.brand} ${carData.model} ${carData.number} #${index}`}
                          />
                        </Image.PreviewGroup>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              ) : (
                <></>
              )}
              {carData?.drive2 && <span className="drive2"><Drive2Icon url={carData.drive2}/></span>}
            </Gallery>
            <Info>
              {carData?.user?.instagram && (
                <InfoSocials>
                  {carData?.user?.instagram && (
                    <Link href={`https://www.instagram.com/${carData?.user?.instagram}`} target="_blank">
                      <SvgIcon name={"instagram"}/>
                    </Link>
                  )}
                </InfoSocials>
              )}
              <InfoList>
                <li>
                  <span>Марка</span>
                  <hr/>
                  <p>{carData.brand}</p>
                </li>
                <li>
                  <span>Модель</span>
                  <hr/>
                  <p>{carData.model}</p>
                </li>
                <li>
                  <span>Год выпуска</span>
                  <hr/>
                  <p>{carData.year}</p>
                </li>
                <li>
                  <span>Гос. номер</span>
                  <hr/>
                  <p>{carData.number}</p>
                </li>
              </InfoList>
              {carData?.note && (
                <InfoNote>
                  <span>Примечание</span>
                  <p>{carData.note}</p>
                </InfoNote>
              )}
            </Info>
          </Main>
          <Footer>
            <CarsOthers/>
          </Footer>
        </Body>
      </Container>
    </Wrapper>
  );
};

export default CarDetail;
