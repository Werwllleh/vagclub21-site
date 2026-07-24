'use client';

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Script from "next/script";


export const MountedMapsContext = createContext({
  reactifyApi: null,
});

export const MapProvider = (props) => {
  const [reactifyApi, setReactifyApi] = useState(null);

  const contextValue = useMemo(() => ({ reactifyApi }), [reactifyApi]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ymaps3) {
      initializeReactify(window.ymaps3);
    }
  }, []);

  const initializeReactify = async (ymaps3Instance) => {

    const [ymaps3React, controlsModule] = await Promise.all([
      ymaps3Instance.import("@yandex/ymaps3-reactify"),
      ymaps3Instance.import("@yandex/ymaps3-controls@0.0.1"),
      ymaps3Instance.ready,
    ]);

    const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
    const coreComponents = reactify.module(window.ymaps3);

    const controlsComponents = reactify.module(controlsModule);

    const fullApi = {
      ...coreComponents,
      ...controlsComponents,
    };

    setReactifyApi(fullApi);
  };

  return (
    <MountedMapsContext.Provider value={contextValue}>
      <Script
        src={`https://api-maps.yandex.ru/v3/?apikey=${process.env.NEXT_PUBLIC_YM_KEY}&lang=ru_RU`}
        onLoad={() => {
          if (window.ymaps3) {
            initializeReactify(window.ymaps3);
          }
        }}
      />
      {props.children}
    </MountedMapsContext.Provider>
  );
};

export const useMap = () => useContext(MountedMapsContext);
