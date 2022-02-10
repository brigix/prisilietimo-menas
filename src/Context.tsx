import { createContext } from "react";

interface IAuthContext {
  isLoggedIn: boolean;
  toggleLogged: () => void;
}

const defaultState = {
  isLoggedIn: true,
  toggleLogged: () => {},
};

const AuthContext = createContext<IAuthContext>(defaultState);

export default AuthContext;
