"use client"
import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AboutContent = () => {

  gsap.registerPlugin(useGSAP,ScrollTrigger);

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

    // стартовые состояния
    cards.forEach((card, i) => {
      gsap.set(card, {
        opacity: 0,
        xPercent: i % 2 === 0 ? -100 : 100,
        zIndex: cards.length + i,
        willChange: 'transform,opacity',
      });
    });

    mm.add("(min-width: 0px)", () => {
      cards.forEach((card) => {
        gsap.to(card, {
          xPercent: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,          // триггерим по самой карточке
            start: "top 85%",       // когда карточка вошла снизу
            end: "top 60%",         // участок анимации
            scrub: 1,               // привязка к скроллу
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
    <div className="page-about ppt">
      <div className="container">
        <h1 className="page-about__title h1">О клубе</h1>
        <div ref={description} className="page-about__description">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam debitis deleniti, dolor ducimus error
            esse excepturi explicabo fugit illum nesciunt pariatur quas qui quos rem sed veritatis voluptates
            voluptatum?
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam debitis deleniti, dolor ducimus error
            esse excepturi explicabo fugit illum nesciunt pariatur quas qui quos rem sed veritatis voluptates
            voluptatum?
          </p>
        </div>
        <div ref={list} className="about-list">
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/1.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Преимущество</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam debitis doloremque dolores
                  dolorum eum expedita explicabo facere fugit inventore iusto laudantium, neque nostrum possimus
                  quibusdam tempora ullam vero voluptatibus.</p>
              </div>
            </div>
          </div>
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/2.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Преимущество</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam debitis doloremque dolores
                  dolorum eum expedita explicabo facere fugit inventore iusto laudantium, neque nostrum possimus
                  quibusdam tempora ullam vero voluptatibus.</p>
              </div>
            </div>
          </div>
          <div className="about-list-item">
            <div className="about-list-item__body">
              <div className="about-list-item__image">
                <img src="./images/about/3.webp" alt=""/>
              </div>
              <div className="about-list-item__text">
                <h5>Преимущество</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam debitis doloremque dolores
                  dolorum eum expedita explicabo facere fugit inventore iusto laudantium, neque nostrum possimus
                  quibusdam tempora ullam vero voluptatibus.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
