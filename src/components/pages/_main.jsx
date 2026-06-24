"use client"
import React from 'react';
import HeroBlock from "@/components/blocks/hero-block";
import CooperationForm from "@/components/cooperation-form";
import Link from "next/link";
import ProductTypes from "@/components/products/products-types";
import AnimateSection from "@/components/blocks/animate-section";
import styled from "styled-components";
import {H1Element} from "@/components/UI/h1";
import {customTheme} from "@/styles/theme";
import PartnersLabels from "@/components/partners/partners-labels";


const SectionTitle = styled(H1Element)`
    font-weight: 600;

    @media (min-width: ${({ theme }) => customTheme.breakpoint.semiDesktop}) {
        font-size: 3.2rem;
    }
    
    & + .product-types {
        margin-top: 3rem;
    }
`

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
          <SectionTitle as="p">Атрибутика клуба</SectionTitle>
          <ProductTypes />
        </div>
      </AnimateSection>
      {/*<section className="page-main__cooperation">
        <CooperationForm />
      </section>*/}
      <PartnersLabels />
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
              <SectionTitle as="p">Авто сообщество VAGCLUB21</SectionTitle>
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
