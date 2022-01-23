import React from "react";
import "./FormElements.css";

const TimeSelection = () => {
  const aviableDates: Date[] = [
    new Date(2022, 0, 25, 11, 0),
    new Date(2022, 0, 25, 13, 0),
    new Date(2022, 0, 25, 14, 30),
    new Date(2022, 0, 26, 9, 0),
    new Date(2022, 0, 26, 10, 30),
    new Date(2022, 0, 26, 16, 30),
  ];

  const aviableDatesStr: string[] = [
    "2022, 0, 25, 11, 0",
    "2022, 0, 25, 13, 0",
    "2022, 0, 25, 14, 30",
    "2022, 0, 26, 9, 0",
  ];
  function chooseTime(time: string): void {
    throw new Error("Function not implemented.");
  }
  const TimeToString = (time: Date) => {
    const timeStr: string = time.toISOString();
    return timeStr;
  };
  return (
    <div className="time">
      <h4>Laiko pasirinkimai: </h4>
      <div className="container-time">
        {aviableDatesStr.map((time) => (
          <div key={time}>
            <input
              type="radio"
              id={time}
              name="time"
              value={time}
              key={"input" + { time }}
              onClick={() => chooseTime(time)}
            />
            <label htmlFor={time} key={"label" + time}>
              {time}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSelection;
