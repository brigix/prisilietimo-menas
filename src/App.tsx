import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Cover/Main";
import AuthContext from "./Context";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const toggleLogged = () => {
    setIsLoggedIn(isLoggedIn);
  };

  return (
    <div>
      <div className="App">
        <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, toggleLogged }}>
          <Router>
            <NavigationBar />
            <Main />
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
