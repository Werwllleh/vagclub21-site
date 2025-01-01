'use client'
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";
import TelegramIcon from "@/components/icons/telegram-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import {ymClick} from "@/functions/ym-click";

export default function Home() {



  return (
    <>
      <Header/>
      <main>
        <div className="page-soon">
          <div className="container">
            <div className="page-soon__body">
              <div className="page-soon__information">
                <h1 className="page-soon__title">Сайт в разработке</h1>
                <div className="page-soon__links">
                  <p className="page-soon__links-text">Вступайте в нашу беседу и подписывайтесь на соц. сети</p>
                  <div className="page-soon__links-items">
                    <Link data-ym="chat" onClick={(e) => ymClick(e)} target="_blank" href="https://t.me/+A6S11dagaDA2OWMy" className="page-soon__link">
                      <div className="page-soon__link-body">
                        <div className="page-soon__link-icon tlg-icon">
                          <TelegramIcon />
                        </div>
                        <div className="page-soon__link-about">
                          Наша беседа
                        </div>
                      </div>
                    </Link>
                    <Link data-ym="inst" onClick={(e) => ymClick(e)} target="_blank" href="https://www.instagram.com/vag_club21" className="page-soon__link">
                      <div className="page-soon__link-body">
                        <div className="page-soon__link-icon">
                          <InstagramIcon />
                        </div>
                        <div className="page-soon__link-about">
                          Наши фото
                        </div>
                      </div>
                    </Link>
                    <Link data-ym="bot" onClick={(e) => ymClick(e)} target="_blank" href="https://t.me/VW21ClubBot" className="page-soon__link">
                      <div className="page-soon__link-body">
                        <div className="page-soon__link-icon tlg-icon">
                          <TelegramIcon />
                        </div>
                        <div className="page-soon__link-about">
                          Телеграм Бот
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
}
