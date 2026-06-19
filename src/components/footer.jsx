'use client'
import React, {useEffect, useState} from 'react';
import {PUBLIC_PAGES} from "@/config/pages/public.config";
import Link from "next/link";
import dayjs from "dayjs";
import Logo from "@/components/logo";
import styled from "styled-components";
import {customTheme} from "@/styles/theme";
import Container from "@/components/container";
import {useMeet} from "@/hooks/useMeet";
import {usePathname} from "next/navigation";
import Marquee from "@/components/marquee/marquee";
import {footerMenuList} from "@/data/content";
import SvgIcon from "@/components/svg-icon";


const FooterContainer = styled.footer`
    margin: auto 0 0 0;
    padding-block: clamp(4rem, 4vw, 5rem);
    background-color: ${customTheme.color.primaryDark};
`;

const FooterBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
`;

const FooterSeparator = styled.div`
    height: 1px;
    width: 100%;
    background-image: linear-gradient(
            to right,
            transparent,
            color-mix(in oklab, #ffffff 20%, transparent),
            transparent
    );
`;

const FooterTop = styled.div`
`

const FooterTopNav = styled.nav`
    display: grid;
    grid-template-columns: 100%;
    gap: 4rem 0;

    @media (min-width: ${customTheme.breakpoint.mobile}) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    
    @media (min-width: ${customTheme.breakpoint.tablet}) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        justify-items: center;
        gap: 4rem 3rem;
    }
`
const FooterTopList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    font-size: clamp(1.3rem, 5vw, 1.6rem);
`

const FooterTopLink = styled(Link)`
    display: block;
    color: ${customTheme.color.white};
    opacity: .4;
    max-width: max-content;

    &:hover {
        opacity: 1;
    }
    
    p {
        font-size: 1.4rem;

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            font-size: clamp(1.4rem, 5vw, 1.6rem);
        }
    }

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3.5rem;
        height: 3.5rem;

        svg {
            width: 100%;
            height: 100%;
        }
    }
`

const FooterTopColumn = styled.div`
    
    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        gap: 1.6rem;
    }

    h5 {
        color: ${customTheme.color.white};
        opacity: .6;
        white-space: nowrap;
        font-size: 1.5rem;

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            font-size: clamp(1.5rem, 5vw, 2rem);
        }
    }

    &:last-child {

        @media (min-width: ${customTheme.breakpoint.mobile}) {
            grid-column: span 2;
            align-items: center;
        }

        @media (min-width: ${customTheme.breakpoint.tablet}) {
            grid-column: auto;
            align-items: flex-start;
        }
        
        ${FooterTopList} {
            flex-direction: row;
        }
    }
`

const FooterBottom = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`

const FooterCopyright = styled.div`
    color: ${customTheme.color.grey};
    font-size: clamp(1.3rem, 3vw, 1.6rem);
    font-weight: 300;
    user-select: none;
    pointer-events: none;
    text-align: center;
`

const FooterDate = styled.span`
    color: ${customTheme.color.white};
    opacity: .4;
    font-weight: 400;
    padding-inline: .4rem;
`;

const FooterLogo = styled.div`
    display: flex;
    justify-content: center;
`

const Footer = () => {

  return (
    <>
      <Marquee/>
      <FooterContainer>
        <Container>
          <FooterBody>
            <FooterTop>
              <FooterTopNav>
                {footerMenuList && footerMenuList?.map((data, index) => (
                  <FooterTopColumn key={`${index}${data.name}`}>
                    <h5>{data.groupName}</h5>
                    <FooterSeparator />
                    <FooterTopList>
                      {data.list.map((item) => (
                        <li key={item?.path}>
                          <FooterTopLink
                            href={item.path}
                            target={item.openOnOtherWindow ? `_blank` : ''}
                          >
                            {item.label ? <p>{item.label}</p> : null}
                            {item.icon ? (
                              <span>
                                <SvgIcon name={item.icon}/>
                              </span>
                            ) : null}
                          </FooterTopLink>
                        </li>
                      ))}
                    </FooterTopList>
                  </FooterTopColumn>
                ))}
              </FooterTopNav>
            </FooterTop>
            <FooterSeparator />
            <FooterBottom>
              <FooterLogo>
                <Link href={PUBLIC_PAGES.HOME.URL}>
                  <Logo inversion={true}/>
                </Link>
              </FooterLogo>
              <FooterCopyright>
                ©<FooterDate>{dayjs().year()}</FooterDate>vagclub21. Все права защищены.
              </FooterCopyright>
            </FooterBottom>
          </FooterBody>
        </Container>
      </FooterContainer>
    </>
  );
};

export default Footer;
