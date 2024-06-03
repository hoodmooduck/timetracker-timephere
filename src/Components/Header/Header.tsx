import { ReactSVG } from "react-svg";
import "./Header.scss";
import Logo from "/assets/svg/logo.svg";
import Complete from "/assets/svg/complete.svg";
import Exclamation from "/assets/svg/exclamation.svg";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
        <div className="header__links">
            <NavLink to='/main/' className="header__link">
                <ReactSVG src={Logo} />
                <span>На главную</span>
            </NavLink>
            <NavLink to='/main/complete/' className="header__link">
                <ReactSVG src={Complete} />
                <span>Выполненные</span>
            </NavLink>
            <NavLink to='/main/progress/' className="header__link">
                <ReactSVG src={Exclamation} />
                <span>В процессе</span>
            </NavLink>
        </div>
    </header>
  );
};

export default Header;
