import { useEffect, useState } from "react";
import { BookingService } from "../../services/BookingService";
import "./FormElements.css";

const TimeSelection = (props: {
  selectedDate: Date;
  cabinet: string;
  chooseDateTime: any;
}) => {
  const initial = new Date(Date.now());
  const [timesByDate, setTimesByDate] = useState<string[]>([]);
  const [prevDate, setPrevDate] = useState<Date>(initial);
  const [prevCabinet, setPrevCabinet] = useState<string>("");
  const [noTimesAviable, setNoTimesAviable] = useState<boolean>(true);

  const TimesByDateByCabinet = async () => {
    const datesArr = await BookingService.getByDateByCabinet(
      props.selectedDate,
      props.cabinet
    );
    let timeArr: string[] = [];
    if (datesArr != null) {
      datesArr.forEach((date) => {
        timeArr.push(TimeToString(date.date));
      });
      setNoTimesAviable(false);
    } else {
      timeArr = [];
    }
    if (timeArr.length === 0) {
      setNoTimesAviable(true);
    }
    setTimesByDate(timeArr);
  };

  const chooseTime = (time: string) => {
    const chosenDateTime: Date = new Date(
      props.selectedDate.setHours(
        parseTime(time).hours,
        parseTime(time).minutes
      )
    );
    props.chooseDateTime(chosenDateTime);
  };

  const parseTime = (time: string) => {
    const timeSplitArr: string[] = time.split(":");
    const hours: number = parseInt(timeSplitArr[0]);
    const minutes: number = parseInt(timeSplitArr[1]);
    return { hours, minutes };
  };

  const TimeToString = (time: Date) => {
    let timeStr: string = "";
    let minutes: string = "";
    if (time.getMinutes() === 0) {
      minutes = "00";
    } else minutes = time.getMinutes().toString();
    timeStr = time.getHours().toString() + ":" + minutes;
    return timeStr;
  };

  useEffect(() => {
    setPrevDate(props.selectedDate);
    setPrevCabinet(props.cabinet);
    TimesByDateByCabinet();
  }, []);

  const IsDateChanged = () => {
    useEffect(() => {
      if (props.selectedDate !== prevDate || props.cabinet !== prevCabinet) {
        TimesByDateByCabinet();
        setPrevDate(props.selectedDate);
        setPrevCabinet(props.cabinet);
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
        {noTimesAviable === true ? <h4>Atsiprašome, užimta</h4> : <h4></h4>}
      </div>
    </div>
  );
};

export default TimeSelection;
