import PartnersList from "@/components/pages/partners/partners-list";
import PartnersSearch from "@/components/pages/partners/partners-search";

const PartnersContent = () => {

  return (
    <div className="partners ppt ppb">
      <div className="container">
        <h1 className="partners__title h1">Партнеры клуба</h1>
        <div className="partners__content">
          Здесь будут карточки партнеров клуба
          {/*<PartnersSearch />
          <PartnersList />*/}
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;
