import MainPage from "@/components/pages/_main";
import {getHeroSlider, getPartnersLabels} from "@/server/cms-data";
import {PUBLIC_PAGES} from "@/config/pages/public.config";

export const metadata = {
  title: PUBLIC_PAGES.HOME.SEO_TITLE,
  description: PUBLIC_PAGES.HOME.SEO_DESCRIPTION,
  alternates: { canonical: '/' },
};

export default async function Home() {
  // Данные загружаются на сервере и кешируются (cacheLife 'content'),
  // контент попадает в HTML для SEO и быстрого LCP
  const [heroSlider, partnersLabels] = await Promise.all([
    getHeroSlider().catch(() => null),
    getPartnersLabels().catch(() => null),
  ]);

  const firstSlide = heroSlider?.slider?.[0];
  const desktopImg = firstSlide?.bg_image?.url || null;
  const mobileImg = firstSlide?.bg_image_mobile?.url || desktopImg;

  return (
    <>
      {mobileImg && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(mobileImg)}&w=640&q=75`}
          media="(max-width: 768px)"
          imageSrcSet={`/_next/image?url=${encodeURIComponent(mobileImg)}&w=360&q=75 360w, /_next/image?url=${encodeURIComponent(mobileImg)}&w=480&q=75 480w, /_next/image?url=${encodeURIComponent(mobileImg)}&w=640&q=75 640w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
      )}
      {desktopImg && (
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(desktopImg)}&w=1080&q=75`}
          media="(min-width: 769px)"
          imageSrcSet={`/_next/image?url=${encodeURIComponent(desktopImg)}&w=1080&q=75 1080w, /_next/image?url=${encodeURIComponent(desktopImg)}&w=1200&q=75 1200w, /_next/image?url=${encodeURIComponent(desktopImg)}&w=1920&q=75 1920w`}
          imageSizes="100vw"
          fetchPriority="high"
        />
      )}
      <MainPage heroSlider={heroSlider} partnersLabels={partnersLabels}/>
    </>
  );
}
