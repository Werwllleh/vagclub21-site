import React from 'react';
import styled from "styled-components";

const ContainerWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 147rem;
    padding-inline: 1.5rem;
`


const Container = ({children}) => {
  return (
    <ContainerWrap>
      {children}
    </ContainerWrap>
  );
};

export default Container;
