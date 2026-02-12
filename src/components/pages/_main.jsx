"use client"
import React from 'react';
import HeroBlock from "@/components/blocks/hero-block";
import CooperationForm from "@/components/cooperation-form";
import Link from "next/link";
import ProductTypes from "@/components/products/products-types";
import AnimateSection from "@/components/blocks/animate-section";


const MainPage = () => {


  return (
    <div className="page-main">
      <AnimateSection className={"hero"}>
        <HeroBlock />
      </AnimateSection>
      <AnimateSection
        className={"products"}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="container">
          <p className="section-title h1">Атрибутика клуба</p>
          <ProductTypes />
        </div>
      </AnimateSection>
      {/*<section className="page-main__cooperation">
        <CooperationForm />
      </section>*/}
      <AnimateSection
        className={"about"}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="container">
          <div className="about__body">
            <div className="about__image">
              <img src={"/images/sections/about/cars.jpg"} alt="cars"/>
            </div>
            <div className="about__description">
              <p className="section-title h1">Авто сообщество VAGCLUB21</p>
              <div className="text">
                <p>
                  VAG_CLUB21&nbsp;&mdash; автомобильное сообщество, базирующееся в&nbsp;Чувашской Республике, в&nbsp;частности в&nbsp;Чебоксарах. Клуб объединяет владельцев и&nbsp;любителей автомобилей марок Volkswagen, Audi, Skoda, Seat и&nbsp;других брендов концерна VAG.
                </p>
              </div>
              <Link href={"/about"} className="btn default l about__link">Подробнее</Link>
            </div>
          </div>
        </div>
      </AnimateSection>
    </div>
  );
};

export default MainPage;
