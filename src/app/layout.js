import 'lenis/dist/lenis.css'
import "@/styles/index.scss";
import SnowMode from "@/components/snow-mode";
import Providers from "@/providers/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {Suspense} from "react";
import Script from "next/script";
import YandexMetrica from "@/components/yandex-metrica";


export const metadata = {
  title: PUBLIC_PAGES.HOME.SEO_TITLE,
  description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
  keywords: "VAGCLUB21, автомобильный клуб, Чебоксары, автосообщество, автолюбители, мероприятия, автомобили",
};

export default function RootLayout({children}) {

  return (
    <html lang="ru" data-scroll-behavior="smooth">
    <head>
      <link rel="canonical" href="https://vagclub21.ru/"/>
      <meta name="yandex-verification" content="e1783a4d4e4edd5b"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@100..800&display=swap" rel="stylesheet"/>
    </head>
    <body>
    <Providers>
      <Header/>
      <main>
        <div className="page">
          <Suspense fallback={null}>
            {children}
            {process.env.START_MODE === "production" && <YandexMetrica/>}
          </Suspense>
        </div>
      </main>
      <Footer/>
    </Providers>
    </body>
    </html>
  );
}
