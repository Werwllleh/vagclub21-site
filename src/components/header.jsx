'use client'
import {useEffect, useState} from "react";
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
import {checkUrl} from "@/utils/utils";
import SvgIcon from "@/components/svg-icon";
import Logo from "@/components/logo";


const Header = () => {

  const pathname = usePathname();

  const {isLoadingUser, user} = useUser();

  const [photoAvailable, setPhotoAvailable] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      if (!user?.userPhoto) {
        setPhotoAvailable(false);
        return;
      }

      const exists = await checkUrl(user.userPhoto);
      if (!cancelled) setPhotoAvailable(exists);
    }

    check();

    return () => {
      cancelled = true;
    };
  }, [user?.userPhoto]);

  const headerAvatarAuth = (
    <div className="header__auth">
      <AuthButton/>
    </div>
  )

  return (
    <header className={`header ${pathname === '/' ? 'pm' : ''}`}>
      <div className="header__inner">
        <div className="header__container container">
          <div className="header__body">
            <Link href={PUBLIC_PAGES.HOME.URL} className="header__logo">
              <Logo />
            </Link>
          </div>
        </div>
      </div>
    </header>
    /*<>
      <header ref={headerRef} className={`header ${isFixed && !isMenuActive ? "fixed" : ""} ${path === '/' ? 'pm' : ''}`}>
        <div className="container">
          <div className="header__body">
            <Link onClick={closeMenu} href={PUBLIC_PAGES.HOME.URL} className="header__logo">
              {/!*<MainLogo/>*!/}
              <SvgIcon name={"logo"}/>
            </Link>
            <div className="header__info">
              {pathname !== MENU.PROFILE.URL && (
                <div className="header__avatar">
                  {!isLoadingUser && user && (
                    <Link href={'/profile'}>
                      {photoAvailable === true && (
                        <Avatar
                          src={user.userPhoto}
                          style={{backgroundColor: user?.data.user_color}}
                          size={32}
                        />
                      )}
                      {photoAvailable === false && (
                        <span
                          className="header__avatar--not"
                          style={{backgroundColor: user.data.color}}
                        >
                          <span>{user.data.name.substring(0, 2).toUpperCase()}</span>
                        </span>
                      )}
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
                {/!*<Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>*!/}
                <Link href={SOCIALS.TELEGRAM} target={"_blank"}>
                  <SvgIcon name={"telegram"}/>
                </Link>
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
    </>*/
  );
};

export default Header;
