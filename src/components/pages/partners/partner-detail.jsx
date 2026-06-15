"use client"
import Loader from "@/components/loader";
import {usePartners} from "@/hooks/usePartners";
import MapYandex from "@/components/map-yandex";
import H1 from "@/components/UI/h1";

const PartnerDetail = ({partner}) => {

  const {partners, isLoading} = usePartners();

  console.log(partner)


  return (
    <div className="partner-detail">
      <div className="container">
        {!partner && <Loader/>}
        {partner && (
          <div className="partner-detail__body">
            <H1 className="partner-detail__title">{partner.title}</H1>
            <h2 className="partner-detail__description">
              {partner.description}
            </h2>
            <div className="partner-detail__content">
              <div className="partner-detail__map">
                <MapYandex />
              </div>
              <div className="partner-detail__contacts">
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDetail;
