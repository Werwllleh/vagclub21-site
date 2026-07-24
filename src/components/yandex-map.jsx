'use client';

import React, {useEffect, useMemo, useRef} from 'react';
import {
  FullscreenControl, GeolocationControl,
  Placemark,
  SearchControl,
  TrafficControl,
  YMaps,
  Map,
  ZoomControl,
  useYMaps
} from "@iminside/react-yandex-maps";

const defaultMapOptions = {
  searchBoxControl: false,
  trafficControl: false,
  fullscreenControl: true,
  zoomControl: true,
  geolocationControl: false,
};

const styles = `
    .custom-marker {
      position: absolute;
      width: 4rem;
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: all;
      user-select: all;
    }
    .custom-marker__icon {
      
      svg {
        width: 100%;
        height: 100%;
        color: red;
      }
    }
  `;

const CustomPlacemark = ({ coordinates, markerText, placemarkOptions }) => {
  const ymaps = useYMaps(['templateLayoutFactory']);

  const customLayout = useMemo(() => {
    if (!ymaps) return null;

    const svgPath = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
        <path d="M256,0C159.969,0,82.109,77.859,82.109,173.906c0,100.719,80.016,163.688,123.297,238.719 C246.813,484.406,246.781,512,256,512s9.188-27.594,50.594-99.375c43.297-75.031,123.297-138,123.297-238.719 C429.891,77.859,352.031,0,256,0z M256,240.406c-36.734,0-66.516-29.781-66.516-66.5c0-36.75,29.781-66.531,66.516-66.531 s66.516,29.781,66.516,66.531C322.516,210.625,292.734,240.406,256,240.406z"/>
      </svg>
    `;

    return ymaps.templateLayoutFactory.createClass(`
      <div class="custom-marker">
        <span class="custom-marker__icon">${svgPath}</span>
      </div>
    `);
  }, [ymaps]);

  if (!customLayout) return null;

  const handleClick = () => {
    if (placemarkOptions?.link) {
      window.open(placemarkOptions.link, '_blank', 'noopener,noreferrer');
      return;
    }

    placemarkOptions?.handler?.();
  };

  return (
    <Placemark
      geometry={coordinates}
      onClick={handleClick}
      properties={{
        hintContent: markerText || 'Метка',
        balloonContent: markerText || `Координаты: ${coordinates.join(', ')}`,
      }}
      options={{
        iconLayout: customLayout,
        iconOffset: [-32, -64],
        iconShape: {
          type: 'Rectangle',
          coordinates: [
            [0, 0],
            [64, 64],
          ],
        },
        hideIconOnBalloonOpen: false,
      }}
    />
  );
};

const YandexMap = ({
                     coordinates,
                     zoom = 15,
                     markerText,
                     mapOptions = {},
                     placemarkOptions = {},
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
      <style>{styles}</style>
      <Map
        state={mapState}
        options={mapOptionsConfig}
        width="100%"
        height="100%"
      >
        <CustomPlacemark
          placemarkOptions={placemarkOptions}
          coordinates={coordinates}
          markerText={markerText}
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
