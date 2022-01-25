import React, { useState, useContext } from "react";
import Button from "../components/FormElements/Button/Button";
import TextInput from "../components/FormElements/TextInput";
import "./Pages.css";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import AuthContext from "../Context";

const Login = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const auth = getAuth();
  const ctx = useContext(AuthContext);

  const logInHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email);
        ctx.isLoggedIn = true;
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ctx.isLoggedIn = false;
      });
  };

  const enterUserEmail = (userEmail: string) => {
    setUserEmail(userEmail);
  };
  const enterPassword = (password: string) => {
    setPassword(password);
  };

  const logOutHandler = () => {
    signOut(auth)
      .then(() => {
        ctx.isLoggedIn = false;
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="main">
      <div className="flex-form">
        <form>
          <TextInput
            textInputName="Vartotojo el. paštas"
            enterText={enterUserEmail}
            value={userEmail}
          />
          <TextInput
            textInputName="Slaptažodis"
            enterText={enterPassword}
            value={password}
          />
          {ctx.isLoggedIn === true ? (
            <Button
              name="Atsijungti"
              size="Button-Large"
              disabled={false}
              onClick={logOutHandler}
            />
          ) : (
            <Button
              name="Prisijungti"
              size="Button-Large"
              disabled={false}
              onClick={logInHandler}
            />
          )}
          <div></div>
        </form>
      </div>
      Username: {userEmail} password: {password} : {ctx.isLoggedIn.toString()}
      {ctx.isLoggedIn === true ? <h4>is Logged</h4> : <h4>not Logged</h4>}
    </div>
  );
};

export default Login;
