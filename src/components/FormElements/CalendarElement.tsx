import { SetStateAction } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarElement = (props: { chooseDate: any; value: Date }) => {
  const initial = new Date(Date.now());

  const disabledDates: Date[] = [new Date(2022, 0, 29), new Date(2022, 0, 23)];

  const onChange = (nextValue: SetStateAction<Date>) => {
    props.chooseDate(nextValue);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    if (date1.getTime() === date2.getTime()) {
      return true;
    } else return false;
  };

  const isPastDate = (date1: Date) => {
    if (date1.setHours(0, 0, 0, 0) < initial.setHours(0, 0, 0, 0)) {
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
    <div className="calendar">
      <Calendar
        onChange={onChange}
        value={props.value}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        locale="lt-LT"
      />
    </div>
  );
};

export default CalendarElement;
