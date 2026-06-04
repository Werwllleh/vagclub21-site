"use client"
import React, {useEffect, useState} from 'react';
import {useMeet} from "@/hooks/useMeet";

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
import Link from "next/link";
import YandexMap from "@/components/yandex-map";
import AnimateSection from "@/components/blocks/animate-section";

const Meet = () => {

  const {meet, isLoading} = useMeet();

  const [currentDate, setCurrentDate] = useState(false);

  useEffect(() => {
    if (meet?.date && meet?.date_tz) {
      setCurrentDate(dayjs().isBefore(dayjs(meet?.date, 'h').tz(meet?.date_tz, true)))
    }
  }, [meet]);
  return (
    <AnimateSection className={"meet ppt ppb"}>
      <div className="container">
        <h1 className="meet__title h1">Встреча клуба</h1>
        <div className="meet__body">
          {isLoading ? (
            <Loading/>
          ) : meet && currentDate ? (
            <div className="meet__wrap">
              {meet?.title && <h2 className="meet-info__title">{meet?.title}</h2>}
              <div className="meet-info">
                {meet?.description && (
                  <div className="meet-info__description">
                    <h4 className="meet-info__group-title">Описание:</h4>
                    <RichText data={meet.description}/>
                  </div>
                )}
                {meet?.address && (
                  <div className="meet-info__address">
                    <h4 className="meet-info__group-title">Место встречи:</h4>
                    {!meet?.address_link ? (
                      <p>{meet.address}</p>) : (
                      <Link
                        href={meet.address_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{meet.address}</Link>
                    )}
                  </div>
                )}
                {meet?.description && (
                  <div className="meet-info__date">
                    <h4 className="meet-info__group-title">Дата встречи:</h4>
                    <span>
                      {dayjs(meet?.date)
                        .tz(meet?.date_tz, true)
                        .locale('ru')
                        .format('DD MMMM YYYY HH:mm')
                      }
                    </span>
                  </div>
                )}
              </div>
              {meet?.coordinates && (
                <div className="meet-map">
                  <div className="meet-map__element">
                    <YandexMap
                      coordinates={Object.values(meet.coordinates)}
                      zoom={17}

                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="meet__not-found">Информация о встрече клуба будет доступна позже</div>
          )}
        </div>
      </div>
    </AnimateSection>
  );
};

export default Meet;
