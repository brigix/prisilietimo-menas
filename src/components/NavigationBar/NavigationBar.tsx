import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./NavigationBar.css";

const NavigationBar = () => {
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
              <NavLink to="/Login">Prisijungti</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
