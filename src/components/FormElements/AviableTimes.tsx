import { useState } from "react";
import "./FormElements.css";
import SelectMinutes from "./SelectMinutes";
import { BookingService } from "../../services/BookingService";

const AviableTimes = (props: { selectedDate: Date; chooseDateTime: any }) => {
  const timesHours: number[] = [
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const [minutes, setMinutes] = useState<number>(0);

  const chooseMinutes = (minutes: number) => {
    setMinutes(minutes);
  };

  const chooseTime = (hour: number) => {
    const chosenDateTime: Date = new Date(props.selectedDate.setHours(hour));
    chosenDateTime.setMinutes(minutes);
    props.chooseDateTime(chosenDateTime);
  };

  return (
    <div className="time">
      <h4>Laiko pasirinkimai: </h4>
      <div className="container-time">
        {timesHours.map((hour) => (
          <div key={hour} className="container-timeSelection">
            <input
              type="checkbox"
              id={hour.toString()}
              name="hour"
              value={hour}
              key={"input" + hour}
              onClick={() => chooseTime(hour)}
            />
            <label htmlFor={hour.toString()} key={"label" + hour}>
              {hour}
            </label>
            <SelectMinutes chooseMinutes={chooseMinutes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AviableTimes;
