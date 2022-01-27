export default class AviableBookingModel {
  date: Date;
  location: string;
  constructor(date: Date, location: string) {
    this.date = date;
    this.location = location;
  }
}
