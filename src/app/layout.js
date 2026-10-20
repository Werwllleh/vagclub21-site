import 'lenis/dist/lenis.css'
import "@/styles/index.scss";
import Providers from "@/providers/providers";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import {Suspense} from "react";
import YandexMetrica from "@/components/yandex-metrica";
import Loading from "@/components/loading";
import Loader from "@/components/loader";
import StyledComponentsRegistry from "@/lib/styled-registry";
import {getMeet, getTechnicalWorkStatus, getCurrentYear, REVALIDATE_FAST} from "@/server/cms-data";


import JsonLd from "@/components/seo/json-ld";
import {generateOrganizationAndWebSiteJsonLd} from "@/lib/schema-org";

export const metadata = {
  metadataBase: new URL('https://vagclub21.ru'),
  title: {
    default: PUBLIC_PAGES.HOME.SEO_TITLE,
    template: '%s | VAGClub21'
  },
  description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
  keywords: [
    'VAGCLUB21', 'автоклуб Чебоксары', 'клуб VAG Чувашия', 'Volkswagen Чебоксары',
    'Audi Чебоксары', 'Skoda Чебоксары', 'SEAT', 'сходки авто Чебоксары', 'автосообщество'
  ],
  alternates: {
    canonical: './'
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://vagclub21.ru',
    siteName: 'VAGClub21 — Автоклуб Чебоксары',
    title: PUBLIC_PAGES.HOME.SEO_TITLE,
    description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
    images: [
      {
        url: '/images/og-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Автоклуб VAGClub21 Чебоксары',
        type: 'image/jpeg'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: PUBLIC_PAGES.HOME.SEO_TITLE,
    description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
    images: ['/images/og-main.jpg']
  },
  verification: {
    yandex: 'e1783a4d4e4edd5b'
  },
};

export default async function RootLayout({children}) {

  // дата встречи для бегущей строки в футере и статус техработ —
  // кешируются, попадают в HTML (иначе AppContent рендерит только лоадер при SSR)
  const [meetData, technicalWork, currentYear] = await Promise.all([
    getMeet(REVALIDATE_FAST).catch(() => null),  // футер: свежесть ≤1 мин, страницы остаются статикой
    getTechnicalWorkStatus().catch(() => null),
    getCurrentYear().catch(() => 2026),
  ]);

  return (
    <html lang="ru" data-scroll-behavior="smooth">
    <head>
      <link rel="preload" href="/fonts/Montserrat-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      <link rel="preload" href="/fonts/MartianMono-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
      <JsonLd data={generateOrganizationAndWebSiteJsonLd()} />
    </head>
    <body>
    <StyledComponentsRegistry>
    <Providers initialTechnicalWork={technicalWork}>
      <Header/>
      <main>
        <div className="page">
          {children}
          {/* ВАЖНО: YandexMetrica использует useSearchParams (runtime-данные) — держим её
              в ОТДЕЛЬНОМ Suspense, иначе её ожидание заменяет фолбэком весь контент страницы
              в пререндере (сайт отдаёт ботам и первому рендеру только лоадер) */}
          {process.env.START_MODE === "production" && (
            <Suspense fallback={null}>
              <YandexMetrica/>
            </Suspense>
          )}
        </div>
      </main>
      <Footer initialMeet={meetData} currentYear={currentYear}/>
    </Providers>
    </StyledComponentsRegistry>
    </body>
    </html>
  );
}
