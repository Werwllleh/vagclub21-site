"use client"
import {usePartner} from "@/hooks/usePartner";
import Loader from "@/components/loader";
import {usePartners} from "@/hooks/usePartners";
import {useEffect, useState} from "react";
import getRandomNumber from "@/functions/getRandomNumber";
import PartnerCard from "@/components/pages/partners/partner-card";
import PartnerSliderOthers from "@/components/pages/partners/partner-slider-others";

const PartnerDetail = ({slug}) => {

  const {partner, isLoading} = usePartner(slug);
  const {partners, isLoading: partnersLoading} = usePartners();

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


  return (
    <div className="partner-detail">
      <div className="container">
        {isLoading && <Loader/>}
        {partner && (
          <div className="partner-detail__body">
            <h1 className="partner-detail__title">{partner.title}</h1>
            <h2 className="partner-detail__description">
              {partner.description}
            </h2>
            <div className="partner-detail__content">

            </div>
            {!!otherPartners.length && (
              <div className="partner-detail__other-partners">
                <PartnerSliderOthers items={otherPartners} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerDetail;
