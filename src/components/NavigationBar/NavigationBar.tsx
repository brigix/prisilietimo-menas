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
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
            <li>
              <NavLink to="/Booking">Booking</NavLink>
            </li>
            <li>
              <NavLink to="/Contact">Contact</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
