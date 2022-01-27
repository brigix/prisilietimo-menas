import { createContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  toggleLogged: () => void;
}

const defaultState = {
  isLoggedIn: false,
  toggleLogged: () => {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export default AuthContext;
