export default class BookedModel {
  date: Date;
  location: string;
  name: string;
  email: string;
  phone: number;
  constructor(
    date: Date,
    location: string,
    name: string,
    email: string,
    phone: number
  ) {
    this.date = date;
    this.location = location;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}
