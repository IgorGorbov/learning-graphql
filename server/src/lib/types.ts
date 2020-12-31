import { Collection, ObjectId } from "mongodb";

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE"
}

export interface BookingsIndexMonth {
  readonly [key: string]: boolean;
}

export interface BookingsIndexYear {
  readonly [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
  readonly [key: string]: BookingsIndexYear;
}

export interface Listing {
  readonly _id: ObjectId;
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly host: string;
  readonly type: ListingType;
  readonly address: string;
  readonly country: string;
  readonly city: string;
  readonly admin: string;
  readonly price: number;
  readonly numOfGuests: number;
  readonly bookings: ObjectId[];
  readonly bookingsIndex: BookingsIndex;
}

export interface User {
  readonly _id: string;
  readonly token: string;
  readonly name: string;
  readonly avatar: string;
  readonly contact: string;
  readonly walletId?: string;
  readonly income: number;
  readonly bookings: ObjectId[];
  readonly listings: ObjectId[];
}

export interface Booking {
  readonly _id: ObjectId;
  readonly listing: ObjectId;
  readonly tenant: string;
  readonly checkIn: string;
  readonly checkOut: string;
}

export interface Database {
  readonly listings: Collection<Listing>;
  readonly users: Collection<User>;
  readonly booking: Collection<Booking>;
}
