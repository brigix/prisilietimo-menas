import { SetStateAction, useState } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import WorkPlaces from "../components/FormElements/WorkPlaces";

const Booking = () => {
  const initial = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState<Date>(initial);

  const disabledDates: Date[] = [
    new Date(2022, 0, 20),
    new Date(2022, 0, 14),
    new Date(2022, 0, 23),
  ];

  const onChange = (nextValue: SetStateAction<Date>) => {
    setSelectedDate(nextValue);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    if (date1.getTime() === date2.getTime()) {
      return true;
    } else return false;
  };

  const isPastDate = (date1: Date) => {
    if (date1.getTime() < Date.now()) {
      return true;
    } else return false;
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) => {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      if (
        disabledDates.find((dDate) => isSameDate(dDate, date)) ||
        isPastDate(date)
      ) {
        return true;
      } else return false;
    } else return false;
  };

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    // Add class to tiles in month view only
    const classNameFree: string = "react-calendar button Lapes";
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (disabledDates.find((dDate: Date) => isSameDate(dDate, date))) {
        return null;
      } else return classNameFree;
    } else return classNameFree;
  };

  return (
    <div className="main">
      <h3>Registracija</h3>
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={selectedDate}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          locale="lt-LT"
        />
      </div>
      <form>
        <WorkPlaces />
      </form>
      <div className="data">{selectedDate.toString()}</div>
      <div className="data"></div>
    </div>
  );
};

export default Booking;
