import { useState } from "react";

import Button from "../components/FormElements/Button/Button";
import CalendarElement from "../components/FormElements/CalendarElement";
import PhoneInput from "../components/FormElements/PhoneInput";
import TextInput from "../components/FormElements/TextInput";
import TimeSelection from "../components/FormElements/TimeSelection";
import WorkPlaces from "../components/FormElements/WorkPlaces";
import { BookingService } from "../services/BookingService";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Booking = () => {
  const initial = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState<Date>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState(false);
  const [cabinet, setCabinet] = useState<string>("");
  const [bookingStage, setBookingStage] = useState(false);
  const [clientName, setClientName] = useState<string>("");
  const [phone, setPhone] = useState<number>(370);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    BookingService.getAll(db);
    setSubmitedSuccess(true);
    setBookingStage(true);
  };

  const chooseCabinet = (cabinet: string) => {
    setCabinet(cabinet);
  };
  const chooseDate = (date: Date) => {
    setSelectedDate(date);
  };
  const enterClientName = (clientName: string) => {
    setClientName(clientName);
  };
  const enterPhone = (phone: number) => {
    setPhone(phone);
  };

  return (
    <div className="main">
      <h3>Registracija</h3>
      <form onSubmit={onSubmit}>
        {bookingStage === false ? (
          <>
            <div className="date-time">
              <CalendarElement chooseDate={chooseDate} value={selectedDate} />
              <TimeSelection />
            </div>
            <WorkPlaces chooseCabinet={chooseCabinet} />
          </>
        ) : (
          <>
            <TextInput
              textInputName="Vardas"
              enterText={enterClientName}
              value={clientName}
            />
            <PhoneInput enterPhone={enterPhone} value={phone} />
          </>
        )}
        <Button name="Toliau" size="Button-Large" disabled={false} />
      </form>
      <div>
        {submitedSuccess === true ? (
          <>
            <h4>Registracija sėkiminga!</h4>
            <div className="data">{selectedDate.toString()}</div>
            <div className="data">Kabinetas: {cabinet}</div>
            <div className="data">Vardas: {clientName}</div>
            <div className="data">Tel. nr: {phone}</div>
          </>
        ) : (
          <h2> </h2>
        )}
      </div>
    </div>
  );
};

export default Booking;
