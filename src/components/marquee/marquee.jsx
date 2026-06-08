'use client'
import React, {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {useMeet} from "@/hooks/useMeet";

import dayjs from "dayjs";
import {customTheme} from "@/styles/theme";
import {usePathname, useRouter} from "next/navigation";

const marqueeAnimate = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`;

const MarqueeContainer = styled.div`
    background-color: #b90000;
    position: fixed;
    z-index: 4;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(2rem, 4vw, 5rem);
  padding-block: clamp(1rem, 4vw, 1.6rem);
  width: max-content;
  animation: ${marqueeAnimate} 40s linear infinite;
  will-change: transform;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const MarqueeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    font-weight: 600;
    color: ${customTheme.color.white};
    white-space: nowrap;
`

const Marquee = () => {

  const { meet, isLoading, meetDate, meetTimezone } = useMeet();
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {

    if (meetDate) {
      const now = dayjs();
      const eventDate = dayjs(meetDate).tz(meetTimezone, true);
      setIsCurrent(now.isBefore(eventDate));
    }
  }, [meetDate, meetTimezone]);

  const path = usePathname();
  const navigate = useRouter();

  if (isLoading || !meet || !isCurrent) return null;
  if (path === '/meet') return null;

  const formattedDate = dayjs(meet?.date)
    .tz(meet?.date_tz, true)
    .format('DD MMMM YYYY HH:mm');

  const items = Array.from({ length: 10 }, (_, index) => (
    <MarqueeItem key={index}>
      {formattedDate}
    </MarqueeItem>
  ));

  return (
    <MarqueeContainer onClick={() => navigate.push('/meet', {
      scroll: true
    })}>
      <MarqueeTrack>
        {items}
        {items}
      </MarqueeTrack>
    </MarqueeContainer>
  );
};

export default Marquee;
