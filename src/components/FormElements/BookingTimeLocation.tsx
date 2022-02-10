import React from "react";
import { BookingService } from "../../services/BookingService";

const BookingTimeLocation = (props: any) => {
 

  return (
    <div>
      <hr></hr>
      <h4>Data: {props.dateTime?.toLocaleDateString("lt-LT")}</h4>
      <h4>Laikas: {BookingService.timeToStringUndefinied(props.dateTime)}</h4>
      <h4>Vieta: {props.cabinet}</h4>
      <hr></hr>
    </div>
  );
};

export default BookingTimeLocation;
