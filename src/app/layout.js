import "@/styles/index.scss";
import SnowMode from "@/components/snow-mode";
import YandexMetrica from "@/components/yandex-metrica";
import {Suspense} from "react";

export const metadata = {
  title: "VAGCLUB21-Сайт авто сообщества в Чебоксарах!",
  description: "Клубный сайт авто сообщества в Чебоксарах, где автолюбители могут делиться опытом, участвовать в мероприятиях и общаться.",
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
    {/*<SnowMode/>*/}
    <Suspense fallback={null}>
      {children}
      {process.env.START_MODE === "production" && <YandexMetrica />}
    </Suspense>
    </body>
    </html>
  );
}
