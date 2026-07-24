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


export const metadata = {
  metadataBase: new URL('https://vagclub21.ru'),
  title: PUBLIC_PAGES.HOME.SEO_TITLE,
  description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
  keywords: "VAGCLUB21, автомобильный клуб, Чебоксары, автосообщество, автолюбители, мероприятия, автомобили",
  // './' — канонический URL резолвится в адрес текущей страницы (а не всегда главной)
  alternates: {canonical: './'},
  verification: {yandex: 'e1783a4d4e4edd5b'},
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
      <link rel="preload" href="/fonts/MartianMono-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
      <link rel="preload" href="/fonts/MartianMono-SemiBold.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/>
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
