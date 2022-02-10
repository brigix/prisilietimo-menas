import { useEffect, useState } from "react";
import { BookingService } from "../../services/BookingService";
import BookedModel from "../../models/BookedModel";
import "./BookedJournal.css";

const BookedJournal = () => {
  const [bookedArr, setBookedArr] = useState<BookedModel[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const bookedArr: BookedModel[] | null = await BookingService.getAllBooked();
    console.log("booked journal: ", bookedArr);
    if (bookedArr != null) {
      setBookedArr(bookedArr.sort());
    }
  };

  const printBookedEntry = (booked: BookedModel) => {
    return (
      <div
        key={
          "div" +
          booked.date +
          booked.location +
          booked.name +
          booked.email +
          +booked.phone
        }
      >
        <span key={"span" + booked.date.toString()}>
          {booked.date.toLocaleString("lt-LT")}
        </span>
        <br />
        <span>{booked.location}</span> <br />
        <span>{booked.name}</span> <br />
        <span>{booked.email}</span> <br />
        <span>{booked.phone}</span> <br />
        <hr></hr>
      </div>
    );
  };

  return (
    <div className="journal">
      <h4> Registracijos žurnalas:</h4>
      <ul>
        {bookedArr.map((booked) => (
          <li
            key={
              "li" +
              booked.date +
              booked.location +
              booked.name +
              booked.email +
              +booked.phone
            }
          >
            {printBookedEntry(booked)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookedJournal;
