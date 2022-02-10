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
        timeArr.push(BookingService.timeToString(date.date));
      });
      setNoTimesAviable(false);
    } else {
      timeArr = [];
    }
    if (timeArr.length === 0) {
      setNoTimesAviable(true);
    }
    setTimesByDate(timeArr.sort());
  };

  const chooseTime = (time: string) => {
    const chosenDateTime: Date = new Date(
      props.selectedDate.setHours(
        BookingService.parseTime(time).hours,
        BookingService.parseTime(time).minutes
      )
    );
    props.chooseDateTime(chosenDateTime);
  };

  
  useEffect(() => {
    setPrevDate(props.selectedDate);
    setPrevCabinet(props.cabinet);
    TimesByDateByCabinet();
  }, []);

  const WhenDateChanged = () => {
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
        <WhenDateChanged />
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
