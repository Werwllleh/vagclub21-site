'use client'
import H1 from "../../UI/h1";
import {usePartners} from "../../../hooks/usePartners";
import {useEffect} from "react";

const PartnersContent = () => {

  const {partners, isLoading} = usePartners()

  useEffect(() => {
    console.log(partners)
  }, []);

  return (
    <div className="partners ppt ppb">
      <div className="container">
        <H1 className="partners__title pageTitle">Партнеры клуба</H1>
        <div className="partners__content">
          Здесь будут карточки партнеров клуба
        </div>
      </div>
    </div>
  );
};

export default PartnersContent;