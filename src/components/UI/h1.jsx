import React from 'react';
import styled from "styled-components";

export const H1Element = styled.h1`
    font-size: clamp(2.8rem, 5vw, 7.2rem);
`

const H1 = ({children}) => {
  return (
    <H1Element>{children}</H1Element>
  );
};

export default H1;
