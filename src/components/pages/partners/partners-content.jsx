'use client'
import H1 from "../../UI/h1";
import {usePartners} from "@/hooks/usePartners";
import styled from "styled-components";
import PartnerCategories, {PCList, PCWrapper} from "@/components/partner-categories";
import Loading from "@/app/loading";
import PartnerCard from "@/components/partner-card";
import {customTheme} from "@/styles/theme";
import {usePartnersStore} from "@/store/partners.store";
import {useCallback, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import AnimateSection from "@/components/blocks/animate-section";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Pagination} from "antd";
import Container from "@/components/container";

const PartnersWrap = styled(AnimateSection)`
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

    ${PCWrapper} {
        position: sticky;
        top: 15rem;
    }

    ${PCList} {
        flex-wrap: nowrap;
        overflow-x: auto;
        margin-inline: -1.5rem;
        padding-inline: 1.5rem;

        @media (min-width: ${customTheme.breakpoint.w1250}) {
            flex-wrap: wrap;
        }
    }
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
    gap: 4rem;

    img {
        width: auto;
        height: auto;
        max-height: 30rem;
    }

    p {
        font-weight: 500;
        font-size: clamp(1.4rem, 5vw, 4rem);
    }
`

const SHOW_DATA_PARTNERS_LIMIT = 10

const PartnersContent = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      router.replace(qs ? `${pathname}?${qs}` : pathname, {scroll: false});
    },
    [router, pathname, searchParams]
  );

  const {filterPartnersActive, filteredPartners, filterPartnersLoading} = usePartnersStore();

  if (isLoading || !isMounted) {
    return null;
  }

  return (
    <PartnersWrap className="page ppt ppb">
      <Container>
        <H1>Партнеры клуба</H1>
        <PartnersGrid>
          <PartnersCategoriesContainer>
            <PartnerCategories/>
          </PartnersCategoriesContainer>
          <PartnersMain>
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
                        width={400}
                        height={200}
                        alt="Компании не найдены"
                      />
                      <p>Компании не найдены</p>
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
    </PartnersWrap>
  );
};

export default PartnersContent;
