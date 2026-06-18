'use client'
import H1 from "../../UI/h1";
import {usePartners} from "@/hooks/usePartners";
import styled from "styled-components";
import PartnerCategories, {PCList} from "@/components/partner-categories";
import Loading from "@/app/loading";
import PartnerCard from "@/components/partner-card";
import {customTheme} from "@/styles/theme";
import {usePartnersStore} from "@/store/partners.store";
import {useEffect} from "react";
import Image from "next/image";

const PartnersWrap = styled.div`
    flex: 1;
`

const PartnersGrid = styled.div`
    margin-top: clamp(2rem, 5vw, 5rem);
    display: grid;
    grid-template-columns: 100%;
    gap: 4rem 0;

    @media (min-width: ${customTheme.breakpoint.w1250}) {
        grid-template-columns: 40rem 1fr;
        gap: 0 4rem;
        align-items: stretch;
    }
`

const PartnersCategoriesContainer = styled.div`

    ${PCList} {
        flex-wrap: nowrap;
        gap: 0 2rem;
        overflow-x: auto;
        margin-inline: -1.5rem;
        padding-inline: 1.5rem;

        @media (min-width: ${customTheme.breakpoint.w1250}) {
            flex-wrap: wrap;
            gap: 1rem 3rem;
        }
    }
`

const PartnersList = styled.div`

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

const PartnersEmpty = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
    
    img {}
    
    p {
        font-weight: 500;
        font-size: clamp(1.4rem, 5vw, 4rem);
    }
`

const PartnersContent = () => {

  const {partnerData, isLoading} = usePartners();

  const {filterPartnersActive, filteredPartners, filterPartnersLoading} = usePartnersStore();

  useEffect(() => {
    console.log(filteredPartners)
  }, [filteredPartners])

  return (
    <PartnersWrap>
      <H1>Партнеры клуба</H1>
      <PartnersGrid>
        <PartnersCategoriesContainer>
          <PartnerCategories/>
        </PartnersCategoriesContainer>
        <PartnersList>
          {isLoading || filterPartnersLoading ? <Loading/> : (
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
                    width={600}
                    height={400}
                    alt="Компании не найдены"
                  />
                  <p>Компании не найдены</p>
                </PartnersEmpty>
              )
            ) : (
              partnerData?.partners?.length && (
                <ul>
                  {partnerData.partners.map((partner) => {
                    return <li key={partner.id}><PartnerCard partner={partner}/></li>
                  })}
                </ul>
              )
            )
          )}
        </PartnersList>
      </PartnersGrid>
    </PartnersWrap>
  );
};

export default PartnersContent;
