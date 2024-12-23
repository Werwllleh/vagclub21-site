import React from 'react';
import MainLogo from "@/components/main-logo";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__body">
          <div className="header__logo"><MainLogo /></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
