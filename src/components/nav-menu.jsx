'use client'
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {usePathname} from "next/navigation";
import Link from "next/link";

const NavMenu = () => {

  const pathname = usePathname();

  return (
    <nav className="nav-menu">
      <div className="nav-menu__body">
        <ul className="nav-menu__list">
          {pathname !== PUBLIC_PAGES.HOME.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.HOME.URL}>{PUBLIC_PAGES.HOME.TITLE}</Link>
            </li>
          )}
          {pathname !== PUBLIC_PAGES.PRODUCTS.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.PRODUCTS.URL}>{PUBLIC_PAGES.PRODUCTS.TITLE}</Link>
            </li>
          )}
          {pathname !== PUBLIC_PAGES.PARTNERS.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.PARTNERS.URL}>{PUBLIC_PAGES.PARTNERS.TITLE}</Link>
            </li>
          )}
          {pathname !== PUBLIC_PAGES.NEWS.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.NEWS.URL}>{PUBLIC_PAGES.NEWS.TITLE}</Link>
            </li>
          )}
          {pathname !== PUBLIC_PAGES.ABOUT.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.ABOUT.URL}>{PUBLIC_PAGES.ABOUT.TITLE}</Link>
            </li>
          )}
          {pathname !== PUBLIC_PAGES.CONTACTS.URL && (
            <li className="nav-menu__list_item">
              <Link className="nav-menu__list_link" href={PUBLIC_PAGES.CONTACTS.URL}>{PUBLIC_PAGES.CONTACTS.TITLE}</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
