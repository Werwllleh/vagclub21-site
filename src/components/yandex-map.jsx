'use client';

import React, {useEffect, useMemo, useRef} from 'react';
import {
  FullscreenControl, GeolocationControl,
  Placemark,
  SearchControl,
  TrafficControl,
  YMaps,
  Map,
  ZoomControl
} from "@iminside/react-yandex-maps";

const defaultMapOptions = {
  searchBoxControl: false,
  trafficControl: false,
  fullscreenControl: true,
  zoomControl: true,
  geolocationControl: false,
};

const YandexMap = ({
                     coordinates,
                     zoom = 15,
                     markerText,
                     mapOptions = {},
                   }) => {

  const yandexMapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && yandexMapRef.current) {

      console.log(yandexMapRef.current);
      // Отключаем зум колесиком мыши
      yandexMapRef.current?.behaviors?.disable('scrollZoom');

      // Опционально: если нужно отключить и другие поведения, например, drag (перетаскивание)
      // mapRef.current.behaviors.disable(['scrollZoom', 'drag']);
    }
  }, []);

  const mergedOptions = useMemo(
    () => ({...defaultMapOptions, ...mapOptions}),
    [mapOptions]
  );

  const modules = useMemo(() => {
    const mods = ['control.ZoomControl', 'control.FullscreenControl'];

    if (mergedOptions.searchBoxControl) {
      mods.push('control.SearchControl');
    }
    if (mergedOptions.trafficControl) {
      mods.push('control.TrafficControl');
    }
    if (mergedOptions.geolocationControl) {
      mods.push('control.GeolocationControl');
    }

    return mods;
  }, [mergedOptions]);

  const mapState = useMemo(
    () => ({
      center: coordinates,
      zoom,
      controls: [],
      behaviors: ['drag', 'dblClickZoom', 'multiTouch'],
    }),
    [coordinates, zoom]
  );

  const mapOptionsConfig = useMemo(
    () => ({
      suppressMapOpenBlock: true,
      scrollZoom: false,
    }),
    []
  );


  return (
    <YMaps
      query={{
        apikey: process.env.NEXT_PUBLIC_YM_KEY,
        lang: 'ru_RU',
        load: modules.join(','),
      }}
    >
      <Map
        state={mapState}
        options={mapOptionsConfig}
        width="100%"
        height="100%"
      >
        <Placemark
          geometry={coordinates}
          properties={{
            hintContent: markerText || 'Метка',
            balloonContent: markerText || 'Координаты: ' + coordinates.join(', '),
          }}
          options={{
            preset: 'islands#blackAutoIcon',

          }}
        />

        {mergedOptions.zoomControl && (
          <ZoomControl
            options={{
              size: 'small',
              float: 'none',
              position: {right: 10, top: 75},
              easing: 'linear'
            }}
          />
        )}

        {mergedOptions.fullscreenControl && (
          <FullscreenControl
            options={{float: 'none', position: {right: 10, top: 155}}}
          />
        )}

        {mergedOptions.searchBoxControl && (
          <SearchControl
            options={{float: 'none', position: {right: 10, top: 15}}}
          />
        )}

        {mergedOptions.trafficControl && (
          <TrafficControl
            options={{float: 'none', position: {left: 10, top: 15}}}
          />
        )}

        {mergedOptions.geolocationControl && (
          <GeolocationControl
            options={{float: 'none', position: {left: 10, top: 75}}}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
