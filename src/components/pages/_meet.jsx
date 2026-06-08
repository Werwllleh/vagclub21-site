"use client"
import React, {useEffect, useState} from 'react';
import {useMeet} from "@/hooks/useMeet";
import {RichText} from "@payloadcms/richtext-lexical/react";
import Loading from "../../app/loading";
import Link from "next/link";
import YandexMap from "@/components/yandex-map";
import AnimateSection from "@/components/blocks/animate-section";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);


const Meet = () => {

  const { meet, isLoading, meetDate, meetTimezone } = useMeet();

  const [isCurrent, setIsCurrent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (meetDate) {
      const now = dayjs();
      const eventDate = dayjs(meetDate).tz(meetTimezone, true);
      setIsCurrent(now.isBefore(eventDate));
    }
  }, [meetDate, meetTimezone]);

  if (isLoading || !isMounted) {
    return <Loading/>;
  }

  return (
    <AnimateSection className={"meet ppt ppb"}>
      <div className="container">
        <h1 className="meet__title h1">Встреча клуба</h1>
        <div className="meet__body">
          {meet && isCurrent ? (
            <div className="meet__wrap">
              {meet?.title && <h2 className="meet-info__title">{meet.title}</h2>}
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
                {meet?.date && (
                  <div className="meet-info__date">
                    <h4 className="meet-info__group-title">Дата встречи:</h4>
                    <span>
                      {dayjs(meet?.date)
                        .tz(meet?.date_tz, true)
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
