import React, { useState } from "react";
import Button from "../components/FormElements/Button/Button";
import TextInput from "../components/FormElements/TextInput";
import "./Pages.css";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  const enterUserName = (userName: string) => {
    setUserName(userName);
  };
  const enterPassword = (password: string) => {
    setPassword(password);
  };

  return (
    <div className="main">
      <div className="flex-form">
        <form onSubmit={formSubmissionHandler}>
          <TextInput
            textInputName="Vartotojo vardas"
            enterText={enterUserName}
            value={userName}
          />
          <TextInput
            textInputName="Slaptažodis"
            enterText={enterPassword}
            value={password}
          />
          <Button name="Prisijungti" size="Button-Large" disabled={false} />
        </form>
      </div>
      Username: {userName} password: {password}
      {isLoggedIn === true ? <h4>is Logged</h4> : <h4>not Logged</h4>}
    </div>
  );
};

export default Login;
