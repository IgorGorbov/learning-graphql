import { IResolvers } from "apollo-server-express";

import { Booking, Database } from "../../types";

export const bookingResolvers: IResolvers = {
  Booking: {
    id: (booking: Booking) => {
      return booking._id.toString();
    },
    listing: (booking: Booking, _args: {}, { db }: { db: Database }) => {
      return db.listings.findOne({ _id: booking.listing });
    }
  }
};
