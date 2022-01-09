import Calendar, { CalendarTileProperties } from "react-calendar";
import React, { SetStateAction, useState } from "react";
import "react-calendar/dist/Calendar.css";

const Booking = () => {
  const initial = new Date(Date.now());
  const [selectedDate, setSelectedDate] = React.useState<Date>(initial);

  const disabledDates: Date[] = [
    new Date(2022, 0, 20),
    new Date(2022, 0, 14),
    new Date(2022, 0, 23),
  ];

  const onChange = (nextValue: React.SetStateAction<Date>) => {
    setSelectedDate(nextValue);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    if (date1.getTime() === date2.getTime()) {
      console.log(date2);
      return true;
    } else return false;
  };

  const tileDisabled = ({ date, view }: CalendarTileProperties) => {
    // Disable tiles in month view only
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      if (disabledDates.find((dDate) => isSameDate(dDate, date))) {
        return true;
      } else return false;
    } else return false;
  };

  const tileClassName = ({ date, view }: CalendarTileProperties) => {
    // Add class to tiles in month view only
    const classNameFree: string = "react-calendar__tile--freeDate";
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (disabledDates.find((dDate: Date) => isSameDate(dDate, date))) {
        return null;
      } else return classNameFree;
    } else return classNameFree;
  };

  return (
    <div className="main">
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={selectedDate}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
        />
      </div>
      <div className="data">
        {selectedDate.toString()}
        <p>disabled dates: </p>
        <div>
          {disabledDates.map((d) => (
            <p>{d.toString()}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
