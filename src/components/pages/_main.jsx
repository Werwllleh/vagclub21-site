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
import PartnerBanner from "@/components/partners/partner-banner";
import PartnersContent from "@/components/partners/partners-content";
import PartnerAdvantages from "@/components/partners/partner-advantages";
import Container from "@/components/container";
import Image from "next/image";


const SectionTitle = styled(H1Element)`
    font-weight: 600;

    @media (min-width: ${({ theme }) => customTheme.breakpoint.semiDesktop}) {
        font-size: 3.2rem;
    }
    
    & + .product-types {
        margin-top: 3rem;
    }
`

const MainPage = ({heroSlider = null, partnersLabels = null}) => {


  return (
    <div className="page-main">
      {/* hero — первый экран: без opacity-анимации, иначе LCP ждёт загрузки JS */}
      <section className={"hero"}>
        <HeroBlock initialData={heroSlider} />
      </section>
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
      <AnimateSection
        className={"partner-block"}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Container>
          <div className="partner-block__body">
            <PartnerAdvantages />
            <PartnerBanner />
          </div>
        </Container>
      </AnimateSection>
      <AnimateSection
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <PartnersLabels initialData={partnersLabels} />
      </AnimateSection>
      <AnimateSection
        className={"about"}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="container">
          <div className="about__body">
            <div className="about__image">
              <Image loading="lazy" width={600} height={400} src={"/images/sections/about/cars.jpg"} alt="cars" />
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
