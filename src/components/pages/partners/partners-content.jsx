'use client'
import H1 from "../../UI/h1";
import {usePartners} from "@/hooks/usePartners";
import styled from "styled-components";
import PartnerCategories, {PCList, PCWrapper} from "@/components/partners/partner-categories";
import Loading from "@/app/loading";
import PartnerCard from "@/components/partners/partner-card";
import {customTheme} from "@/styles/theme";
import {usePartnersStore} from "@/store/partners.store";
import {useCallback, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import AnimateSection from "@/components/blocks/animate-section";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Pagination} from "antd";
import Container from "@/components/container";
import SvgIcon from "@/components/svg-icon";
import {useLenis} from "lenis/react";
import {pluralize} from "@/utils/utils";
import PartnerBanner from "@/components/partners/partner-banner";

const PartnersWrap = styled(AnimateSection)`
    flex: 1;
    //padding-bottom: 10rem;
`

const PartnersGrid = styled.div`
    margin-top: clamp(2rem, 5vw, 5rem);
    display: grid;
    grid-template-columns: 100%;
    gap: 4rem 0;

    @media (min-width: ${customTheme.breakpoint.w1250}) {
        grid-template-columns: 100%;
        gap: 5rem 0;
    }
`

const PartnersCategoriesButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: max-content;
    gap: 0 .7rem;
    font-size: 1.6rem;
    line-height: 1;
    border-radius: ${customTheme.radius.r7};
    padding-block: .2rem;
    padding-inline: 1rem;
    background-color: ${customTheme.color.white};
    border: 1px solid ${customTheme.color.primary};

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.2rem;
        height: 3.2rem;

        svg {
            width: 100%;
            height: 100%;
            color: ${customTheme.color.primary};
        }
    }

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: none;
    }
`

const PartnersCategoriesContainer = styled.div`

    @media (max-width: ${customTheme.breakpoint.tablet}) {
        position: fixed;
        padding-block: 7rem;
        padding-inline: 1.5rem;
        width: 100%;
        height: 100%;
        inset: 0;
        z-index: 6;
        background-color: ${customTheme.color.white};
        opacity: ${({$active}) => ($active ? 1 : 0)};
        visibility: ${({$active}) => ($active ? 'visible' : 'hidden')};
        transform: ${({$active}) => ($active ? 'translateX(0)' : 'translateX(-120%)')};
        transition: opacity ${customTheme.transition.small}, visibility ${customTheme.transition.small}, transform ${customTheme.transition.medium};
    }
`

const PartnersCategoriesContainerClose = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;

    svg {
        width: 100%;
        height: 100%;
    }

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        display: none;
    }
`

const PartnerCategoriesTagsContainer = styled.div`
    height: 100%;
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
`


const PartnersMain = styled.div`
`

const PartnersList = styled.div`
    position: relative;

    .loader {
        position: absolute;
    }

    & > ul {
        display: grid;
        grid-template-columns: 100%;
        gap: 3rem;

        @media (min-width: ${customTheme.breakpoint.mobile}) {
            grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
            gap: 4rem 2rem;
        }
    }
`

const PartnersPagination = styled.div`
    margin-top: 4rem;
    display: flex;
    justify-content: center;
`

const PartnersEmpty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: auto;
        height: auto;
        max-height: 30rem;
    }

    p {
        margin-top: 4rem;
        font-weight: 500;
        font-size: clamp(1.4rem, 5vw, 4rem);
    }
    
    button {
        margin-top: 2rem;
        border-radius: ${customTheme.radius.r7};
    }
`

const PartnersLoaderContainer = styled.div`
    position: relative;
    display: flex;

    .loader {
        position: relative;
    }
`

const PartnersBanner = styled.div`
    margin-top: clamp(4rem, 5vw, 7rem);
`

const SHOW_DATA_PARTNERS_LIMIT = 8

const PartnersContent = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isFiltersActive, setIsFiltersActive] = useState(false);

  useLenis((lenis) => {
    lenis._isLocked = isFiltersActive
  })

  const page = useMemo(() => {
    const p = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const {partnerData, isLoading} = usePartners({page, limit: SHOW_DATA_PARTNERS_LIMIT});

  const handlePageChange = useCallback(
    (nextPage) => {
      const params = new URLSearchParams(searchParams.toString());
      if (nextPage > 1) params.set("page", String(nextPage));
      else params.delete("page");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, {scroll: true});
    },
    [router, pathname, searchParams]
  );

  const {filterPartnersActive, filteredPartners, filterPartnersLoading} = usePartnersStore();

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <PartnersWrap className="page ppt ppb">
      <Container>
        <H1>Партнеры клуба</H1>
        <PartnersGrid>
          <PartnersCategoriesButton
            onClick={() => setIsFiltersActive(true)}
          >
              <span>
                <SvgIcon name="filters"/>
              </span>
            Фильтр
          </PartnersCategoriesButton>
          <PartnersCategoriesContainer $active={isFiltersActive}>
            <PartnersCategoriesContainerClose
              onClick={() => setIsFiltersActive(false)}
            >
              <SvgIcon name="close"/>
            </PartnersCategoriesContainerClose>
            <PartnerCategoriesTagsContainer>
              <PartnerCategories closeHandler={() => setIsFiltersActive(false)}/>
            </PartnerCategoriesTagsContainer>
          </PartnersCategoriesContainer>
          <PartnersMain>
            <PartnersList>
              {isLoading || filterPartnersLoading ? <PartnersLoaderContainer><Loading/></PartnersLoaderContainer> : (
                filterPartnersActive ? (
                  !!filteredPartners.length ? (
                    <ul>
                      {filteredPartners.map((partner) => {
                        return <li key={partner.id}><PartnerCard partner={partner}/></li>
                      })}
                    </ul>
                  ) : (
                    <PartnersEmpty>
                      <Image
                        loading="eager"
                        src={"/images/company-not-found.webp"}
                        width={400}
                        height={200}
                        alt="Компании не найдены"
                      />
                      <p>Компании не найдены</p>
                      <button className="btn m default" type="button" onClick={() => {
                        router.push('/partners', {scroll: false});
                      }}>Сбросить фильтр</button>
                    </PartnersEmpty>
                  )
                ) : (
                  partnerData?.partners?.length && (
                    <>
                      <ul>
                        {partnerData.partners.map((partner) => {
                          return (
                            <li key={partner.id}>
                              <PartnerCard partner={partner}/>
                            </li>)
                        })}
                      </ul>
                      <PartnersPagination>
                        <Pagination
                          responsive={true}
                          current={page}
                          total={partnerData.totalCount}
                          pageSize={SHOW_DATA_PARTNERS_LIMIT}
                          onChange={handlePageChange}
                          showSizeChanger={false}
                        />
                      </PartnersPagination>
                    </>
                  )
                )
              )}
            </PartnersList>
          </PartnersMain>
        </PartnersGrid>
      </Container>
      <PartnersBanner>
        <PartnerBanner/>
      </PartnersBanner>
    </PartnersWrap>
  );
};

export default PartnersContent;
