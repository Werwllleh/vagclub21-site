"use client"
import React from 'react';

const Logo = ({inversion}) => {
  return (
    <span className={`logo ${inversion ? 'inversion' : ''}`}>
        <span className="logo__word">
            VAGCLUB
        </span>
        <span className="logo__digit">
            21
        </span>
    </span>
  );
};

export default Logo;
