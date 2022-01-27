import React from "react";

const BookingTimeLocation = (props: any) => {
  const TimeToString = (time?: Date) => {
    let timeStr: string = "";
    let minutes: string | undefined = "";
    if (time?.getMinutes() === 0) {
      minutes = "00";
    } else minutes = time?.getMinutes().toString();
    timeStr = time?.getHours().toString() + ":" + minutes;
    return timeStr;
  };

  return (
    <div>
      <hr></hr>
      <h4>Data: {props.dateTime?.toLocaleDateString("lt-LT")}</h4>
      <h4>Laikas: {TimeToString(props.dateTime)}</h4>
      <h4>Vieta: {props.cabinet}</h4>
      <hr></hr>
    </div>
  );
};

export default BookingTimeLocation;
