"use client"
import Loader from "@/components/loader";
import {usePartners} from "@/hooks/usePartners";
import {useEffect, useState} from "react";
import getRandomNumber from "@/functions/getRandomNumber";
import PartnerSliderOthers from "@/components/pages/partners/partner-slider-others";
import MapYandex from "@/components/map-yandex";

const PartnerDetail = ({partner}) => {

  const {partners, isLoading} = usePartners();

  const [otherPartners, setOtherPartners] = useState([]);

  useEffect(() => {
    if (partners && partners.length > 0) {

      const otherPartnersLength = partners.length - 1;

      const randomPartners = [];
      const usedIndexes = new Set(); // Для отслеживания использованных индексов

      while (randomPartners.length < otherPartnersLength && randomPartners.length < partners.length) {
        const randomIndex = getRandomNumber(0, partners.length - 1);

        if (!usedIndexes.has(randomIndex)) {
          randomPartners.push(partners[randomIndex]);
          usedIndexes.add(randomIndex);
        }
      }

      setOtherPartners(randomPartners);
    }
  }, [partners]);


  /*useEffect(() => {
    console.log(otherPartners)
  }, [otherPartners]);*/

  console.log(partner)


  return (
    <div className="partner-detail">
      <div className="container">
        {!partner && <Loader/>}
        {partner && (
          <div className="partner-detail__body">
            <h1 className="partner-detail__title">{partner.title}</h1>
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
            {!!otherPartners.length ? (
              <div className="partner-detail__other-partners">
                <PartnerSliderOthers items={otherPartners} />
              </div>
            ) : <Loader />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDetail;
