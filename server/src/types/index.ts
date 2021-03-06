import { Collection, ObjectId } from "mongodb";

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE"
}

export enum ListingFilters {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGH",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW"
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
  authorized?: boolean;
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
  authorized?: boolean;
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

export interface Viewer {
  readonly _id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly walledId?: string;
  readonly didRequest: boolean;
}

export interface LoginArgs {
  readonly input: { code: string } | null;
}

export interface LoginDataProps {
  readonly id?: string;
  readonly token?: string;
  readonly avatar?: string;
  readonly hasWallet: boolean;
  readonly didRequest: boolean;
}

export interface LoginProps {
  readonly login: LoginDataProps;
}

export interface AuthUrlProps {
  readonly authUrl: string;
}

export interface UserArgs {
  readonly id: string;
}

export interface UserBookingArgs {
  readonly limit: number;
  readonly page: number;
}

export interface UserBookingData {
  readonly total: number;
  readonly result: Booking[];
}

export interface UserListingsArgs {
  readonly limit: number;
  readonly page: number;
}

export interface UserListingsData {
  readonly total: number;
  readonly result: Listing[];
}

export interface ListingArgs {
  readonly id: string;
}

export interface ListingBookingsArgs {
  readonly limit: number;
  readonly page: number;
}

export interface ListingBookingsData {
  readonly total: number;
  readonly result: Booking[];
}

export interface ListingsArgs {
  readonly location: string | null;
  readonly filter: ListingFilters;
  readonly limit: number;
  readonly page: number;
}

export interface ListingsData {
  readonly total: number;
  readonly result: Listing[];
}

export interface ListingsQuery {
  country?: string;
  admin?: string;
  city?: string;
}

export interface ConnectStripeArgs {
  readonly input: { readonly code: string };
}

export interface HostListingData {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly type: ListingType;
  readonly address: string;
  readonly price: number;
  readonly numOfGuests: number;
}

export interface HostListingInput {
  readonly input: HostListingData;
}
