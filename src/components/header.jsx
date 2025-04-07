'use client'
import {useCallback, useEffect, useRef, useState} from "react";
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import {SOCIALS} from "@/config/socials.config";
import TelegramIcon from "@/components/icons/telegram-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import NavMenu from "@/components/nav-menu";
import {useAuthUser} from "@/hooks/useAuthUser";


const Header = () => {

  // const {isLoading, user} = useAuthUser();

  // console.log(user)

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const headerBgRef = useRef(null);

  const [isFixed, setFixed] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const getTopPosition = useCallback(() => {
    if (!headerRef.current || !mobileMenuRef.current) {
      return;
    }

    const header = headerRef.current;
    const mobileMenu = mobileMenuRef.current;
    const mobileMenuContent = mobileMenu.querySelector(".header__mobile_body");


    mobileMenu.style.top = `${header.clientHeight}px`;

    if (isMenuActive && mobileMenuContent) {
      mobileMenu.style.maxHeight = `${mobileMenuContent.clientHeight}px`;
    } else {
      mobileMenu.style.maxHeight = '';
    }
  }, [isMenuActive]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setFixed(true);
      } else {
        setFixed(false);
      }
      getTopPosition();
    };

    const handleResize = () => {
      getTopPosition();
    };

    const mobileMenuLinks = mobileMenuRef.current.querySelectorAll(".nav-menu__list_link");

    if (mobileMenuLinks.length) {
      mobileMenuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
      })
    }


    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      handleResize()

      if (window.innerWidth >= 992 && isMenuActive) {
        closeMenu();
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [getTopPosition]);

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  useEffect(() => {
    getTopPosition();
  }, [isMenuActive]);

  return (
    <>
      <header ref={headerRef} className={`header ${isFixed && !isMenuActive ? "fixed" : ""}`}>
        <div className="container">
          <div className="header__body">
            <Link onClick={closeMenu} href={PUBLIC_PAGES.HOME.URL} className="header__logo">
              <MainLogo/>
            </Link>
            <div className="header__nav">
              <NavMenu />
            </div>
            <div className="header__socials">
              <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
              <Link href={SOCIALS.INSTAGRAM} target={"_blank"}><InstagramIcon/></Link>
            </div>
            <button onClick={toggleMenu} className={`header__burger ${isMenuActive ? "active" : ""}`}>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div ref={mobileMenuRef} className={`header__mobile ${isMenuActive ? "show" : ""}`}>
        <div className="container">
          <div className="header__mobile_body">
            <div className="header__mobile_nav">
              <NavMenu/>
            </div>
            <div className="header__mobile_socials">
              <ul className="header__mobile_socials_list">
                <li className="header__mobile_socials_item">
                  <p>Беседа</p>
                  <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
                </li>
                <li className="header__mobile_socials_item">
                  <p>Instagram</p>
                  <Link href={SOCIALS.INSTAGRAM} target={"_blank"}><InstagramIcon/></Link>
                </li>
                <li className="header__mobile_socials_item">
                  <p>Telegram BOT</p>
                  <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div ref={headerBgRef} onClick={closeMenu} className={`header__bg ${isMenuActive ? "active" : ""}`}/>
    </>
  );
};

export default Header;
