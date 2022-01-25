import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context";

import Logo from "../Logo/Logo";
import "./NavigationBar.css";

const NavigationBar = () => {
  const ctx = useContext(AuthContext);

  return (
    <div>
      <div className="logo">
        <Logo />
      </div>
      <header className="header">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Pradžia</NavLink>
            </li>
            <li>
              <NavLink to="/About">Paslaugos</NavLink>
            </li>
            <li>
              <NavLink to="/Booking">Registracija</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">Susisiekite</NavLink>
            </li>
            <li>
              {ctx.isLoggedIn === true ? (
                <h4>Atsijungti</h4>
              ) : (
                <NavLink to="/Login">Prisijungti</NavLink>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
