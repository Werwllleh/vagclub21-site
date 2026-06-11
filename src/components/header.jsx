'use client'
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import NavMenu from "@/components/nav-menu";
import Burger from "@/components/burger";
import {useBlockWrap} from "@/hooks/useBlockWrap";
import {useLenis} from "lenis/react";
import {useUiStore} from "../store/ui.store";
import styled from "styled-components";
import {customTheme} from "../styles/theme";
import Logo from "./logo";


const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin-inline: auto;
    transform: ${({$headerIsVisible}) => ($headerIsVisible ? 'translateY(1rem)' : 'translateY(calc(-100% - 2rem))')};
    max-width: 95%;
    opacity: ${({$headerIsVisible}) => ($headerIsVisible ? 1 : 0)};
    visibility: ${({$headerIsVisible}) => ($headerIsVisible ? 'visible' : 'hidden')};
    width: 100%;
    z-index: 6;
    background-color: #ffffffa1;
    backdrop-filter: blur(1rem);
    border-radius: ${customTheme.radius.r15};
    box-shadow: 0 0 .5rem .5rem #0000000f;
    will-change: transform, opacity;
    transition: opacity ${customTheme.transition.medium},
    visibility ${customTheme.transition.medium},
    transform ${customTheme.transition.medium};
    transition: ${({$mounted}) => $mounted ? ` opacity ${customTheme.transition.medium}, visibility ${customTheme.transition.medium}, transform ${customTheme.transition.medium}` : 'none'};

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        transform: ${({$headerIsVisible}) => ($headerIsVisible ? 'translateY(2rem)' : 'translateY(calc(-100% - 2rem))')};
    }
`

const HeaderInner = styled.div`
    padding-block: 1.4rem;
    padding-inline: 1.6rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        padding-block: 1.6rem;
        padding-inline: 2rem;
    }

    @media (min-width: ${customTheme.breakpoint.w1250}) {
        padding-block: 2rem;
        padding-inline: 3rem;
    }
`

const HeaderBody = styled.div`
    display: flex;
    align-items: center;
    gap: 0 2rem;
`

const HeaderLogo = styled(Link)`
    display: flex;
    align-items: center;
    max-width: max-content;
`

const HeaderDesktopNavWrap = styled.div`
    margin-left: auto;
    display: none;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: block;
    }
`

const HeaderBurgerWrap = styled.div`
    margin-left: auto;
    display: block;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: none;
    }
`

const HeaderMobileWrap = styled.div`
    opacity: ${({$mobileMenuActive}) => ($mobileMenuActive ? 1 : 0)};
    visibility: ${({$mobileMenuActive}) => ($mobileMenuActive ? 'visible' : 'hidden')};
    pointer-events: ${({$mobileMenuActive}) => ($mobileMenuActive ? 'auto' : 'none')};
    max-height: ${({$height}) => $height}px;
    overflow: hidden;

    transition: max-height ${customTheme.transition.small},
    opacity ${customTheme.transition.small},
    visibility ${customTheme.transition.small};
`

const HeaderMobileInner = styled.div`
    padding-block: 1rem 0;
`

const Header = () => {

  gsap.registerPlugin(useGSAP);

  const mobileMenuActive = useUiStore((state) => state.mobileMenuActive)
  const setMobileMenuActive = useUiStore((state) => state.setMobileMenuActive)

  const [mounted, setMounted] = useState(false)
  const [headerIsVisible, setHeaderIsVisible] = useState(false);

  const mobileMenu = useRef(null);

  const mobileMenuInnerRef = useRef(null)
  const [mobileMenuHeight, setMobileMenuHeight] = useState(0)

  useLenis((lenis) => {
    if (lenis.animatedScroll >= 300) {
      if (lenis.direction === 1) {
        setHeaderIsVisible(false);
      } else if (lenis.direction === -1) {
        setHeaderIsVisible(true);
      }
    } else {
      setHeaderIsVisible(true)
    }

    lenis._isLocked = mobileMenuActive
  })

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true)
      setHeaderIsVisible(true)
    })
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuActive(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive)
  }

  useBlockWrap(mobileMenuActive)

  useEffect(() => {

    if (!mobileMenuActive) {
      setMobileMenuHeight(0)
      return
    }

    const updateHeight = () => {
      if (!mobileMenuInnerRef.current) return
      setMobileMenuHeight(mobileMenuInnerRef.current.offsetHeight)
    }

    updateHeight()

    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [mobileMenuActive])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuActive(false)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <HeaderContainer
      $mounted={mounted}
      $headerIsVisible={headerIsVisible}
    >
      <HeaderInner>
        <HeaderBody>
          <HeaderLogo href={PUBLIC_PAGES.HOME.URL}>
            <Logo/>
          </HeaderLogo>
          <HeaderDesktopNavWrap>
            <NavMenu onLinkClick={closeMobileMenu}/>
          </HeaderDesktopNavWrap>
          <HeaderBurgerWrap>
            <Burger onClick={toggleMobileMenu} />
          </HeaderBurgerWrap>
        </HeaderBody>
        <HeaderMobileWrap
          $mobileMenuActive={mobileMenuActive}
          $height={mobileMenuHeight}
          ref={mobileMenu}
          data-lenis-prevent
        >
          <HeaderMobileInner ref={mobileMenuInnerRef}>
            <NavMenu mobile onLinkClick={closeMobileMenu}/>
          </HeaderMobileInner>
        </HeaderMobileWrap>
      </HeaderInner>
    </HeaderContainer>
  );
};

export default Header;
