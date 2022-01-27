import React, { useEffect, useState } from "react";
import AviableBookingModel from "../../models/BookingModel";
import { BookingService } from "../../services/BookingService";
import "./FormElements.css";

const TimeSelection = (props: { selectedDate: Date }) => {
  const initial = new Date(Date.now());
  const [timesByDate, setTimesByDate] = useState<string[]>([]);
  const [prevDate, setPrevDate] = useState<Date>(initial);

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
    let timeStr: string = "";
    let minutes: string = "";
    if (time.getMinutes() === 0) {
      minutes = "00";
    } else minutes = time.getMinutes().toString();
    timeStr = time.getHours().toString() + "." + minutes;
    return timeStr;
  };

  useEffect(() => {
    setPrevDate(props.selectedDate);
    TimesByDate();
  }, []);

  const IsDateChanged = () => {
    useEffect(() => {
      if (props.selectedDate !== prevDate) {
        TimesByDate();
        setPrevDate(props.selectedDate);
      }
    }, []);
    //
    return <h4></h4>;
  };

  //
  return (
    <div className="time">
      <h4>Laiko pasirinkimai: </h4>
      <div className="container-time">
        <IsDateChanged />
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
