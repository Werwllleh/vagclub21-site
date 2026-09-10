"use client"
import {motion, useInView} from "motion/react";
import {spring} from "motion";
import {customTheme} from "@/styles/theme";
import styled from "styled-components";
import SvgIcon from "@/components/svg-icon";
import Link from "next/link";
import Image from "next/image";

const Banner = styled(motion.div)`
    position: relative;
    overflow: hidden;
    border-radius: ${customTheme.radius.r20};
    overflow: hidden;
    min-height: 30rem;
        //background-color: ${customTheme.color.primaryDark};
    background-color: #00b59b;
    display: flex;
    flex-direction: column;
    font-family: ${customTheme.font.secondary};

    &::before {
        content: "";
        opacity: .6;
        pointer-events: none;
        background: linear-gradient(#0000 26%, #008169 100%);
        width: 100%;
        height: 33%;
        position: absolute;
        bottom: 0;
        left: 0;
    }
`

const Inner = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem 0;
    padding-block: clamp(2.8rem, 3vw, 5rem) clamp(2.2rem, 3vw, 3rem);
    padding-inline: 2.4rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        gap: 5rem 0;
    }

    @media (min-width: ${customTheme.breakpoint.desktop}) {
        padding-inline: 5rem;
    }
`

const Description = styled.div`

    @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
        max-width: 55rem;
    }
`

const Title = styled.h3`
    text-transform: uppercase;
    color: ${customTheme.color.white};
    font-size: clamp(2.6rem, 3vw, 4.5rem);
    font-weight: 700;
    text-shadow: -4px 5px 15px rgb(0 90 86);
`

const Text = styled.p`
    margin-top: 2rem;
    font-size: clamp(1.4rem, 3vw, 1.6rem);
    line-height: 1.45;
    color: ${customTheme.color.white};
    font-weight: 500;
    text-shadow: -4px 5px 40px rgb(0 72 61);
`

const LinkItem = styled(Link)`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 0 1rem;
    text-transform: uppercase;
    color: ${customTheme.color.white};
    font-size: 1.4rem;
    line-height: 1;
    padding-block: 1.2rem;
    padding-inline: 2.2rem;
    background-color: #333;
    border-radius: ${customTheme.radius.r30};
    font-weight: 500;
    width: 85%;
    max-width: 30rem;
    white-space: nowrap;
    box-shadow: -4px 6px 24px -9px rgb(0 0 0 / 55%);
    transition: max-width ${customTheme.transition.medium}, opacity ${customTheme.transition.medium};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        padding-block: 1.4rem;
        font-size: 1.8rem;
        margin-top: 4rem;
        max-width: 30rem;
    }


    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.3rem;
        height: 2.3rem;
        margin-left: auto;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    &:hover {
        max-width: 90%;
    }
`

const BannerImage = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: -1;

    @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: 70%;
        height: 100%;
        margin-block: auto;
    }

    .car {
        margin-top: 7rem;
        object-fit: contain;
        pointer-events: none;
        user-select: none;
        max-height: 40rem;
        margin-inline: auto;

        @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
            margin-top: 0;
            max-height: none;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            margin-block: auto;
            transform: translateX(6%);
            margin-inline: 0;
        }
    }
`

const Statistic = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    grid-template-columns: 10rem 1fr;
    gap: 0 1rem;
    border-radius: ${customTheme.radius.r20};
    background-color: rgb(0 0 0 / 20%);
    backdrop-filter: blur(.5rem);
    padding-block: 1rem;
    padding-inline: 2rem;
    width: 85%;
    margin-inline: auto;
    z-index: 1;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        width: 70%;
        padding-block: 2rem;
    }

    @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
        margin-inline: 0;
        width: auto;
        max-width: max-content;
        grid-template-columns: 15rem 1fr;
        top: 10%;
        transform: translateX(-20%);
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: .3rem 0;

        @media (min-width: ${customTheme.breakpoint.mobile}) {
            gap: .6rem 0;
        }

        li {
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 0 2rem;
            justify-content: space-between;
            color: ${customTheme.color.white};
            font-weight: 500;

            @media (min-width: ${customTheme.breakpoint.mobile}) {
                font-size: 1.5rem;
            }

            span {
                white-space: nowrap;
            }
        }
    }
`

const StatisticSvg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 85%;
        height: 85%;
    }
`

const Icons = styled.ul`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 2rem;

    li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.4rem;
        height: 2.4rem;

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            width: 3.2rem;
            height: 3.2rem;
        }

        svg {
            width: 100%;
            height: 100%;
            color: ${customTheme.color.white};
            opacity: .6;
        }
    }
`

const CarExpensesBanner = () => {

  return (
    <Banner transition={{type: spring}}
            viewport={{
              amount: 0.5,
              once: true
            }}
            initial={{opacity: 0, transform: "translateY(100px)",}}
            whileInView={{opacity: 1, transform: "translateY(0)"}}
    >
      <Inner>
        <Description>
          <Title>Учет расходов на&nbsp;автомобиль</Title>
          <Text>Записывайте каждую трату&nbsp;&mdash; от&nbsp;заправки до&nbsp;капремонта. Анализируйте статистику,
            планируйте бюджет и&nbsp;сохраняйте полную историю обслуживания вашего автомобиля в&nbsp;одном
            месте</Text>
          <LinkItem
            href="https://auto-notes.ru/?utm_source=vagclub21.ru&utm_medium=profile-page&utm_campaign=car-expenses-banner"
            aria-label="Начать вести учет расходов">
            Начать учет
            <span>
                <SvgIcon name="arrow"/>
              </span>
          </LinkItem>
        </Description>
        <BannerImage>
          <Statistic>
            <StatisticSvg>
              <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Структура расходов">
                <g transform="rotate(-90 160 160)">
                  <circle cx="160" cy="160" r="130" fill="none" stroke="#2196f3" strokeWidth="54" pathLength="100"
                          strokeDasharray="61.4 38.6" strokeDashoffset="0"/>

                  <circle cx="160" cy="160" r="130" fill="none" stroke="#22c55e" strokeWidth="54" pathLength="100"
                          strokeDasharray="12.2 87.8" strokeDashoffset="-61.4"/>

                  <circle cx="160" cy="160" r="130" fill="none" stroke="#ff9418" strokeWidth="54" pathLength="100"
                          strokeDasharray="16.3 83.7" strokeDashoffset="-73.6"/>

                  <circle cx="160" cy="160" r="130" fill="none" stroke="#7c3aed" strokeWidth="54" pathLength="100"
                          strokeDasharray="6.3 93.7" strokeDashoffset="-89.9"/>

                  <circle cx="160" cy="160" r="130" fill="none" stroke="#f43f5e" strokeWidth="54" pathLength="100"
                          strokeDasharray="3.8 96.2" strokeDashoffset="-96.2"/>
                </g>
              </svg>
            </StatisticSvg>
            <ul>
              <li>
                <p>Топливо</p>
                <span>42501 ₽</span>
              </li>
              <li>
                <p>Сервис</p>
                <span>8451 ₽</span>
              </li>
              <li>
                <p>Страховка</p>
                <span>11254 ₽</span>
              </li>
              <li>
                <p>Мойка</p>
                <span>4358 ₽</span>
              </li>
              <li>
                <p>Штрафы</p>
                <span>2658 ₽</span>
              </li>
            </ul>
          </Statistic>
          <Image className="car" loading="lazy" src={'/images/arteon.webp'} alt="Баннер - Учет расходов на автомобиль"
                 width={700} height={355}/>
        </BannerImage>
        <Icons>
          <li>
            <SvgIcon name="gas-pump"/>
          </li>
          <li>
            <SvgIcon name="tool-fix"/>
          </li>
          <li>
            <SvgIcon name="dashboard"/>
          </li>
          <li>
            <SvgIcon name="wallet"/>
          </li>
        </Icons>
      </Inner>
    </Banner>
  );
};

export default CarExpensesBanner;