"use client"
import React from 'react';
import HeroBlock from "@/components/blocks/hero-block";
import Products from "@/components/pages/products/products";
import CooperationForm from "@/components/cooperation-form";
import Link from "next/link";

const MainPage = () => {
  return (
    <div className="page-main">
      <section className="page-main__hero">
        <HeroBlock />
      </section>
      <section className="page-main__products">
        <div className="container">
          <p className="section-title h1">Атрибутика клуба</p>
          <Products />
        </div>
      </section>
      {/*<section className="page-main__cooperation">
        <CooperationForm />
      </section>*/}
      <section className="about">
        <div className="container">
          <div className="about__body">
            <div className="about__image">
              <img src={"/images/sections/about/cars.jpg"} alt="cars"/>
            </div>
            <div className="about__description">
              <p className="section-title h1">Авто сообщество VAGCLUB21</p>
              <div className="text">
                <p>
                  SAIC-Volkswagen Co., Ltd. (&laquo;SAIC-Volkswagen&raquo;)&nbsp;&mdash; совместное китайско-германское предприятие, управляемое компаниями SAIC Motor и&nbsp;Volkswagen Group. Компания подписала контракт и&nbsp;заложила первый камень в&nbsp;фундамент в&nbsp;октябре 1984&nbsp;года. Это одно из&nbsp;старейших совместных автомобильных предприятий в&nbsp;Китае.
                </p>
              </div>
              <Link href={"/about"} className="btn default l about__link">Подробнее</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
