import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Cover/Main";

function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <NavigationBar />
          <Main />
        </Router>
      </div>
    </div>
  );
}

export default App;
