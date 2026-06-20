'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {usePartnerCategories} from "@/hooks/usePartnerCategories";
import styled, {css} from "styled-components";
import Link from "next/link";
import {customTheme} from "@/styles/theme";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Loading from "@/app/loading";
import {usePartnersStore} from "@/store/partners.store";
import CmsService from "@/services/cms.service";
import {debounce} from "@/functions/debounce";

export const PCWrapper = styled.div`
`

export const PCList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0 1.6rem;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        gap: 1rem 2rem;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    li[data-reset] {
        order: 0;

        button {
            background-color: ${customTheme.color.grey};
            border-color: ${customTheme.color.grey};
            color: ${customTheme.color.white};
        }

        @media (min-width: ${customTheme.breakpoint.mobile}) {
            order: 1;
        }
    }
    
    li {
        order: 1;
    }
`

const PCItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: max-content;
    white-space: nowrap;
    border-radius: ${customTheme.radius.r7};
    border-width: 1px;
    border-style: solid;
    border-color: ${({$loading}) => (
            $loading ? customTheme.color.greyLight : customTheme.color.primary
    )};
    background-color: ${({$loading}) => (
            $loading ? customTheme.color.greyLight : customTheme.color.white
    )};
    padding-block: 1.25rem;
    padding-inline: 2rem;
    font-size: clamp(1.3rem, 5vw, 1.6rem);
    color: ${({$loading}) => (
            $loading ? customTheme.color.grey : customTheme.color.primaryDark
    )};
    line-height: 1;

    ${({$active}) => $active && css`
        background-color: ${customTheme.color.primary};
        color: ${customTheme.color.white};
    `}
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

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        font-size: clamp(1.4rem, 5vw, 1.6rem);
        padding-block: 1.45rem;
        padding-inline: 2.2rem;
    }
`

const PartnerCategories = () => {

  const {
    filterPartnersActive,
    setFilterPartnersActive,
    setFilteredPartners,
    setFilterPartnersLoading
  } = usePartnersStore();

  const {partnerCategories, isLoading} = usePartnerCategories();


  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('category');

  const searchSelectedCategoryPartners = async (searchValue) => {
    if (!searchValue) {
      setFilterPartnersActive(false);
      setFilteredPartners([])
      return;
    }

    setFilterPartnersLoading(true);

    try {
      const response = await CmsService.fetchPartners(`?category=${searchValue}`);
      const partners = response?.data?.partners || [];

      setFilterPartnersActive(true);
      setFilterPartnersLoading(false);
      setFilteredPartners(partners);
    } catch (error) {
      console.error("Ошибка при поиске партнеров определенной категории:", error);
    } finally {
      setFilterPartnersLoading(false);
    }
  }

  useEffect(() => {
    debounce(searchSelectedCategoryPartners(searchValue), 300);
  }, [searchValue]);

  const handleClearFilter = () => {
    router.push(pathname, {scroll: false})
    setFilteredPartners([])
    setFilterPartnersActive(false)
  }

  if (isLoading || !isMounted) {
    return <Loading/>;
  }

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
            <PCItem
              $active={category.slug === searchValue}
              href={`/partners?category=${category.slug}`}
              onClick={(e) => {
                e.target.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"})
              }}
              scroll={false}
            >
              {category.title}
            </PCItem>
          </li>
        ))}
        {filterPartnersActive && (
          <li data-reset>
            <PCItem
              as="button"
              onClick={handleClearFilter}
            >
              Сбросить
            </PCItem>
          </li>
        )}
      </PCList>
    </PCWrapper>
  );
};

export default PartnerCategories;
