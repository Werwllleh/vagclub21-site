'use client'
import React from 'react';
import styled from 'styled-components';
import {useMeet} from "../../hooks/useMeet";

import dayjs from "dayjs";
import 'dayjs/locale/ru'

const Marquee = ({content}) => {

  const {meet, isLoading, currentDate} = useMeet();

  if (!meet || !currentDate) return;

  return (
    <div>
      {Array.from({ length: 10 }).map(() => {
        {dayjs(meet?.date)
          .tz(meet?.date_tz, true)
          .locale('ru')
          .format('DD MMMM YYYY HH:mm')
        }
      })}
    </div>
  );
};

export default Marquee;