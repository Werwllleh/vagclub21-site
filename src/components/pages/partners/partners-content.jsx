'use client'

import {usePartners} from "@/hooks/usePartners";
import {useEffect} from "react";
import Loader from "@/components/loader";
import PartnersList from "@/components/pages/partners/partners-list";

const PartnersContent = () => {

  const {partners, isLoading} = usePartners()

  useEffect(() => {
    // console.log(partners)
  }, [partners]);

  return (
    <div className="partner-page">
      <div className="container">
        <h1 className="partner-page__title">Партнеры клуба</h1>
        {isLoading && <Loader />}
        <div className="partner-page__content">
          <PartnersList partners={partners} />
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;
