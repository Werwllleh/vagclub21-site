import React from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import MainLogo from "@/components/main-logo";
import Link from "next/link";
import dayjs from "dayjs";

const Footer = () => {


  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__body">
          <Link href={PUBLIC_PAGES.HOME.URL} className="footer__logo">
            <MainLogo/>
          </Link>
          <div className="footer__date">{dayjs().year()}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
