'use client'
import H1 from "@/components/UI/h1";
import {usePolicy} from "@/hooks/usePolicy";
import styled from "styled-components";
import {RichText} from "@payloadcms/richtext-lexical/react";
import dayjs from "dayjs";
import AnimateSection from "@/components/blocks/animate-section";
import {customTheme} from "@/styles/theme";
import React, {useEffect, useState} from "react";
import Loading from "@/components/loading";

const PolicyWrap = styled(AnimateSection)`
    background-color: ${customTheme.color.greyLight};
`

const PolicyInner = styled.div`
    border: 1px solid ${customTheme.color.greyLight};
    border-radius: ${customTheme.radius.r15};
    padding-inline: 2rem;
    padding-block: 3rem;
    background-color: ${customTheme.color.white};
    max-width: 125rem;
    margin-inline: auto;

    @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
        padding-inline: 4rem;
        padding-block: 5rem;
    }
`

const PoliceHeader = styled.div`
    max-width: 72rem;

    h1 {
        font-size: clamp(2.8rem, 5vw, 5.6rem);
        line-height: 1.15;
    }
`

const PoliceUpdate = styled.div`
    margin-top: 1.6rem;
    font-size: 1.25rem;
    color: ${customTheme.color.grey};
    pointer-events: none;
    user-select: none;
`

const PoliceMain = styled.div`
    margin-top: 4rem;
`

const PoliceDescription = styled.div`

    .payload-richtext {

        h2 {
            margin-bottom: 2rem;
            font-size: clamp(2rem, 5vw, 3.2rem);
            font-weight: 600;
        }

        hr {
            border-color: ${customTheme.color.greyLight};
            margin-block: clamp(2rem, 5vw, 3rem) clamp(1.6rem, 5vw, 2rem);
            width: calc(100% + 4rem);
            margin-left: -2rem;

            @media (min-width: ${customTheme.breakpoint.semiDesktop}) {
                margin-left: -4rem;
                width: calc(100% + 8rem);
            }
        }

        p + ul {
            margin-top: 1.6rem;
        }
    }
`

const PolicyContent = ({initialData = null}) => {

  const {policy, isLoading} = usePolicy(initialData);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  // isMounted убран из условия: он блокировал SSR-рендер (сервер отдавал только лоадер)
  if (isLoading) {
    return <Loading/>;
  }

  return (
    <PolicyWrap className="ppt ppb">
      <PolicyInner>
        <PoliceHeader>
          <H1>Политика конфиденциальности</H1>
          {policy?.updatedAt && (
            <PoliceUpdate>
              <p>Последняя редакция: <span>{dayjs(policy.updatedAt).format('DD MMMM YYYY')}</span></p>
            </PoliceUpdate>
          )}
        </PoliceHeader>
        <PoliceMain>
          {policy?.description && (
            <PoliceDescription>
              <RichText data={policy.description}/>
            </PoliceDescription>
          )}
        </PoliceMain>
      </PolicyInner>
    </PolicyWrap>
  );
};

export default PolicyContent;
