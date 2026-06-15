'use client'
import {useState} from 'react';
import styled from "styled-components";
import {useLenis} from "lenis/react";
import SvgIcon from "./svg-icon";
import {customTheme} from "../styles/theme";
import Link from "next/link";
import {SOCIAL} from "../constants";
import {useMeet} from "../hooks/useMeet";

const SocialsWidgetElement = styled.div`
    position: fixed;
    bottom: ${({$isMeetActive}) => ($isMeetActive ? '7rem' : '2rem')};
    left: 0;
    right: 0;
    z-index: 1;
    margin-inline: auto;
    height: auto;
    width: 100%;
    max-width: 25rem;
    border-radius: ${customTheme.radius.r15};
    overflow: hidden;
    box-shadow: ${({$active}) => ($active ? '0 0 2rem 1rem rgb(12 12 12 / 15%' : 'none')});
    opacity: ${({$active}) => ($active ? 1 : 0)};
    visibility: ${({$active}) => ($active ? 'visible' : 'hidden')};
    transform: ${({$active}) => ($active ? 'translateY(0)' : 'translateY(110%)')};
    transition: 
            opacity ${customTheme.transition.medium}, 
            visibility ${customTheme.transition.medium}, 
            box-shadow ${customTheme.transition.medium}, 
            transform ${customTheme.transition.medium};
`

const SocialsWidgetBody = styled.div`
`

const SocialsWidgetGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`

const SocialsWidgetItem = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 1rem;
    padding-inline: .5rem;
    background-color: ${customTheme.color.white};
    
    &:hover {
        background-color: ${customTheme.color.primary}; 
        
        span {
            
            svg {
                color: ${customTheme.color.white};
            }
        }
    }
    
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: clamp(3rem, 5vw, 4rem);
        height: clamp(3rem, 5vw, 4rem);
        
        svg {
            width: 100%;
            height: 100%;
            color: ${customTheme.color.primaryDark};
        }
    }
`


const SocialsWidget = () => {

  const {meet} = useMeet();

  const [active, isActive] = useState(false);

  useLenis((lenis) => {
    if (lenis.animatedScroll >= 150) {
      isActive(true)
    } else {
      isActive(false)
    }
  })

  return (
    <SocialsWidgetElement $active={active} $isMeetActive={meet}>
      <SocialsWidgetBody>
        <SocialsWidgetGrid>
          <SocialsWidgetItem
            href={SOCIAL.TELEGRAM}
            target="_blank"
            rel="noopener norefferer"
          >
            <span>
              <SvgIcon name="telegram"/>
            </span>
          </SocialsWidgetItem>
          <SocialsWidgetItem
            href={SOCIAL.INSTAGRAM}
            target="_blank"
            rel="noopener norefferer"
          >
            <span>
              <SvgIcon name="instagram"/>
            </span>
          </SocialsWidgetItem>
        </SocialsWidgetGrid>
      </SocialsWidgetBody>
    </SocialsWidgetElement>
  );
};

export default SocialsWidget;