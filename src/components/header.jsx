'use client'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import NavMenu from "@/components/nav-menu";
import Burger from "@/components/burger";
import {useUser} from "@/hooks/useUser";
import {useBlackout} from "@/hooks/useBlackout";
import AuthButton from "@/components/auth-button";
import {usePathname} from "next/navigation";
import {checkUrl} from "@/utils/utils";
import Logo from "@/components/logo";
import {useBlockWrap} from "@/hooks/useBlockWrap";


const Header = () => {

  gsap.registerPlugin(useGSAP);

  const pathname = usePathname();
  const header = useRef(null);
  const mobileMenu = useRef(null);

  const {isLoadingUser, user} = useUser();

  const [photoAvailable, setPhotoAvailable] = useState(null);
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);

  useEffect(() => {
    gsap.to(header.current, {
      opacity: 1,
      y: 0,
      duration: 0.2,
      ease: "none",
    });
  }, [header]);

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
    <header ref={header} className={`header ${pathname === '/' ? 'pm' : ''}`}>
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
