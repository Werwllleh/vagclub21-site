import MainPage from "@/components/pages/_main";
import {getHeroSlider, getPartnersLabels} from "@/server/cms-data";

export default async function Home() {
  // Данные загружаются на сервере и кешируются (cacheLife 'content'),
  // контент попадает в HTML для SEO и быстрого LCP
  const [heroSlider, partnersLabels] = await Promise.all([
    getHeroSlider().catch(() => null),
    getPartnersLabels().catch(() => null),
  ]);

  return <MainPage heroSlider={heroSlider} partnersLabels={partnersLabels}/>;
}
