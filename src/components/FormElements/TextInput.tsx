import React from "react";
import "./FormElements.css";

const TextInput = (props: {
  textInputName: string | undefined;
  enterText: any;
  value: string;
  type: string;
}) => {
  const textInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.enterText(event.target.value);
  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor={props.textInputName}>{props.textInputName}</label>
        <input
          className="input"
          onChange={textInputChangeHandler}
          value={props.value}
          name={props.textInputName}
          type={props.type}
        />
      </div>
    </div>
  );
};

export default TextInput;
