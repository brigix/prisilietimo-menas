import "./Button.css";

const Button = (props: any) => {
  return (
    <button
      className={props.size}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  );
};

export default Button;
