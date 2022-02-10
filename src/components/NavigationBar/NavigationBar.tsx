import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../Context";

import Logo from "../Logo/Logo";
import "./NavigationBar.css";

const NavigationBar = () => {
  const ctx = useContext(AuthContext);
  const auth = getAuth();

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        ctx.toggleLogged();
        // Sign-out successful.
      })
      .catch((error) => {
        ctx.isLoggedIn = false;
        // An error happened.
      });
  };

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

            {ctx.isLoggedIn === true ? (
              <>
                <li>
                  <NavLink to="/Login" onClick={logOutHandler}>
                    Atsijungti
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Admin">Tvarkyklė</NavLink>
                </li>
              </>
            ) : (
              <NavLink to="/Login">Prisijungti</NavLink>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
