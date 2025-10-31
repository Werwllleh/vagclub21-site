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
    <html lang="ru">
    <head>
      <link rel="canonical" href="https://vagclub21.ru/"/>
      <meta name="yandex-verification" content="e1783a4d4e4edd5b"/>
    </head>
    <body>
    <Providers>
      <Header/>
      <main>
        <Suspense fallback={null}>
          {children}
          {process.env.START_MODE === "production" && <YandexMetrica />}
        </Suspense>
      </main>
      <Footer/>
    </Providers>
    {/*<SnowMode/>*/}
    <div className="bg"/>
    </body>
    </html>
  );
}
