import { ReactSVG } from "react-svg";
import "./Header.scss";
import Logo from "/assets/svg/logo.svg";
import Complete from "/assets/svg/complete.svg";
import Exclamation from "/assets/svg/exclamation.svg";
import Settings from "/assets/svg/settings.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);

  const openSidePanel = () => {
    setActive((val) => !val);
  };

  return (
    <header className={`header${active ? " header--active" : ""}`}>
      <div onClick={openSidePanel} className="header__burger">
        <ReactSVG src={Settings}></ReactSVG>
      </div>
      <div className="header__links">
        <NavLink to="/main/" className="header__link">
          <ReactSVG src={Logo} />
          <span>На главную</span>
        </NavLink>
        <NavLink to="/main/complete/" className="header__link">
          <ReactSVG src={Complete} />
          <span>Выполненные</span>
        </NavLink>
        <NavLink to="/main/progress/" className="header__link">
          <ReactSVG src={Exclamation} />
          <span>В процессе</span>
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
