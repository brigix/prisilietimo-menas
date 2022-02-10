import { SetStateAction } from "react";
import Calendar, { CalendarTileProperties } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BookingService } from "../../services/BookingService";

const CalendarElement = (props: { chooseDate: any; value: Date }) => {
  const disabledDates: Date[] = [new Date(2022, 0, 29), new Date(2022, 0, 23)];

  const onChange = (nextValue: SetStateAction<Date>) => {
    props.chooseDate(nextValue);
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) => {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      if (
        disabledDates.find((dDate) => BookingService.isSameDate(dDate, date)) ||
        BookingService.isPastDate(date)
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
      if (
        disabledDates.find((dDate: Date) =>
          BookingService.isSameDate(dDate, date)
        )
      ) {
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
