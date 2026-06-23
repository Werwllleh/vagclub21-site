'use client'
import React, {useEffect} from 'react';
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import {customTheme} from "@/styles/theme";
import SvgIcon from "@/components/svg-icon";

const PartnerCardLabel = styled.label`
    position: absolute;
    z-index: 2;
    top: -1.25rem;
    right: -.1rem;
    color: ${customTheme.color.white};
    background-color: ${customTheme.color.positive};
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1;
    text-transform: uppercase;
    padding-block: 1rem;
    padding-inline: 2.5rem;
    border-radius: ${customTheme.radius.r7} ${customTheme.radius.r7} 0 ${customTheme.radius.r7};
    user-select: none;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.8),
                transparent
        );
    }

    @keyframes shimmer {
        0% {
            left: -100%;
        }
        100% {
            left: 100%;
        }
    }
`

const PartnerCardLogo = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 4rem;
    background-color: ${customTheme.color.greyLight};
    border-radius: ${customTheme.radius.r15} ${customTheme.radius.r15} 0 0;
    overflow: hidden;
    
    &:after {
        background: #fff;
        content: "";
        height: 150%;
        left: -120%;
        opacity: .4;
        position: absolute;
        top: -50px;
        transform: rotate(35deg);
        transition: all 1.5s cubic-bezier(.19, 1, .19, 1);
        width: 6rem;
        z-index: 1;
    }

    img {
        object-fit: contain;
        width: 100%;
        height: 10rem;
        max-width: 20rem;
        transition: transform ${customTheme.transition.small};
    }

    svg {
        width: 10rem;
        height: 10rem;
        color: ${customTheme.color.grey};
    }
`

const PartnerCardButton = styled.button`
    margin-block: 1rem 0;
    margin-inline: auto;
    border-radius: ${customTheme.radius.r7};
    width: 90%;
`

const PartnerCardItem = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 35rem;
    border: 1px solid ${customTheme.color.primary};
    border-radius: ${customTheme.radius.r15};
    height: 100%;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        min-height: 40rem;
    }

    &:hover {

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            box-shadow: 0 .7rem 1rem .5rem rgba(0, 0, 0, 0.23);

            ${PartnerCardLogo} {
                &:after {
                    left: 120%;
                    transition: all 2s cubic-bezier(.19, 1, .22, 1);
                }
                
                img {
                    transform: scale(1.025);
                }
            }

            ${PartnerCardButton} {
                background-color: ${customTheme.color.primary};
                color: ${customTheme.color.white};
            }

            ${PartnerCardLabel} {
                &::before {
                    animation: shimmer 1s ease-in-out;
                }
            }
        }
    }
`

const PartnerCardInner = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

const PartnerCardInfo = styled.div`
    flex: 1;
    padding-block: 2rem;
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const PartnerCardTitle = styled.h3`
    font-size: clamp(1.25rem, 5vw, 2.2rem);
    color: ${customTheme.color.primaryDark};
    font-weight: 500;
`

const PartnerCardText = styled.div`
    height: 5.5rem;
    
    p {
        font-size: clamp(1.1rem, 5vw, 1.4rem);
        color: ${customTheme.color.primaryDark};
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`

const PartnerCardCategory = styled.span`
    position: relative;
    display: block;
    color: ${customTheme.color.grey};
    font-weight: 300;
    line-height: 1;
    font-size: 1.1rem;
`

const PartnerCardCategories = styled.ul`
    margin-top: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem 0;
    
    li:not(:last-child) {
        ${PartnerCardCategory} {
            padding-right: 2rem;
            
            &::before {
                content: "";
                position: absolute;
                right: 0.85rem;
                bottom: 0.25rem;
                border-radius: 100%;
                width: .5rem;
                height: .5rem;
                background-color: ${customTheme.color.primary};
            }
        }
    }
`

const PartnerCard = ({partner}) => {

  if (!partner) return null;

  return (
    <PartnerCardItem href={`/partner/${partner?.slug}` || '#'}>
      {partner?.verified && (
        <PartnerCardLabel title="Компания заслужила доверие среди клуба">
          Проверенный
        </PartnerCardLabel>
      )}
      <PartnerCardInner>
        <PartnerCardLogo>
          {partner?.logo?.url ? (
            <Image
              loading="eager"
              src={partner?.logo.url}
              alt={partner?.logo?.alt || 'logo'}
              width={partner?.logo?.width || 200}
              height={partner?.logo?.height || 200}
            />
          ) : (
            <SvgIcon name="no_photo" />
          )}
        </PartnerCardLogo>
        <PartnerCardInfo>
          {partner?.title && <PartnerCardTitle>{partner.title}</PartnerCardTitle>}
          {partner?.description && (
            <PartnerCardText>
              <p>{partner.description}</p>
            </PartnerCardText>
          )}
          <PartnerCardButton className="btn default m">
            Подробнее
          </PartnerCardButton>
          {partner?.categories?.length && (
            <PartnerCardCategories>
              {partner?.categories.map((category) => (
                <li key={category.id}>
                  <PartnerCardCategory>
                    {category.title}
                  </PartnerCardCategory>
                </li>
              ))}
            </PartnerCardCategories>
          )}
        </PartnerCardInfo>
      </PartnerCardInner>
    </PartnerCardItem>
  );
};

export default PartnerCard;
