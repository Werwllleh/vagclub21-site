'use client'

import {useState} from "react";
import styled from "styled-components";
import Link from "next/link";
import {customTheme} from "@/styles/theme";

const ATTACH_EMAIL = 'connect@vagclub21.ru';

// Готовый текст письма для копирования. Telegram ID пользователя подставляется
// автоматически; название компании берётся со страницы партнёра.
const buildLetter = ({companyName, chatId}) => (
  `Здравствуйте!

Прошу закрепить компанию «${companyName || '—'}» за моим профилем на VAGCLUB21 и предоставить доступ к управлению её информацией.

Мой Telegram ID: ${chatId || '(укажите ваш Telegram ID)'}

Документ, подтверждающий мою принадлежность к компании, прилагаю во вложении.

С уважением.`
);

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    max-width: 56rem;
    color: ${customTheme.color.black};
`

const Title = styled.p`
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 500;
`

const Text = styled.p`
    font-size: 1.3rem;
    line-height: 1.55;
    color: ${customTheme.color.grey};

    @media (min-width: ${customTheme.breakpoint.tablet}) {
        font-size: 1.4rem;
    }

    a {
        color: ${customTheme.color.primary};
        text-decoration: underline;
        text-underline-offset: .4rem;
    }
`

const Letter = styled.pre`
    margin: 0;
    padding: 1.6rem;
    background-color: ${customTheme.color.greyLight};
    border-radius: ${customTheme.radius.r10};
    font-family: inherit;
    font-size: 1.25rem;
    line-height: 1.55;
    white-space: pre-wrap;
    word-break: break-word;
    color: ${customTheme.color.black};
`

const CopyButton = styled.button`
    align-self: flex-start;
    padding-block: 1.2rem;
    padding-inline: 2.4rem;
    border-radius: ${customTheme.radius.r10};
    background-color: ${({$copied}) => $copied ? customTheme.color.greyLight : customTheme.color.primary};
    color: ${({$copied}) => $copied ? customTheme.color.primaryDark : customTheme.color.white};
    font-size: 1.3rem;
    font-weight: 500;
    transition: background-color ${customTheme.transition.small}, color ${customTheme.transition.small};
`

const PartnerAttachInstruction = ({companyName, chatId}) => {

  const [copied, setCopied] = useState(false);

  const letter = buildLetter({companyName, chatId});

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard недоступен (нет https / отказ) — молча оставляем текст для ручного копирования
    }
  };

  return (
    <Wrap>
      <Title>Прикрепление компании</Title>
      <Text>
        Чтобы получить доступ к&nbsp;управлению компанией, отправьте письмо на&nbsp;
        <Link href={`mailto:${ATTACH_EMAIL}`}>{ATTACH_EMAIL}</Link>. Укажите ваш Telegram&nbsp;ID
        и&nbsp;приложите документ, подтверждающий, что&nbsp;вы&nbsp;являетесь представителем компании.
        После проверки мы&nbsp;закрепим компанию за&nbsp;вашим профилем.
      </Text>
      <Text>Можно скопировать готовый текст письма&nbsp;&mdash; ваш Telegram&nbsp;ID уже подставлен:</Text>
      <Letter>{letter}</Letter>
      <CopyButton type="button" onClick={handleCopy} $copied={copied}>
        {copied ? 'Скопировано' : 'Скопировать текст'}
      </CopyButton>
    </Wrap>
  );
};

export default PartnerAttachInstruction;
