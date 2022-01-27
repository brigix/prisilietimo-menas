import { useState } from "react";

import Button from "../components/FormElements/Button/Button";
import CalendarElement from "../components/FormElements/CalendarElement";
import PhoneInput from "../components/FormElements/PhoneInput";
import TextInput from "../components/FormElements/TextInput";
import TimeSelection from "../components/FormElements/TimeSelection";
import WorkPlaces from "../components/FormElements/WorkPlaces";

const Booking = () => {
  const initial = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState<Date>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState<boolean>(false);
  const [cabinet, setCabinet] = useState<string>("");
  const [bookingStage, setBookingStage] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [phone, setPhone] = useState<number>(370);
  const [showTimes, setShowTimes] = useState<boolean>(false);

  const onNextClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingStage(true);
  };

  const onConfirmBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitedSuccess(true);
  };

  const onShowTimes = () => {
    if (
      cabinet === "Kaunas, Ukmergės g." ||
      (cabinet === "Lapės, Panerių g." && selectedDate != null)
    ) {
      setShowTimes(true);
    }
  };

  const chooseCabinet = (cabinet: string) => {
    setCabinet(cabinet);
    onShowTimes();
  };
  const chooseDate = (date: Date) => {
    setSelectedDate(date);
    onShowTimes();
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
      <form>
        {bookingStage === false ? (
          <>
            <div className="date-time">
              <CalendarElement chooseDate={chooseDate} value={selectedDate} />
              {showTimes ? (
                <>
                  <TimeSelection selectedDate={selectedDate} />
                </>
              ) : (
                <>
                  <h4>prašome pasirinkti datą ir kabinetą!</h4>
                </>
              )}
            </div>
            <WorkPlaces chooseCabinet={chooseCabinet} />
            <Button
              name="Toliau"
              size="Button-Large"
              disabled={false}
              onClick={onNextClick}
            />
          </>
        ) : (
          <>
            <TextInput
              textInputName="Vardas"
              enterText={enterClientName}
              value={clientName}
            />
            <PhoneInput enterPhone={enterPhone} value={phone} />
            <Button
              name="Registruotis"
              size="Button-Large"
              disabled={false}
              onClick={onConfirmBooking}
            />
          </>
        )}
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
