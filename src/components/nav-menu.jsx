'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";
import {MENU} from "@/config/menu.config";

const NavMenu = () => {

  const pathname = usePathname();

  return (
    <nav className="nav-menu">
      <div className="nav-menu__body">
        <ul className="nav-menu__list">
          {Object.entries(MENU).map((ITEM) => {

            const itemData = ITEM[1];

            return (
              <li key={ITEM[0]} className="nav-menu__list_item">
                <Link
                  className={`nav-menu__list_link ${pathname.includes(itemData.URL) ? 'active' : ''}`}
                  href={itemData.URL}>
                  {itemData.TITLE}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  );
};

export default NavMenu;
