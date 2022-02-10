import { collection, addDoc, getDocs } from "firebase/firestore";
import AviableBookingModel from "../models/BookingModel";
import BookedModel from "../models/BookedModel";
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const initial = new Date(Date.now());

const addAviableBooking = async (
  bookDate: Date | undefined,
  location: string
) => {
  const docRef = await addDoc(collection(db, "BookingAviable"), {
    bookingDate: bookDate,
    location: location,
  });
  console.log("doc ref: " + docRef.id);
};

const saveBooking = async (
  bookedDate: Date | undefined,
  location: string,
  name: string,
  phone: number,
  email: string
) => {
  const docRef = await addDoc(collection(db, "Booked"), {
    bookedDate: bookedDate,
    location: location,
    name: name,
    email: email,
    phone: phone,
  });
  console.log("doc ref: " + docRef.id);
};

async function getAllBooked(): Promise<BookedModel[] | null> {
  const bookedArr: BookedModel[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, "Booked"));
    console.log(querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      let booked = new BookedModel(
        doc.data().bookedDate.toDate(),
        doc.data().location,
        doc.data().name,
        doc.data().email,
        doc.data().phone
      );
      console.log("booked: ", booked);
      if (isBookedModel(booked)) {
        bookedArr.push(booked);
      }
    });
    return bookedArr;
  } catch (error) {
    return null;
  }
}

const getAll = async () => {
  console.log("Booking services ----GET ALL");
  const aviableDates: AviableBookingModel[] = [];
  const querySnapshot = await getDocs(collection(db, "BookingAviable"));
  querySnapshot.forEach((doc) => {
    let aviableDate = new AviableBookingModel(
      doc.data().bookingDate.toDate(),
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

const isSameDate = (date1: Date, date2: Date) => {
  if (date1.getTime() === date2.getTime()) {
    return true;
  } else return false;
};

const isPastDate = (date1: Date) => {
  if (date1.setHours(0, 0, 0, 0) < initial.setHours(0, 0, 0, 0)) {
    return true;
  } else return false;
};

const parseTime = (time: string) => {
  const timeSplitArr: string[] = time.split(":");
  const hours: number = parseInt(timeSplitArr[0]);
  const minutes: number = parseInt(timeSplitArr[1]);
  return { hours, minutes };
};

const timeToString = (time: Date) => {
  let timeStr: string = "";
  let minutes: string = "";
  let hours: string = "";
  if (time.getMinutes() === 0) {
    minutes = "00";
  } else minutes = time.getMinutes().toString();
  if (time.getHours() < 10) {
    hours = "0" + time.getHours().toString();
  } else {
    hours = time.getHours().toString();
  }
  timeStr = hours + ":" + minutes;
  return timeStr;
};

const timeToStringUndefinied = (time?: Date) => {
  let timeStr: string = "";
  let minutes: string | undefined = "";
  if (time?.getMinutes() === 0) {
    minutes = "00";
  } else minutes = time?.getMinutes().toString();
  timeStr = time?.getHours().toString() + ":" + minutes;
  if (time === undefined) {
    time = new Date(0, 0, 0, 0);
  }
  return timeStr;
};

function isBookingModel(
  bookingModel: any
): bookingModel is AviableBookingModel {
  return "date" in bookingModel && "location" in bookingModel;
}

function isBookedModel(bookingModel: any): bookingModel is BookedModel {
  return (
    "date" in bookingModel &&
    "location" in bookingModel &&
    "name" in bookingModel &&
    "email" in bookingModel &&
    "phone" in bookingModel
  );
}

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
  console.log(cabinet, date);
  try {
    const allAviableDates: AviableBookingModel[] = await getAll();
    console.log("try", allAviableDates);
    allAviableDates.forEach((bs) => {
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
  addAviableBooking,
  getAll,
  getByDate,
  getByDateByCabinet,
  saveBooking,
  getAllBooked,
  parseTime,
  timeToString,
  timeToStringUndefinied,
  isSameDate,
  isPastDate,
};
