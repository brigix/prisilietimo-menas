import React, { useEffect, useState } from "react";
import AviableBookingModel from "../../models/BookingModel";
import { BookingService } from "../../services/BookingService";
import "./FormElements.css";

const TimeSelection = (props: { selectedDate: Date }) => {
  const [timesByDate, setTimesByDate] = useState<string[]>([]);

  const TimesByDate = async () => {
    const datesArr = await BookingService.getByDate(props.selectedDate);
    let timeArr: string[] = [];
    if (datesArr != null) {
      datesArr.forEach((date) => {
        timeArr.push(TimeToString(date.date));
      });
    } else {
      timeArr = [];
    }
    setTimesByDate(timeArr);
    console.log("timeArr: ", timeArr);
  };

  const chooseTime = (time: string) => {
    throw new Error("Function not implemented.");
  };

  const TimeToString = (time: Date) => {
    const timeStr: string =
      time.getHours().toString() + "." + time.getMinutes().toString();
    return timeStr;
  };

  useEffect(() => {
    TimesByDate();
  }, []);

  //
  return (
    <div className="time">
      <h4>Laiko pasirinkimai: </h4>
      <div className="container-time">
        {timesByDate.map((time) => (
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
