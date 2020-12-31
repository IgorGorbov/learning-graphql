import { Collection, ObjectId } from "mongodb";

export interface Listing {
  readonly _id: ObjectId;
  readonly title: string;
  readonly image: string;
  readonly address: string;
  readonly price: number;
  readonly numOfGuests: number;
  readonly numOfBeds: number;
  readonly numOfBaths: number;
  readonly rating: number;
}

export interface Database {
  readonly listings: Collection<Listing>;
}
