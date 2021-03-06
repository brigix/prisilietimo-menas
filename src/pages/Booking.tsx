import { useState } from "react";
import BookingTimeLocation from "../components/FormElements/BookingTimeLocation";
import { BookingService } from "../services/BookingService";
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
  const [email, setEmail] = useState<string>("");
  const [showTimes, setShowTimes] = useState<boolean>(false);
  const [chosenDateTime, setChosenDateTime] = useState<Date>();
  const [allSelected, setAllSelected] = useState<boolean>(false);

  const onNextClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingStage(true);
  };

  const onConfirmBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveBooking();
    setSubmitedSuccess(true);
  };

  const saveBooking = async () => {
    await BookingService.saveBooking(
      chosenDateTime,
      cabinet,
      clientName,
      phone,
      email
    );
  };

  const onShowTimes = () => {
    if (
      cabinet === "Utenos g. 12, Kaunas" ||
      (cabinet === "Lapės, Kauno r." && selectedDate != null)
    ) {
      setShowTimes(true);
    }
  };

  const checkSelected = () => {
    if (
      cabinet !== "" &&
      chosenDateTime !== null &&
      chosenDateTime !== undefined
    ) {
      setAllSelected(true);
    } else setAllSelected(false);
  };

  const chooseCabinet = (cabinet: string) => {
    onShowTimes();
    checkSelected();
    setCabinet(cabinet);
  };

  const chooseDateTime = (dateTime: Date) => {
    checkSelected();
    setChosenDateTime(dateTime);
  };
  const chooseDate = (date: Date) => {
    onShowTimes();
    checkSelected();
    setSelectedDate(date);
  };
  const enterClientName = (clientName: string) => {
    setClientName(clientName);
  };
  const enterEmail = (email: string) => {
    setEmail(email);
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
            <WorkPlaces chooseCabinet={chooseCabinet} />
            <div className="date-time">
              <CalendarElement chooseDate={chooseDate} value={selectedDate} />
              {showTimes ? (
                <>
                  <TimeSelection
                    selectedDate={selectedDate}
                    cabinet={cabinet}
                    chooseDateTime={chooseDateTime}
                  />
                </>
              ) : (
                <>
                  <h4>Pasirinkite datą ir kabinetą.</h4>
                </>
              )}
            </div>
            {allSelected ? (
              <>
                <BookingTimeLocation
                  cabinet={cabinet}
                  dateTime={chosenDateTime}
                />
                <Button
                  name="Toliau"
                  size="Button-Large"
                  disabled={false}
                  onClick={onNextClick}
                />
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <TextInput
              textInputName="Vardas:"
              enterText={enterClientName}
              value={clientName}
              type="text"
            />
            <TextInput
              textInputName="El. paštas:"
              enterText={enterEmail}
              value={email}
              type="text"
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
            <BookingTimeLocation cabinet={cabinet} dateTime={chosenDateTime} />
            <div className="data">Vardas: {clientName}</div>
            <div className="data">Tel. nr: {phone}</div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Booking;
