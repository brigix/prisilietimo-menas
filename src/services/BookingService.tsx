import { collection, addDoc, getDocs } from "firebase/firestore";

const add = async (db: any, bookDate: Date, location: string) => {
  const docRef = await addDoc(collection(db, "bookingAviable"), {
    bookingDate: bookDate,
    location: location,
  });
  console.log("doc ref: " + docRef.id);
};

const getAll = async (db: any) => {
  console.log("Booking services ----GET ALL");
  const querySnapshot = await getDocs(collection(db, "BookingAviable"));
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    let date = doc.data().bookDate.toDate();
    console.log(
      `${doc.id} =>  BookDate: ${doc.data().bookDate} 
      Location: ${doc.data().location} ${date}`
    );
  });
};

export const BookingService = {
  add,
  getAll,
};
