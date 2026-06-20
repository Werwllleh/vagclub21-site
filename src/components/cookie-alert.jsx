'use client'
import styled from "styled-components";
import Link from "next/link";
import {customTheme} from "@/styles/theme";
import SvgIcon from "@/components/svg-icon";
import {useEffect, useState} from "react";

const CookieElement = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background-color: #ffffffd6;
    backdrop-filter: blur(1rem);
    border-radius: ${customTheme.radius.r10};
    max-width: 90%;
    margin-inline: auto;
    width: 100%;
    padding-block: 2rem;
    padding-inline: 1.5rem;
    box-shadow: ${({$active}) => (
            $active ? '0 .3rem .9rem -.25rem #000' : 'none'
    )};
    opacity: ${({$active}) => (
            $active ? 1 : 0
    )};
    visibility: ${({$active}) => (
            $active ? 'visible' : 'hidden'
    )};
    transform: ${({$active}) => (
            $active ? 'translateY(-5.5rem)' : 'translateY(110%)'
    )};
    transition: 
            opacity ${customTheme.transition.medium},
            visibility ${customTheme.transition.medium},
            transform ${customTheme.transition.medium};

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        padding-block: 2rem;
        padding-inline: 3rem;
        transform: ${({$active}) => (
                $active ? 'translateY(-5.5rem)' : 'translateY(110%)'
        )};
    }
    
    @media (min-width: ${customTheme.breakpoint.tablet}) {
        max-width: 57rem;
        transform: ${({$active}) => (
                $active ? 'translateY(-7.5rem)' : 'translateY(110%)'
        )};
    }
`

const CookieBody = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1.5rem;
`

const CookieInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const CookieTitle = styled.h3`
    font-weight: 500;
    font-size: 1.4rem;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        font-size: 1.6rem;
    }
`

const CookieText = styled.div`
    margin-top: 1rem;
    font-weight: 300;
    font-size: 1.1rem;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        font-size: 1.3rem;
    }
`

const CookieActions = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: stretch;
    gap: 2rem;
`

const CookieIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;

    svg {
        height: 100%;
        width: 100%;
        color: ${customTheme.color.primary};
    }
`

const CookieAction = styled(Link)`
    border-radius: ${customTheme.radius.r7};
`

const CookieAlert = () => {


  const [cookieActive, isCookieActive] = useState(false);

  useEffect(() => {
    const isAccepted = localStorage.getItem("cookie_accept") === '1';
    isCookieActive(!isAccepted);
  }, []);

  return (
    <CookieElement $active={cookieActive} >
      <CookieBody>
        <CookieIcon>
          <SvgIcon name="cookie"/>
        </CookieIcon>
        <CookieInfo>
          <CookieTitle>
            Да, мы&nbsp;используем cookies
          </CookieTitle>
          <CookieText>
            <p>
              Cookies помогают сайту работать стабильно, сохранять настройки и&nbsp;улучшать качество сервиса.
            </p>
          </CookieText>
          <CookieActions>
            <CookieAction
              as="button"
              className="btn primary s"
              onClick={() => {
                localStorage.setItem("cookie_accept", '1')
                isCookieActive(false)
              }}
            >
              Понятно
            </CookieAction>
            <CookieAction
              href="/policy"
              className="btn default s"
            >
              Подробнее
            </CookieAction>
          </CookieActions>
        </CookieInfo>
      </CookieBody>
    </CookieElement>
  );
};

export default CookieAlert;
