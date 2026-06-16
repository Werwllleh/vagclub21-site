import styled from "styled-components";
import Image from 'next/image'
import {customTheme} from "@/styles/theme";
import Container from "@/components/container";
import SvgIcon from "@/components/svg-icon";
import Link from "next/link";
import {ymReach} from "@/utils/ym";
import {SOCIAL, YM_ACTION, YM_METHOD} from "@/constants";
import {placeholderBlur} from "@/data/content";


const TWContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
`

const TWInfo = styled.div`
`

const TWTitle = styled.h1`
    color: ${customTheme.color.white};
    font-size: clamp(2rem, 5vw, 7.2rem);
    font-weight: 500;
    text-align: center;
`

const TWSocials = styled.div`
    margin-top: clamp(4rem, 5vw, 8rem);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, auto));
    align-items: flex-start;
    justify-content: center;
    gap: 0 clamp(3rem, 5vw, 10rem);
`

const TWSocialItem = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 2rem 0;
    
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: clamp(7rem, 5vw, 10rem);
        height: clamp(7rem, 5vw, 10rem);
        transition: transform ${customTheme.transition.small};
        
        svg {
            width: 100%;
            height: 100%;
            color: ${customTheme.color.white};
        }
    }
    p {
        font-size: clamp(1.8rem, 5vw, 3.2rem);
        color: ${customTheme.color.white};
        text-align: center;
    }
    
    &:hover {
        span {
            transform: scale(1.2);
        }
    }
`

const TWBackground = styled.div`
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        opacity: .6;
        z-index: 1;
    }
`

const TWImage = styled(Image)`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: blur(5px);
`



const TechnicalWork = () => {
  return (
    <TWContainer>
      <TWInfo>
        <Container>
          <TWTitle>ТЕХНИЧЕСКИЕ РАБОТЫ</TWTitle>
          <TWSocials>
            <TWSocialItem
              target="_blank"
              rel="noopener norefferer"
              href={SOCIAL.TELEGRAM}
              onClick={() => ymReach(YM_METHOD.REACH_GOAL, YM_ACTION.TELEGRAM_GROUP)}
            >
              <span>
                <SvgIcon name="telegram" />
              </span>
              <p>Беседа</p>
            </TWSocialItem>
            <TWSocialItem
              target="_blank"
              rel="noopener norefferer"
              href={SOCIAL.INSTAGRAM}
              onClick={() => ymReach(YM_METHOD.REACH_GOAL, YM_ACTION.INSTAGRAM)}
            >
              <span>
                <SvgIcon name="instagram" />
              </span>
              <p>Галерея</p>
            </TWSocialItem>
          </TWSocials>
        </Container>
      </TWInfo>
      <TWBackground>
        <TWImage
          width={1600}
          height={864}
          src="/images/not_available.webp"
          alt="Техниеские работы"
          placeholder="blur"
          blurDataURL={placeholderBlur}
        />
      </TWBackground>
    </TWContainer>
  );
};

export default TechnicalWork;
