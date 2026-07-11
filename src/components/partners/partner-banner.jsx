import React from 'react';
import styled from "styled-components";
import Image from "next/image";
import Container from "@/components/container";
import {customTheme} from "@/styles/theme";

const BannerWrapper = styled.div`
    position: relative;
    min-height: 32rem;
    overflow: hidden;
    max-width: 144rem;
    width: 100%;
    margin-inline: auto;
    border-radius: ${customTheme.radius.r15};
    padding-block: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`


const BannerInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    font-family: ${customTheme.font.secondary};

    @media (min-width: ${({theme}) => customTheme.breakpoint.mobile}) {
        padding-inline: 1.5rem;
    }

    @media (min-width: ${({theme}) => customTheme.breakpoint.tablet}) {
        padding-inline: 3rem;
    }


    h5 {
        color: ${customTheme.color.white};
        font-size: clamp(2.2rem, 3vw, 3.2rem);
        font-weight: 600;
        line-height: 1.55;
    }

    p {
        max-width: 70rem;
        font-size: clamp(1.5rem, 3vw, 2rem);
        line-height: 1.55;
        color: ${customTheme.color.white};
    }
`

const BannerBg = styled.div`
    position: absolute;
    inset: 0;
    z-index: -1;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: rgba(12, 12, 12, 0.8);

        @media (min-width: ${({theme}) => customTheme.breakpoint.tablet}) {
            background-color: rgba(12, 12, 12, 0.65);
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
`

const PartnerBanner = () => {



  return (
    <>
      <BannerWrapper>
        <Container>
          <BannerInfo>
            <h5>Присоединяйтесь к&nbsp;партнерам VAGCLUB21</h5>
            <p>Присоединяйтесь к&nbsp;программе партнёрства: размещайте информацию о&nbsp;вашем автосервисе, магазине
              запчастей, автомойке и&nbsp;других услугах, получайте новых клиентов от&nbsp;автовладельцев
              сообщества.</p>
          </BannerInfo>
        </Container>
        <BannerBg>
          <Image src={'/images/partner-banner.webp'} alt="Баннер партнерство" width={1920} height={300}/>
        </BannerBg>
      </BannerWrapper>
    </>
  );
};

export default PartnerBanner;
