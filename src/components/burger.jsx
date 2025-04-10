import React from 'react';

const Burger = ({status, ...props}) => {
  return (
    <button
      {...props}
      className={`burger ${status ? "active" : ""}`}
    >
      <span></span>
    </button>
  );
};

export default Burger;
