import React from 'react';
import Link from "next/link";
import SvgIcon from "../components/svg-icon";

const NotFoundPage = () => {
  return (
    <div className="page ppt ppb">
      <div className="container">
        <div className="page-404">
          <div className="page-404__left">
            <h1 className="page-404__title h1">Кажется, <br/> Вы&nbsp;потерялись в&nbsp;дороге</h1>
            <p className="page-404__description">
              Этой страницы нет в&nbsp;нашем гараже. Но&nbsp;у&nbsp;нас есть много других интересных
              материалов.
            </p>
            <div className="page-404__socials">
              <Link className="" target="_blank" rel="norefferer noopener" href="https://t.me/+A6S11dagaDA2OWMy">
                <SvgIcon name="telegram" />
                <span>Беседа</span>
              </Link>
              <Link className="" target="_blank" rel="norefferer noopener" href="https://www.instagram.com/vag_club21">
                <SvgIcon name="instagram" />
                <span>Наши фото</span>
              </Link>
            </div>
            <div className="page-404__actions">
              <Link className="btn default l" href="/">Главная</Link>
              <Link className="btn default l" href="/cars">Автомобили</Link>
            </div>
          </div>
          <div className="page-404__right">
            <div className="page-404__bg">
              <img src="/images/404.webp" alt="404"/>
            </div>
            <div className="page-404__actions">
              <Link className="btn default l" href="/">Главная</Link>
              <Link className="btn default l" href="/cars">Автомобили</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
