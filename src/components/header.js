import React from 'react';
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import {SOCIALS} from "@/config/socials.config";
import TelegramIcon from "@/components/icons/telegram-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import {PUBLIC_PAGES} from "@/config/pages/public.config";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <Link href={PUBLIC_PAGES.HOME} className="header__logo">
            <MainLogo/>
          </Link>
          <nav className="header__nav"></nav>
          <div className="header__socials">
            <Link href={SOCIALS.TELEGRAM} target={"_blank"}><TelegramIcon/></Link>
            <Link href={SOCIALS.INSTAGRAM} target={"_blank"}><InstagramIcon/></Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
