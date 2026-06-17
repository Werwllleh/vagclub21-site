'use client'
import H1 from "../../UI/h1";
import {usePartners} from "@/hooks/usePartners";
import {useEffect} from "react";
import styled from "styled-components";
import Container from "@/components/container";
import PartnerCategories from "@/components/partner-categories";
import Loading from "@/app/loading";
import PartnerCard from "@/components/partner-card";

const PartnersWrap = styled.div`
  flex: 1;
`

const PartnersGrid = styled.div`
    margin-top: clamp(2rem, 5vw, 5rem);
    display: grid;
    grid-template-columns: 45rem 1fr;
    gap: 0 4rem;
`

const PartnersCategoriesContainer = styled.div`
`

const PartnersList = styled.div`
`

const PartnersContent = () => {

  const {partnerData, isLoading} = usePartners()

  useEffect(() => {
    console.log(partnerData)
  }, [partnerData]);

  return (
    <PartnersWrap className="ppt ppb">
      <Container>
        <H1>Партнеры клуба</H1>
        <PartnersGrid>
          <PartnersCategoriesContainer>
            <PartnerCategories />
          </PartnersCategoriesContainer>
          <PartnersList>
            {isLoading && <Loading />}
            {!isLoading && partnerData?.partners?.map((partner) => {
              return <PartnerCard partner={partner} key={partner.id} />
            })}
          </PartnersList>
        </PartnersGrid>
      </Container>
    </PartnersWrap>
  );
};

export default PartnersContent;
