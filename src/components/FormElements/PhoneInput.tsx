import "./FormElements.css";

const PhoneInput = (props: { enterPhone: any; value: number }) => {
  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.enterPhone(event.target.value);
  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor="phone">Telefono nr:</label>
        <input
          name="phone"
          type="number"
          className="phone"
          value={props.value}
          onChange={phoneChangeHandler}
          max="37069999999"
        ></input>
      </div>
    </div>
  );
};

export default PhoneInput;
