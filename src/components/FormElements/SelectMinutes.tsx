import "./FormElements.css";

const SelectMinutes = (props: {
  chooseMinutes: any;
}) => {
  const timesMinutes: number[] = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const handleOnSelectMinutes= (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.chooseMinutes(event.target.value);
  };

  return (
    <div className="custom-select">
      <select onChange={handleOnSelectMinutes}>
        name="time"
        {timesMinutes.map((minutes) => (
          <option value={minutes} key={minutes}>
            {minutes}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMinutes;

