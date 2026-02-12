'use client'

import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useBlackout} from "@/hooks/useBlackout";


const menuList = [
  {
    label: 'Авто',
    key: 'cars',
    path: '/cars',
  },
  {
    label: 'Атрибутика',
    key: 'products',
    path: '/products',
    children: [
      {
        label: 'Наклейки',
        key: 'stickers',
        path: '/products/stickers',
      },
      {
        label: 'Ароматизаторы',
        key: 'flavours',
        path: '/products/flavours',
      },
    ]
  },
  {
    label: 'Клуб',
    key: 'club',
    path: '',
    children: [
      {
        label: 'О нас',
        key: 'about',
        path: '/about',
      },
      {
        label: 'Блог',
        key: 'blog',
        path: '/blog',
      },
      {
        label: 'Встречи',
        key: 'meet',
        path: '/meet',
      },
      {
        label: 'Контакты',
        key: 'contacts',
        path: '/contacts',
      },
    ]
  },
  {
    label: 'Профиль',
    key: 'profile',
    path: '/profile',
  },
]

const CLOSE_DELAY = 140;

const NavMenu = () => {

  const navRef = useRef(null);
  const closeTimerRef = useRef(null);

  const [openKey, setOpenKey] = useState(null);
  const isOverlayActive = openKey !== null;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const open = (key) => {
    clearCloseTimer();
    setOpenKey(key);
  };

  const scheduleClose = (key) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setOpenKey((current) => (current === key ? null : current));
    }, CLOSE_DELAY);
  };

  const closeNow = () => {
    clearCloseTimer();
    setOpenKey(null);
  };

  useBlackout(isOverlayActive, () => {
    clearCloseTimer();
    setOpenKey(null);
  })

  return (
    <nav className="nav-menu" ref={navRef}>
      <ul className="nav-menu__list">
        {menuList.map((item) => {
          const hasChildren = !!(item.children && item.children.length);
          const isOpen = openKey === item.key;

          return (
            <li
              key={item.key}
              className={`nav-menu__item ${isOpen ? "is-open" : ""}`}
              onMouseEnter={() => hasChildren && open(item.key)}
              onMouseLeave={() => hasChildren && scheduleClose(item.key)}
              onFocus={() => hasChildren && open(item.key)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  hasChildren && scheduleClose(item.key);
                }
              }}
            >
              {item.path && item.path !== '' ? (
                <Link
                  href={item.path}
                  className="link"
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? isOpen : undefined}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="link"
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? isOpen : undefined}
                >
                  {item.label}
                </span>
              )}

              {hasChildren && (
                <ul
                  className="nav-submenu"
                  role="menu"
                  aria-hidden={!isOpen}
                  onMouseEnter={clearCloseTimer} // курсор ушёл с li в submenu — не закрываем
                  onMouseLeave={() => scheduleClose(item.key)}
                >
                  {item.children.map((subItem) => (
                    <li key={subItem.key} className="nav-submenu__item" role="none">
                      <Link
                        href={subItem.path}
                        className="nav-submenu__link link"
                        role="menuitem"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={closeNow}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMenu;
