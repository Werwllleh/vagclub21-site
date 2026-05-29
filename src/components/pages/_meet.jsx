"use client"
import React, {useEffect, useState} from 'react';
import {useMeet} from "../../hooks/useMeet";

//dayjs plugins
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

//dayjs plugins
import 'dayjs/locale/ru'
import {RichText} from "@payloadcms/richtext-lexical/react";
import Loading from "../../app/loading";

const Meet = () => {

  const {meet, isLoading} = useMeet();

  const [currentDate, setCurrentDate] = useState(false);

  useEffect(() => {
    console.log(meet)
    if (meet?.date && meet?.date_tz) {
      setCurrentDate(dayjs().isBefore(dayjs(meet?.date, 'h').tz(meet?.date_tz, true)))
      // console.log(dayjs(meet?.date).tz(meet?.date_tz, true).locale('ru').format('DD MMMM YYYY'))
    }
  }, [meet]);
  return (
    <div className="meet ppt ppb">
      <div className="container">
        <h1 className="meet__title h1">Встреча клуба</h1>
        <div className="meet__body">
          {isLoading ? (
            <Loading />
          ) : meet && currentDate ? (
            <div className="meet__wrap">
              {meet?.title && <h2 className="meet-info__title">{meet?.title}</h2>}
              <div className="meet-info">
                {meet?.description && (
                  <div className="meet-info__address">
                    <RichText data={meet.description} />
                  </div>
                )}
                {meet?.description && (
                  <div className="meet-info__description">
                    <RichText data={meet.description} />
                  </div>
                )}

              </div>
              <div className="meet-map">

              </div>
            </div>
          ) : (
            <div className="meet__not-found">Информация о встрече клуба будет доступна позже</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Meet;