import {PUBLIC_PAGES} from "@/config/pages/public.config";
import AboutContent from "@/components/pages/about/about-content";

export const metadata = {
  title: PUBLIC_PAGES.ABOUT.SEO_TITLE,
  description: PUBLIC_PAGES.ABOUT.SEO_DESCRIPTION,
};

const Page = () => {
  return (
    <div className="page">
      <AboutContent />
    </div>
  );
};

export default Page;
