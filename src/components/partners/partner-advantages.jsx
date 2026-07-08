import React from 'react';
import styled from "styled-components";
import SvgIcon from "@/components/svg-icon";
import {customTheme} from "@/styles/theme";
import {H1Element} from "@/components/UI/h1";

const data = [
  {
    id: 1,
    icon: "map",
    title: "Размещение на сайте",
    text: <>Ваша компания будет на&nbsp;странице партнёров и&nbsp;на&nbsp;виду сообщества</>
  },
  {
    id: 2,
    icon: "users",
    title: "Новые клиенты",
    text: <>Получайте обращения от&nbsp;владельцев автомобилей концерна VAG</>
  },
  {
    id: 3,
    icon: "vw",
    title: "Аудитория владельцев клуба",
    text: <>Прямой доступ к&nbsp;активному сообществу клуба</>
  },
  {
    id: 4,
    icon: "trust",
    title: "Доверие и репутация",
    text: <>Статус партнёра повышает доверие к&nbsp;вашей компании</>
  },
]

const Wrapper = styled.div`
`

const Title = styled(H1Element)`
    font-weight: 600;

    @media (min-width: ${({ theme }) => customTheme.breakpoint.semiDesktop}) {
        font-size: 3.2rem;
    }
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
`

const List = styled.ul`
    display: grid;
    align-items: stretch;
    grid-template-columns: repeat(auto-fill, minmax(33rem, 1fr));
    gap: 2rem;
`

const Card = styled.div`
    background-color: ${customTheme.color.primary};
    border-radius: ${customTheme.radius.r15};
    overflow: hidden;
    padding-inline: 1.5rem;
    padding-block: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-shadow: none;
    transition: box-shadow ${customTheme.transition.small};
    
    &:hover {
        box-shadow: 0 0 10px 6px rgb(0 52 180 / 42%);
    }
`

const CardIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${customTheme.color.white};
    width: 5rem;
    height: 5rem;
    padding: .75rem;
    border-radius: ${customTheme.radius.r7};
    
    svg {
        width: 100%;
        height: 100%;
        color: ${customTheme.color.primaryDark};
    }
`

const CardTitle = styled.div`
    margin-top: 1rem;
    font-size: 1.8rem;
    color: ${customTheme.color.white};
    font-family: ${customTheme.font.secondary};
    font-weight: 600;
    user-select: none;
`

const CardText = styled.div`
    margin-top: auto;
    font-family: ${customTheme.font.secondary};
    font-size: 1.5rem;
    color: ${customTheme.color.white};
    line-height: 1.55;
    user-select: none;
`

const PartnerAdvantagesCard = ({card}) => {
  return (
    <Card>
      <CardIcon>
        <SvgIcon name={card.icon} />
      </CardIcon>
      <CardTitle>{card.title}</CardTitle>
      <CardText>{card.text}</CardText>
    </Card>
  )
}

const PartnerAdvantages = () => {
  return (
    <Wrapper>
      <Body>
        <Title as={"h2"}>Почему выгодно стать партнёром клуба?</Title>
        {data && !!data.length && (
          <List>
            {data.map((item, ) => (
              <li key={item.id}>
                <PartnerAdvantagesCard card={item} />
              </li>
            ))}
          </List>
        )}
      </Body>
    </Wrapper>
  );
};

export default PartnerAdvantages;
