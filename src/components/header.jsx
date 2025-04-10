'use client'
import {useCallback, useEffect, useRef, useState} from "react";
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import {SOCIALS} from "@/config/socials.config";
import TelegramIcon from "@/components/icons/telegram-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import NavMenu from "@/components/nav-menu";
import Burger from "@/components/burger";
import {useUser} from "@/hooks/useUser";
import {useBlackout} from "@/hooks/useBlackout";
import {Avatar, Popover} from "antd";
import {UserOutlined} from "@ant-design/icons";
import AuthButton from "@/components/auth-button";
import {usePathname} from "next/navigation";
import {MENU} from "@/config/menu.config";


const Header = () => {

  const pathname = usePathname();

  const {isLoadingUser, user} = useUser();

  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [isFixed, setFixed] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const getTopPosition = useCallback(() => {
    if (!headerRef.current || !mobileMenuRef.current) {
      return;
    }

    const header = headerRef.current;
    const mobileMenu = mobileMenuRef.current;
    const mobileMenuContent = mobileMenu.querySelector(".header__menu_body");

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

  useBlackout(isMenuActive, closeMenu);

  const headerAvatarAuth = (
    <div className="header__auth">
      <AuthButton />
    </div>
  )

  return (
    <>
      <header ref={headerRef} className={`header ${isFixed && !isMenuActive ? "fixed" : ""}`}>
        <div className="container">
          <div className="header__body">
            <Link onClick={closeMenu} href={PUBLIC_PAGES.HOME.URL} className="header__logo">
              <MainLogo/>
            </Link>
            <div className="header__info">
              {pathname !== MENU.PROFILE.URL && (
                <div className="header__avatar">
                  {!isLoadingUser && user && (
                    <Link href={'/profile'}>
                      <Avatar
                        src={user?.userPhoto ? user.userPhoto : false}
                        style={{backgroundColor: user?.data.user_color}}
                        size={32}
                      >{!user?.userPhoto && user?.data?.user_name ? user.data.user_name?.slice(0, 2).toUpperCase() : null}</Avatar>
                    </Link>
                  )}
                  {!isLoadingUser && user === null && (
                    <Popover placement="bottom" content={headerAvatarAuth}>
                      <Avatar size={32} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                    </Popover>
                  )}
                </div>
              )}
              <div className={`header__socials ${isMenuActive ? 'hide' : ''}`}>
                <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
                <Link href={SOCIALS.INSTAGRAM} target={"_blank"}><InstagramIcon/></Link>
              </div>
            </div>
            <div className="header__burger">
              <Burger onClick={toggleMenu} status={isMenuActive}/>
            </div>
          </div>
        </div>
      </header>
      <div ref={mobileMenuRef} className={`header__menu ${isMenuActive ? "show" : ""}`}>
        <div className="container">
          <div className="header__menu_body">
            <div className="header__menu_nav">
              <NavMenu/>
            </div>
            <div className="header__menu_socials">
              <ul className="header__menu_socials_list">
                <li className="header__menu_socials_item">
                  <p>Беседа</p>
                  <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
                </li>
                <li className="header__menu_socials_item">
                  <p>Instagram</p>
                  <Link href={SOCIALS.INSTAGRAM} target={"_blank"}><InstagramIcon/></Link>
                </li>
                <li className="header__menu_socials_item">
                  <p>Telegram BOT</p>
                  <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
