import { collection, addDoc, getDocs } from "firebase/firestore";
import AviableBookingModel from "../models/BookingModel";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const add = async (bookDate: Date, location: string) => {
  const docRef = await addDoc(collection(db, "BookingAviable"), {
    bookingDate: bookDate,
    location: location,
  });
  console.log("doc ref: " + docRef.id);
};

const getAll = async () => {
  console.log("Booking services ----GET ALL");
  const aviableDates: AviableBookingModel[] = [];
  const querySnapshot = await getDocs(collection(db, "BookingAviable"));
  querySnapshot.forEach((doc) => {
    let aviableDate = new AviableBookingModel(
      doc.data().bookDate.toDate(),
      doc.data().location
    );
    aviableDates.push(aviableDate);
    aviableDates.map((atr) =>
      console.log("all aviable dates:" + atr.date, atr.location)
    );
  });

  return aviableDates;
};

const isSameDay = (date1: Date, date2: Date) => {
  if (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  ) {
    return true;
  } else return false;
};

function isBookingModel(
  bookingModel: any
): bookingModel is AviableBookingModel {
  return "date" in bookingModel && "location" in bookingModel;
}

//grazina promisu array, o ne AviableBookinModel, nors viduj dirba su pastaruoju.
async function getByDate(date: Date): Promise<AviableBookingModel[] | null> {
  let aviableTimesResolved: AviableBookingModel[] = [];
  try {
    const AllAviableDates: AviableBookingModel[] =
      await BookingService.getAll();

    AllAviableDates.forEach((bs) => {
      if (isSameDay(bs.date, date) && isBookingModel(bs)) {
        aviableTimesResolved.push(bs);
      }
    });
    aviableTimesResolved.map((atr) =>
      console.log("selected by date " + date + "--->" + atr.date + atr.location)
    );
    return aviableTimesResolved;
  } catch (error) {
    return null;
  }
}

async function getByDateByCabinet(
  date: Date,
  cabinet: String
): Promise<AviableBookingModel[] | null> {
  let aviableTimesResolved: AviableBookingModel[] = [];
  try {
    const AllAviableDates: AviableBookingModel[] =
      await BookingService.getAll();

    AllAviableDates.forEach((bs) => {
      console.log(bs.location);
      if (
        isSameDay(bs.date, date) &&
        isBookingModel(bs) &&
        bs.location === cabinet
      ) {
        aviableTimesResolved.push(bs);
      }
    });
    aviableTimesResolved.map((atr) =>
      console.log("selected by date " + date + "--->" + atr.date + atr.location)
    );
    return aviableTimesResolved;
  } catch (error) {
    return null;
  }
}

export const BookingService = {
  add,
  getAll,
  getByDate,
  getByDateByCabinet,
};
