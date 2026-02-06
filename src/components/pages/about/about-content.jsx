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

  /*useEffect(() => {
    const block = list.current;
    const cards = block.querySelectorAll('.about-list-item');

    if (!cards.length) return;

    const cardHeight = cards[0].offsetHeight;
    // const scrollLength = cards.length * cardHeight + 60;
    const scrollLength = block.offsetHeight;

    const mm = gsap.matchMedia();

    cards.forEach((card, i) => {
      gsap.set(card, {
        zIndex: cards.length + i
      });
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "-100px",
          end: () => `+=${endValue}`,
          scrub: 1,
          pin: true,
        },
      });

      cards.forEach((c, i) => {
        if (i === 0) {
          return tl.fromTo(
            c,
            {
              y: 0,
              opacity: 0.7
            },
            {
              y: 0,
              opacity: 1,
              duration: 2,
              ease: "ease"
            },
            "+=1"
          );
        }

        tl.fromTo(
          c,
          {
            y: 0,
            opacity: 0.7
          },
          {
            y: -(cardHeight - 30) * i,
            opacity: 1,
            duration: 3,
            ease: "ease"
          },
          "+=1"
        );
      })
    })

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "-150px",
          end: () => `+=${scrollLength * 3}`,
          // end: `+=2000`,
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      cards.forEach((c, i) => {
        if (i === 0) {
          return tl.fromTo(
            c,
            {
              y: 0,
              opacity: 0.7
            },
            {
              y: 0,
              opacity: 1,
              duration: 2,
              ease: "ease"
            },
            "+=1"
          );
        }

        tl.fromTo(
          c,
          {
            y: 0,
            opacity: 0.7
          },
          {
            y: -(cardHeight - 60) * i,
            opacity: 1,
            duration: 3,
            ease: "ease"
          },
          "+=1"
        );
      })
    })

    return () => mm.revert();

  }, [list])*/


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
