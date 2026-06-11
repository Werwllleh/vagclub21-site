'use client'
import styled from "styled-components";
import {customTheme} from "../styles/theme";
import {useUiStore} from "../store/ui.store";



const OverlayContainer =  styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    opacity: ${({ $active }) => (
      $active ? '1' : '0'
    )};
    visibility: ${({ $active }) => (
      $active ? 'visible' : 'hidden'
    )};
    background: rgba(237, 237, 237, 0.7);
    backdrop-filter: blur(.5rem);
    transition: opacity ${customTheme.transition.small},
    backdrop-filter ${customTheme.transition.small},
    visibility ${customTheme.transition.small};
`

const Overlay = () => {

  const overlayActive = useUiStore((state) => state.overlayActive)

  return (
    <OverlayContainer $active={overlayActive} />
  );
};

export default Overlay;