'use client';

import {useState} from 'react';
import {useServerInsertedHTML} from 'next/navigation';
import {ServerStyleSheet, StyleSheetManager} from 'styled-components';

// SSR-регистр styled-components: собирает стили при серверном рендере
// и вставляет их в HTML до гидрации (убирает FOUC)
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
export default function StyledComponentsRegistry({children}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
