'use client'
import React from 'react';
import AnimateCursor from "../../animate-cursor";
import styled from "styled-components";
import Container from "../../container";
import H1 from "../../UI/h1";


const ContactsPage = styled.div`
`

const ContactsItems = styled.div`
`

const ContactsContent = () => {
  return (
    <>
      <ContactsPage className="ppt ppb">
        <Container>
          <H1>Контакты</H1>
          <ContactsItems>

          </ContactsItems>
        </Container>
      </ContactsPage>
    </>
  );
};

export default ContactsContent;