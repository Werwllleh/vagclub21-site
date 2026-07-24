'use client';

import {useEffect, useState} from "react";


const MapYandex = () => {
  const [isApiReady, setIsApiReady] = useState(false); // Состояние готовности API
  const [reactifiedApi, setReactifiedApi] = useState(null);

  useEffect(() => {
    // Проверяем, загружен ли ymaps3
    if (typeof window === 'undefined' || typeof window.ymaps3 === 'undefined') {
      console.error('ymaps3 не загружен. Проверьте подключение скрипта.');
      return;
    }

    // Ждем, пока ymaps3 будет готов
    window.ymaps3.ready.then(() => {
      setIsApiReady(true);
    });

    // Импортируем reactify после готовности ymaps3
    if (isApiReady) {
      Promise.all([
        window.ymaps3.import('@yandex/ymaps3-reactify'),
        window.ymaps3.ready,
      ]).then(([{ reactify }]) => {
        setReactifiedApi(reactify.bindTo(React, ReactDOM).module(window.ymaps3));
      });
    }
  }, [isApiReady]);

  if (!isApiReady || !reactifiedApi) {
    return <div>Загрузка карты...</div>; // Отображаем заглушку, пока API не готово
  }

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = reactifiedApi;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <YMap location={{ center: [37.588144, 55.733842], zoom: 9 }}>
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
      </YMap>
    </div>
  );
};

export default MapYandex;
