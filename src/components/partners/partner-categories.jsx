'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {usePartnerCategories} from "@/hooks/usePartnerCategories";
import styled, {css} from "styled-components";
import Link from "next/link";
import {customTheme} from "@/styles/theme";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import Loading from "@/app/loading";
import {usePartnersStore} from "@/store/partners.store";
import CmsService from "@/services/cms.service";
import {debounce} from "@/functions/debounce";
import {pluralize} from "@/utils/utils";

export const PCWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 4rem 0;
`

export const PCList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 1.6rem;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        gap: 1rem 2rem;
    }

    @media (max-width: ${customTheme.breakpoint.tablet}) {
        max-height: calc(100vh - 18rem);
        overflow-y: auto;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    li[data-reset] {
        display: none;

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            display: block;
        }
    }
`

const PCItem = styled.button`
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
    padding-block: 1rem;
    padding-inline: 1.4rem;
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
        padding-block: 1.2rem;
        padding-inline: 1.6rem;
    }

    &[data-reset] {
        background-color: ${customTheme.color.grey};
        border-color: ${customTheme.color.grey};
        color: ${customTheme.color.white};
    }
    
    &[data-show] {
        background-color: ${customTheme.color.primary};
        color: ${customTheme.color.white};
    }
`

const PCFooter = styled.div`
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem 0;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: none;
    }
`

const PCActions = styled.div`
    display: flex;
    align-items: center;
    gap: 0 3rem;

    button {
        flex: 1;
        width: 100%;
        max-width: none;
    }
`

const PCFindInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: ${customTheme.color.grey};
`

const PartnerCategories = ({closeHandler}) => {

  const {
    filterPartnersActive,
    setFilterPartnersActive,
    filteredPartners,
    setFilteredPartners,
    setFilterPartnersLoading
  } = usePartnersStore();

  const {partnerCategories, isLoading} = usePartnerCategories();

  const listRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)

    const element = listRef.current;

    if (!element) return;

    const update = () => {
      element.toggleAttribute(
        'data-lenis-prevent',
        window.innerWidth <= Number(customTheme.breakpoint.tablet),
      );
    };

    update();

    window.addEventListener('resize', update);

    return () => window.removeEventListener('resize', update);
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('categories');




  const [selectedCategories, setSelectedCategories] = useState([]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const searchSelectedCategoryPartners = async (searchValue) => {
    if (!searchValue) {
      setFilterPartnersActive(false);
      setFilteredPartners([])
      return;
    }

    setFilterPartnersLoading(true);

    try {
      const response = await CmsService.fetchPartners(`?categories=${searchValue}`);
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
    if (searchValue?.length) {
      setSelectedCategories(searchValue.split(','))
    }

    debounce(searchSelectedCategoryPartners(searchValue), 300);
  }, [searchValue]);

  useEffect(() => {

    if (selectedCategories.length) {
      router.push(`${pathname}?${createQueryString('categories', selectedCategories.join(','))}`, {scroll: false});
    } else {
      router.push(pathname, {scroll: false});
    }

  }, [selectedCategories])

  const selectCategory = (slug) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== slug));
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  }

  const handleClearFilter = () => {
    router.push(pathname, {scroll: false})
    setFilteredPartners([])
    setFilterPartnersActive(false)
    setSelectedCategories([]);
  }

  if (isLoading || !isMounted) {
    return <Loading/>;
  }

  return (
    <PCWrapper>
      <PCList ref={listRef}>
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
              $active={selectedCategories.includes(category.slug)}
              onClick={() => selectCategory(category.slug)}
            >
              {category.title}
            </PCItem>
          </li>
        ))}
        {filterPartnersActive && (
          <li data-reset>
            <PCItem
              data-reset
              as="button"
              onClick={handleClearFilter}
            >
              Сбросить
            </PCItem>
          </li>
        )}
      </PCList>
      {filterPartnersActive && (
        <PCFooter>
          <PCActions>
            <PCItem
              data-reset
              as="button"
              onClick={handleClearFilter}
            >
              Сбросить
            </PCItem>
            {!!filteredPartners.length && (
              <PCItem
                data-show
                as="button"
                onClick={closeHandler}
              >
                Показать
              </PCItem>
            )}
          </PCActions>
          <PCFindInfo>
            {pluralize(filteredPartners.length, ['Найдена', 'Найдены', 'Найдено'])} {filteredPartners.length} {pluralize(filteredPartners.length, ['компания', 'компании', 'компаний'])}
          </PCFindInfo>
        </PCFooter>
      )}
    </PCWrapper>
  );
};

export default PartnerCategories;
