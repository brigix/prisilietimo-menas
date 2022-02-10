import { useEffect, useState } from "react";
import BookingTimeLocation from "../components/FormElements/BookingTimeLocation";
import Button from "../components/FormElements/Button/Button";
import CalendarElement from "../components/FormElements/CalendarElement";
import PhoneInput from "../components/FormElements/PhoneInput";
import TextInput from "../components/FormElements/TextInput";
import TimeSelection from "../components/FormElements/TimeSelection";
import WorkPlaces from "../components/FormElements/WorkPlaces";
import { BookingService } from "../services/BookingService";
import "../components/FormElements/FormElements.css";
import AviableTimes from "../components/FormElements/AviableTimes";
import BookedJournal from "../components/BookedJournal/BookedJournal";


const Admin = () => {
  const initial = new Date(Date.now());
  const [selectedDate, setSelectedDate] = useState<Date>(initial);
  const [submitedSuccess, setSubmitedSuccess] = useState<boolean>(false);
  const [cabinet, setCabinet] = useState<string>("");
  const [bookingStage, setBookingStage] = useState<boolean>(false);
  const [clientName, setClientName] = useState<string>("");
  const [phone, setPhone] = useState<number>(370);
  const [showTimes, setShowTimes] = useState<boolean>(false);
  const [chosenDateTime, setChosenDateTime] = useState<Date>();
  const [allSelected, setAllSelected] = useState<boolean>(false);

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
  const onShowTimes = () => {
    if (
      cabinet === "Kaunas, Ukmergės g." ||
      (cabinet === "Lapės, Panerių g." && selectedDate != null)
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

  const onSaveAviableDates = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    BookingService.addAviableBooking(chosenDateTime, cabinet);
    
  };

  return (
    <div className="main">
      <div className="admin">
        <h4>Darbo laiko registras</h4>
      </div>
      <div className="row">
        <BookedJournal />
        <form>
          <>
            <WorkPlaces chooseCabinet={chooseCabinet} />
            <div className="date-time">
              <CalendarElement chooseDate={chooseDate} value={selectedDate} />
              <AviableTimes
                selectedDate={selectedDate}
                chooseDateTime={chooseDateTime}
              />
            </div>

            <BookingTimeLocation cabinet={cabinet} dateTime={chosenDateTime} />

            <Button
              name="Išsaugoti"
              size="Button-Large"
              disabled={false}
              onClick={onSaveAviableDates}
            />
          </>
        </form>
      </div>

      <div>
        {submitedSuccess === true ? (
          <>
            <h4>Išsaugota sėkimingai!</h4>
          </>
        ) : (
          <h2> </h2>
        )}
      </div>
    </div>
  );
};

export default Admin;
