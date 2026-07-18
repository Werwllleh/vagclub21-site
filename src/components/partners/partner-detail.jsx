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
import SvgIcon from "@/components/svg-icon";
import Link from "next/link";
import YandexMap from "@/components/yandex-map";
import React from "react";
import PartnersLabels, {PartnersLabelsWrapper} from "@/components/partners/partners-labels";

const PartnerWrap = styled(AnimateSection)`
    background-color: ${customTheme.color.greyLight};
`

const PartnerHero = styled.section`
    position: relative;
    min-height: 70dvh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        min-height: 100dvh;
    }
`

const PartnerSwiper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    inset: 0;

    .swiper {
        height: 100%;

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
    padding-block: 0 3rem;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        pointer-events: none;
        padding-block: 12rem 8rem;
    }
`

const PartnerInfoBody = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1.6rem;
    color: ${customTheme.color.white};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        gap: 3rem;
    }

    h1 {
        font-weight: 500;
        text-transform: uppercase;
        max-width: 72rem;
        pointer-events: none;
    }
`

const PartnerInfoDescription = styled.div`
    max-width: 105rem;
    font-size: 1.3rem;
    white-space: pre-wrap;
    line-height: 1.55;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        font-size: clamp(1.4rem, 5vw, 1.6rem);
    }
`

const PartnerInfoAddress = styled.div`
    margin-top: 2rem;
    font-weight: 500;
    color: ${customTheme.color.primaryDark};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        margin-top: 3rem;
    }
    
    a {
        color: inherit;
        
        &:hover {
            color: ${customTheme.color.primary};
        }
    }
`

const PartnerDiscount = styled.div`
    position: relative;
    margin-top: 2rem;
    font-weight: 500;
    font-size: 1.3rem;
    color: ${customTheme.color.white};
    padding-block: 1.6rem;
    line-height: 1.5;
    padding-inline: 2rem;
    z-index: 1;
    border-radius: ${customTheme.radius.r10};
    overflow: hidden;
    max-width: max-content;
    
    b {
        font-weight: 600;
        font-size: 1.5rem;
    }

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        margin-top: 3rem;
        padding-block: 2rem;
        font-size: 1.5rem;

        b {
            font-size: 1.8rem;
        }
    }
    
    &:after {
        content: "";
        z-index: -1;
        background-image: linear-gradient(135deg, #2c2928 0 33%, #e31e23 33% 66%, #eccb00 66% 100%);
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`

const PartnerTagList = styled.ul`
    display: flex;
    align-items: center;
    gap: 0 1rem;
    overflow-x: auto;
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
    
    &::-webkit-scrollbar {
        display: none;
    }
    
    @media (min-width: ${customTheme.breakpoint.tablet}) {
        gap: 1.6rem 1rem;
        margin-inline: 0;
        padding-inline: 0;
        flex-wrap: wrap;
        max-width: 72rem;
    }
`

const PartnerTag = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${customTheme.radius.r30};
    border: 1px solid ${customTheme.color.white};
    background-color: ${customTheme.color.white};
    color: ${customTheme.color.primaryDark};
    padding-block: 1rem;
    padding-inline: 1.6rem;
    font-size: 1.2rem;
    max-width: max-content;
    white-space: nowrap;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: clamp(1.2rem, 5vw, 1.4rem);
        padding-block: 1.2rem;
        padding-inline: 2rem;
    }
`

const PartnerMain = styled.section`
    padding-block: clamp(3rem, 5vw, 5rem) clamp(5rem, 5vw, 10rem);
    
    ${PartnersLabelsWrapper} {
        padding-top: clamp(5rem, 5vw, 10rem);
    }
`

const PartnerContacts = styled.div`
    padding-block: 2rem;
    padding-inline: 2rem;
    background-color: ${customTheme.color.white};

    & > h3 {
        font-size: clamp(1.5rem, 5vw, 2rem);
        font-weight: 500;
    }
`

const PartnerContactsColumns = styled.div`
    margin-top: clamp(2rem, 5vw, 4rem);
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 3rem;
`

const PartnerContactsColumn = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    & > h4 {
        font-size: 1.3rem;
        color: ${customTheme.color.black};
        opacity: .8;

        @media (min-width: ${customTheme.breakpoint.mobile}) {
            font-size: clamp(1.4rem, 5vw, 1.6rem);
        }
    }

    & > ul {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;

        li {

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                max-width: max-content;
                color: ${customTheme.color.primaryDark};
                font-size: 1.25rem;

                @media (min-width: ${customTheme.breakpoint.mobile}) {
                    font-size: clamp(1.25rem, 5vw, 1.5rem);
                }

                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;

                    @media (min-width: ${customTheme.breakpoint.mobile}) {
                        width: 2.4rem;
                        height: 2.4rem;
                    }


                    svg {
                        width: 100%;
                        height: 100%;
                        color: ${customTheme.color.primary};
                    }
                }

                &:hover {
                    color: ${customTheme.color.primary};
                }
            }
        }
    }

    &.socials {
        & > ul {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 1.6rem 1rem;

            li {

                a {
                    padding: 1rem;
                    border: 1px solid ${customTheme.color.greyLight};
                    background-color: ${customTheme.color.greyLight};
                    border-radius: ${customTheme.radius.r10};

                    &:hover {
                        svg {
                            transform: scale(1.1);
                        }
                    }
                }
            }
        }
    }
`

const PartnerMap = styled.div`

`

const PartnerFooter = styled.div`
    margin-top: 3rem;
    border-radius: ${customTheme.radius.r15};
    overflow: hidden;
`

const PartnerMapInner = styled.div`
    height: 35rem;
    overflow: hidden;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        height: 40rem;
    }
`

const PartnerNote = styled.p`
    margin-top: 2rem;
    padding-block: 2rem;
    padding-inline: 2rem;
    color: ${customTheme.color.grey};
    background-color: ${customTheme.color.white};
    border-radius: ${customTheme.radius.r15};
    font-size: 1.1rem;
    line-height: 1.5;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: 1.3rem;
    }
    
    a {
        color: ${customTheme.color.primary};
        text-decoration: underline;
        text-underline-offset: .5rem;
    }
`

const PartnerDetail = ({partnerData}) => {

  return (
    <PartnerWrap as="div">
      <PartnerHero>
        {!!partnerData?.gallery?.length ? (
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
              {partnerData.gallery.map((slide, index) => (
                <SwiperSlide key={slide?.id}>
                  <Image loading={index === 0 ? "eager" : "lazy"} src={slide?.url} alt={slide?.alt} width={1920} height={500} />
                </SwiperSlide>
              ))}
            </Swiper>
          </PartnerSwiper>
        ) : <div style={{backgroundColor: customTheme.color.greyLight, height: '100%'}}></div>}
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
              {partnerData?.discount && (
                <PartnerDiscount>
                  Компания предоставляет клубную скидку до&nbsp;<b>{partnerData?.discount}%</b>
                </PartnerDiscount>
              )}
              {partnerData?.address && (
                <PartnerInfoAddress>
                  {partnerData?.contacts?.yandexMaps ? (
                    <Link href={partnerData?.contacts?.yandexMaps} target={"_blank"}>
                      | {partnerData.address}
                    </Link>) : (
                    <p>
                      | {partnerData.address}
                    </p>
                  )}
                </PartnerInfoAddress>)}
            </PartnerInfoDescription>
          )}
          <PartnerFooter>
            {partnerData?.contacts && (
              <PartnerContacts>
                <h3>Контакты</h3>
                <PartnerContactsColumns>
                  {!!partnerData.contacts?.phones?.length && (
                    <PartnerContactsColumn>
                      <h4>Позвонить</h4>
                      <ul>
                        {partnerData.contacts.phones.map((phone) => (
                          <li key={phone.id}>
                            <Link href={`tel:${phone.phone}`}>
                            <span>
                              <SvgIcon name="phone"/>
                            </span>
                              {phone.phone}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PartnerContactsColumn>
                  )}
                  {(partnerData.contacts?.telegram || partnerData.contacts?.instagram || partnerData.contacts?.max || partnerData.contacts?.vk || partnerData.contacts?.avito || partnerData.contacts?.site) && (
                    <PartnerContactsColumn className="socials">
                      <h4>Всегда на связи</h4>
                      <ul>
                        {partnerData.contacts?.telegram && (
                          <li>
                            <Link href={partnerData.contacts.telegram} target={`_blank`}>
                            <span>
                              <SvgIcon name="telegram"/>
                            </span>
                            </Link>
                          </li>
                        )}
                        {partnerData.contacts?.instagram && (
                          <li>
                            <Link href={partnerData.contacts.instagram} target={`_blank`}>
                            <span>
                              <SvgIcon name="instagram"/>
                            </span>
                            </Link>
                          </li>
                        )}
                        {partnerData.contacts?.vk && (
                          <li>
                            <Link href={partnerData.contacts.vk} target={`_blank`}>
                            <span>
                              <SvgIcon name="vk"/>
                            </span>
                            </Link>
                          </li>
                        )}
                        {partnerData.contacts?.max && (
                          <li>
                            <Link href={partnerData.contacts.max} target={`_blank`}>
                            <span>
                              <SvgIcon name="max_messenger"/>
                            </span>
                            </Link>
                          </li>
                        )}
                        {partnerData.contacts?.avito && (
                          <li>
                            <Link href={partnerData.contacts.avito} target={`_blank`}>
                            <span>
                              <SvgIcon name="avito"/>
                            </span>
                            </Link>
                          </li>
                        )}
                        {partnerData.contacts?.site && (
                          <li>
                            <Link href={partnerData.contacts.site} target={`_blank`}>
                            <span>
                              <SvgIcon name="site"/>
                            </span>
                            </Link>
                          </li>
                        )}
                      </ul>
                    </PartnerContactsColumn>
                  )}
                  {!!partnerData.contacts?.emails?.length && (
                    <PartnerContactsColumn>
                      <h4>Написать на почту</h4>
                      <ul>
                        {partnerData.contacts.emails.map((email) => (
                          <li key={email.id}>
                            <Link href={`mailto:${email.email}`}>
                            <span>
                              <SvgIcon name="email"/>
                            </span>
                              {email.email}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </PartnerContactsColumn>
                  )}
                </PartnerContactsColumns>
              </PartnerContacts>
            )}
            {partnerData?.coordinates && (partnerData.coordinates?.lat && partnerData.coordinates?.lng) && (
              <PartnerMap>
                <PartnerMapInner>
                  <YandexMap
                    coordinates={Object.values(partnerData.coordinates)}
                    zoom={17}
                    placemarkOptions={{
                      link: partnerData?.contacts?.yandexMaps,
                    }}
                  />
                </PartnerMapInner>
              </PartnerMap>
            )}
          </PartnerFooter>
          <PartnerNote>
            Администрация автоклуба не&nbsp;отвечает напрямую за&nbsp;услуги партнеров клуба, но&nbsp;всегда готовы помочь разобраться в&nbsp;сложных ситуациях. Если вопрос не&nbsp;удалось решить на&nbsp;месте, пожалуйста, свяжитесь с&nbsp;<Link href={"#"} target={"_blank"}>главным администратором</Link>&nbsp;&mdash; мы&nbsp;найдем решение.
          </PartnerNote>
        </Container>
        <PartnersLabels />
      </PartnerMain>
    </PartnerWrap>
  );
};

export default PartnerDetail;
