"use client"
import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const AboutContent = () => {

  gsap.registerPlugin(useGSAP, ScrollTrigger);

  const description = useRef(null);
  const list = useRef(null);

  useEffect(() => {
    gsap.set(description.current, {
      x: -200,
      opacity: 0,
    })

    gsap.to(description.current, {
      opacity: 1,
      x: 0,
      duration: 0.85,
      ease: "power1.in",
    });
  }, [description]);

  useEffect(() => {
    const block = list.current;
    if (!block) return;

    const cards = block.querySelectorAll('.about-list-item');
    if (!cards.length) return;

    const mm = gsap.matchMedia();

    cards.forEach((card, i) => {
      gsap.set(card, {
        opacity: 0,
        xPercent: i % 2 === 0 ? -120 : 120,
        // zIndex: cards.length + i,
        willChange: 'transform,opacity',
      });
    });

    mm.add("(max-width: 768px)", () => {
      cards.forEach((card) => {
        gsap.to(card, {
          xPercent: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,          // триггерим по самой карточке
            start: "top 100%",       // когда карточка вошла снизу
            end: "top 100%",         // участок анимации
            scrub: 1,               // привязка к скроллу
            duration: 2.5,
            // markers: true,
          },
        });
      });
    });

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card) => {
        gsap.to(card, {
          xPercent: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,          // триггерим по самой карточке
            start: "top 95%",       // когда карточка вошла снизу
            end: "top 70%",         // участок анимации
            scrub: 1,               // привязка к скроллу
            // duration: 2.5,
            // markers: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, [list]);

  useEffect(() => {
    window.addEventListener('load', () => {
      if (!window.gsap) return;
      ScrollTrigger.refresh();
    });
  }, []);


  return (
    <div className="page-about ppt ppb">
      <div className="container">
        <h1 className="page-about__title h1">О клубе</h1>
        <div ref={description} className="page-about__description">
          <p>
            VAG Club 21&nbsp;&mdash; это автомобильный клуб, объединяющий владельцев автомобилей Volkswagen, Audi, Skoda
            и&nbsp;Seat, входящих в&nbsp;концерн VAG (Volkswagen Group). Клуб был основан в&nbsp;2020 году
            и&nbsp;объединяет энтузиастов, интересующихся автомобилями этих марок.
          </p>
          <p>
            Участники клуба обмениваются информацией, опытом эксплуатации, тюнингом и&nbsp;ремонтом автомобилей,
            а&nbsp;также организуют встречи и&nbsp;мероприятия.
          </p>
        </div>
        <div ref={list} className="about-list">
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/1.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Встречи</h5>
                <p>Встречи клуба проходят в&nbsp;формате живого общения, участники обсуждают проблемы, решения, делятся
                  впечатлениями, узнают что-то новое.Встречи клуба&nbsp;&mdash; хорошая возможность познакомиться
                  с&nbsp;другими участниками клуба. Встречи проходят каждый месяц, о&nbsp;них мы&nbsp;заранее сообщаем
                  в&nbsp;наших социальных сетях.</p>
              </div>
            </div>
          </div>
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/2.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Эксклюзивные мероприятия</h5>
                <p></p>
                <ul>
                  <li>
                    <p><b>Клубные выезды</b>&nbsp;&mdash; совместные поездки по&nbsp;живописным маршрутам</p>
                  </li>
                  <li>
                    <p><b>Технические семинары</b>&nbsp;&mdash; мастер‑классы от&nbsp;профессионалов
                      по&nbsp;обслуживанию VAG</p>
                  </li>
                  <li>
                    <p><b>Выставки</b>&nbsp;&mdash; возможность показать свой автомобиль и&nbsp;увидеть лучшие
                      экземпляры</p>
                  </li>
                  <li>
                    <p><b>Квесты</b>&nbsp;&mdash; командное прохождение испытаний с&nbsp;денежными призами</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/3.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Квесты</h5>
                <p>
                  Увлекательные командные приключения от сообщества VAG Club&nbsp;21.
                </p>
                <p>
                  Участники объединяются в&nbsp;экипажи и&nbsp;отправляются по&nbsp;маршруту, наполненному загадками,
                  техническими заданиями и&nbsp;точками с&nbsp;проверкой знаний и умений.
                </p>
                <p>
                  Это не&nbsp;только проверка логики и&nbsp;сплочённости команды, но&nbsp;и&nbsp;отличный способ
                  в&nbsp;динамичном формате лучше узнать возможности своего автомобиля, познакомиться
                  с&nbsp;единомышленниками и&nbsp;проявить свои навыки. Победителей ждут денежные и ценные призы
                  от&nbsp;партнёров клуба.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
