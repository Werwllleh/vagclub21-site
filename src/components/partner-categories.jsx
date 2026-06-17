import React from 'react';
import {usePartnerCategories} from "@/hooks/usePartnerCategories";
import styled, {css} from "styled-components";
import Link from "next/link";
import {customTheme} from "@/styles/theme";

const PCWrapper = styled.div`
`

const PCList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 3rem;
`

const PCItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: max-content;
    border-radius: ${customTheme.radius.r7};
    border-width: 1px;
    border-style: solid;
    border-color: ${({$loading}) => (
            $loading ? customTheme.color.greyLight : customTheme.color.primary
    )};
    background-color: ${({$loading}) => (
            $loading ? customTheme.color.greyLight : customTheme.color.white
    )};
    padding-block: 1.45rem;
    padding-inline: 2.2rem;
    font-size: clamp(1.4rem, 5vw, 1.6rem);
    color: ${({$loading}) => (
            $loading ? customTheme.color.grey : customTheme.color.primaryDark
    )};
    line-height: 1;

    ${({$loading}) => $loading && css`
        position: relative;
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
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }
    `}

    &:hover {
        background-color: ${({$loading}) => (
                $loading ? customTheme.color.greyLight : customTheme.color.primary
        )};
        color: ${({$loading}) => (
                $loading ? customTheme.color.grey : customTheme.color.white
        )};
    }
`

const PartnerCategories = () => {

  const {partnerCategories, isLoading} = usePartnerCategories();

  return (
    <PCWrapper>
      <PCList>
        {isLoading && Array.from({length: 10}).map((_, index) => (
          <li key={index}>
            <PCItem as="button" $loading={true}>
              Загрузка...
            </PCItem>
          </li>
        ))}
        {!isLoading && partnerCategories.map((category) => (
          <li key={category.id}>
            <PCItem href={`/partners?category=${category.slug}`}>
              {category.title}
            </PCItem>
          </li>
        ))}
      </PCList>
    </PCWrapper>
  );
};

export default PartnerCategories;
