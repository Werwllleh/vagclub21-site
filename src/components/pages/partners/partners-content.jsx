import PartnersList from "@/components/pages/partners/partners-list";
import PartnersSearch from "@/components/pages/partners/partners-search";

const PartnersContent = () => {

  return (
    <div className="partner-page">
      <div className="container">
        <h1 className="partner-page__title">Партнеры клуба</h1>
        <div className="partner-page__content">
          <PartnersSearch />
          <PartnersList />
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;
