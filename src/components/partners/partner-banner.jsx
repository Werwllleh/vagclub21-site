'use client'
import React, {useState} from 'react';
import styled from "styled-components";
import Image from "next/image";
import Container from "@/components/container";
import {customTheme} from "@/styles/theme";
import {Modal} from "antd";
import PartnerForm from "@/components/forms/partner-form";
import {useUser} from "@/hooks/useUser";
import {useLenis} from "lenis/react";
import AuthForm from "@/components/forms/auth-form";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

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

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        padding-inline: 1.5rem;
    }

    @media (min-width: ${customTheme.breakpoint.tablet}) {
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
    
    button {
        color: ${customTheme.color.primaryLight};
        background-color: ${customTheme.color.white};
        padding-block: 1.2rem;
        padding-inline: 2rem;
        font-size: 1.5rem;
        font-weight: 500;
        
        @media(min-width: ${customTheme.breakpoint.tablet}) {
            
            &:hover {
                background-color: ${customTheme.color.primaryLight};
                color: ${customTheme.color.white};
            }
        }
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

  const router = useRouter();
  const pathname = usePathname();

  const {user, isLoading} = useUser();

  const [isCompanyFormModalActive, setIsCompanyFormModalActive] = useState(false);
  const [isAuthModalActive, setIsAuthModalActive] = useState(false);

  useLenis((lenis) => {
    lenis._isLocked = isCompanyFormModalActive || isAuthModalActive
  })

  const openCompanyFormModal = () => {
    setIsCompanyFormModalActive(true)
  }

  const closeCompanyFormModal = () => {
    setIsCompanyFormModalActive(false)
  }

  const openAuthModal = () => {
    if (user && user?.data) {
      router.push('/profile?section=companies', {scroll: true})
    } else {
      setIsAuthModalActive(true)
    }
  }

  const closeAuthModal = () => {
    setIsAuthModalActive(false)
  }

  return (
    <>
      <BannerWrapper>
        <Container>
          <BannerInfo>
            <h5>Присоединяйтесь к&nbsp;партнерам VAGCLUB21</h5>
            <p>Присоединяйтесь к&nbsp;программе партнёрства: размещайте информацию о&nbsp;вашем автосервисе, магазине
              запчастей, автомойке и&nbsp;других услугах, получайте новых клиентов от&nbsp;автовладельцев
              сообщества.</p>
            {pathname.includes('/profile') ? (
              <button className="btn" type="button" onClick={openCompanyFormModal}>
                Добавить компанию
              </button>
            ) : (
              <button className="btn" type="button" onClick={openAuthModal}>
                Стать партнером VAGCLUB21
              </button>
            )}
          </BannerInfo>
        </Container>
        <BannerBg>
          <Image loading="lazy" src={'/images/partner-banner.webp'} alt="Баннер партнерство" width={1920} height={300}/>
        </BannerBg>
      </BannerWrapper>
      <Modal
        className="custom-modal"
        centered={true}
        open={isCompanyFormModalActive}
        onCancel={closeCompanyFormModal}
        footer={false}
        width={'auto'}
      >
        <PartnerForm onClose={closeCompanyFormModal} />
      </Modal>
      <Modal
        className="custom-modal"
        centered={true}
        open={isAuthModalActive}
        onCancel={closeAuthModal}
        footer={false}
      >
        <AuthForm onClose={closeAuthModal} />
      </Modal>
    </>
  );
};

export default PartnerBanner;
