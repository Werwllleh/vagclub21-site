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


const FooterContainer = styled.footer`
  margin: auto 0 0 0;
  padding-top: clamp(1.8rem, 4vw, 2.4rem);
  padding-bottom: ${({ $hasMeet }) => (
    $hasMeet ? '7rem' : 'clamp(1.8rem, 4vw, 2.4rem)'
  )
  
};
  background-color: ${customTheme.color.primaryDark};
`;

const FooterBody = styled.div`
    display: grid;
    grid-template-columns: 20rem 1fr;
    align-items: center;
`;

const FooterDate = styled.div`
    color: ${customTheme.color.white};
    user-select: none;
    pointer-events: none;
    opacity: .65;
    text-align: center;
    font-weight: 600;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    letter-spacing: 0.55rem;
`;

const Footer = () => {

  const { meetDate, meetTimezone } = useMeet();
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {

    if (meetDate) {
      const now = dayjs();
      const eventDate = dayjs(meetDate).tz(meetTimezone, true);
      setIsCurrent(now.isBefore(eventDate));
    }
  }, [meetDate, meetTimezone]);
  const path = usePathname();

  return (
    <FooterContainer $hasMeet={!!isCurrent && path !== '/meet'}>
      <Container>
        <FooterBody>
          <Link href={PUBLIC_PAGES.HOME.URL}>
            <Logo inversion={true}/>
          </Link>
          <FooterDate>
            {dayjs().year()}
          </FooterDate>
        </FooterBody>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
