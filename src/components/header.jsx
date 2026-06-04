'use client'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import NavMenu from "@/components/nav-menu";
import Burger from "@/components/burger";
import {useBlackout} from "@/hooks/useBlackout";
import Logo from "@/components/logo";
import {useBlockWrap} from "@/hooks/useBlockWrap";
import {useLenis} from "lenis/react";


const Header = () => {

  gsap.registerPlugin(useGSAP);

  const [headerIsVisible, setHeaderIsVisible] = useState(false);
  const mobileMenu = useRef(null);

  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);

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
  })

  useEffect(() => {
    setHeaderIsVisible(true)
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuIsActive(!mobileMenuIsActive);
  }

  useBlockWrap(mobileMenuIsActive)
  useBlackout(mobileMenuIsActive)

  useEffect(() => {
    const mobileMenuTarget = mobileMenu.current;
    const inner = mobileMenuTarget.querySelector('.header-mobile__inner');

    if (mobileMenuIsActive) {
      mobileMenuTarget.style.maxHeight = `${inner.offsetHeight}px`;
    } else {
      mobileMenuTarget.style.maxHeight = '';
    }

    const navLinks = mobileMenuTarget.querySelectorAll('a.link');
    if (navLinks.length) {
      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          setMobileMenuIsActive(false);
        })
      })
    }

    const checkMobileMenu = () => {
      const mobileMenuTarget = mobileMenu.current;
      const inner = mobileMenuTarget.querySelector('.header-mobile__inner');

      if (window.innerWidth > 768) {
        mobileMenuTarget.style.maxHeight = '';
        setMobileMenuIsActive(false);
      } else {
        if (mobileMenuIsActive) {
          mobileMenuTarget.style.maxHeight = `${inner.offsetHeight}px`;
        }
      }
    }

    window.addEventListener("resize", checkMobileMenu);

    return () => {
      window.removeEventListener("resize", checkMobileMenu);
    };

  }, [mobileMenuIsActive]);

  useEffect(() => {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        setMobileMenuIsActive(false);
      });
    }
  }, []);

  return (
    <header className={`header ${headerIsVisible ? 'shown' : ''}`}>
      <div className="header__inner">
        <div className="header__container">
          <div className="header__body">
            <Link href={PUBLIC_PAGES.HOME.URL} className="header__logo">
              <Logo />
            </Link>
            <div className="header__nav">
              <NavMenu />
            </div>
            <div className="header__burger">
              <Burger onClick={toggleMobileMenu} status={mobileMenuIsActive}/>
            </div>
          </div>
        </div>
        <div className={`header-mobile ${mobileMenuIsActive ? 'is-open' : ''}`}
             ref={mobileMenu}
        >
          <div className="header-mobile__inner">
            <nav className="header-mobile__nav">
              <NavMenu />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
