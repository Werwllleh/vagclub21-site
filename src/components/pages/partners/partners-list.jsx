'use client'

import PartnerCard from "@/components/pages/partners/partner-card";
import {usePartners} from "@/hooks/usePartners";
import {usePartnersStore} from "@/store/partners.store";
import Loader from "@/components/loader";

const PartnersList = () => {

  const {partners, isLoading} = usePartners()

  const {filteredPartners, loading} = usePartnersStore();

  return (
    <>
      {(isLoading || loading) && <Loader/>}
      {filteredPartners === null ? (
        <h3 className="partners-list__not-found">Партнеры не найдены</h3>
      ) : !!filteredPartners?.length ? (
        <div className="partners-list">
          {filteredPartners.map((partner) => (
            <PartnerCard partner={partner} key={partner.slug}/>
          ))}
        </div>
      ) : <div className="partners-list">
        {!!partners?.length && partners.map((partner) => (
          <PartnerCard partner={partner} key={partner.slug}/>
        ))}
      </div>}
    </>
  );
};

export default PartnersList;
