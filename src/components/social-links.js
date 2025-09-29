'use client'
import Link from "next/link";
import TelegramIcon from "@/components/icons/telegram-icon";
import InstagramIcon from "@/components/icons/instagram-icon";
import {ymReach} from "@/utils";
import {YM_METHOD} from "@/consts";

const SocialLinks = () => {
  return (
    <div className="page-soon__links-items">
      <Link onClick={() => ymReach(YM_METHOD.REACH_GOAL, 'chat')}
            target="_blank"
            href="https://t.me/+A6S11dagaDA2OWMy"
            className="page-soon__link"
      >
        <div className="page-soon__link-body">
          <div className="page-soon__link-icon tlg-icon">
            <TelegramIcon/>
          </div>
          <div className="page-soon__link-about">
            Наша беседа
          </div>
        </div>
      </Link>
      <Link onClick={() => ymReach(YM_METHOD.REACH_GOAL, 'inst')}
            target="_blank"
            href="https://www.instagram.com/vag_club21"
            className="page-soon__link"
      >
        <div className="page-soon__link-body">
          <div className="page-soon__link-icon">
            <InstagramIcon/>
          </div>
          <div className="page-soon__link-about">
            Наши фото
          </div>
        </div>
      </Link>
      <Link onClick={() => ymReach(YM_METHOD.REACH_GOAL, 'bot')}
            target="_blank"
            href="https://t.me/VW21ClubBot"
            className="page-soon__link"
      >
        <div className="page-soon__link-body">
          <div className="page-soon__link-icon tlg-icon">
            <TelegramIcon/>
          </div>
          <div className="page-soon__link-about">
            Телеграм Бот
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SocialLinks;
