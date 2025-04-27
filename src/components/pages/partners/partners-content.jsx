'use client'

import {usePartners} from "@/hooks/usePartners";
import Loader from "@/components/loader";
import PartnersList from "@/components/pages/partners/partners-list";
import PartnersSearch from "@/components/pages/partners/partners-search";

const PartnersContent = () => {

  const {partners, isLoading} = usePartners()


  return (
    <div className="partner-page">
      <div className="container">
        <h1 className="partner-page__title">Партнеры клуба</h1>
        {isLoading && <Loader />}
        <div className="partner-page__content">
          <PartnersSearch />
          <PartnersList partners={partners} />
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;
