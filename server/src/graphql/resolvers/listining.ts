import { Request } from "express";
import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";

import { Database, Listing, ListingArgs, ListingBookingsArgs, ListingFilters, ListingsArgs } from "../../types";
import { authorize } from "../../utils";

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (_root: undefined, { id }: ListingArgs, { req, db }: { req: Request; db: Database }) => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });

        const viewer = await authorize(db, req);

        if (viewer?._id === listing?.host) {
          listing!.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`Failed to query listing ${error}`);
      }
    },
    listings: async (_root: undefined, { filter, page, limit }: ListingsArgs, { db }: { db: Database }) => {
      try {
        let cursor = await db.listings.find({});

        if (filter === ListingFilters.PRICE_LOW_TO_HIGH) {
          cursor.sort({ price: 1 });
        }

        if (filter === ListingFilters.PRICE_HIGH_TO_LOW) {
          cursor.sort({ price: -1 });
        }

        cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        const total = await cursor.count();
        const result = await cursor.toArray();

        return { total: total, result: result };
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    },
    Listing: {
      id: (listing: Listing) => {
        return listing._id.toString();
      },
      host: async (listing: Listing, args: {}, { db }: { db: Database }) => {
        try {
          const host = await db.users.findOne({ _id: listing.host });
        } catch (error) {
          throw new Error(`Failed to query host ${error}`);
        }
      },
      bookingsIndex: async (listing: Listing) => {
        return JSON.stringify(listing.bookingsIndex);
      },
      bookings: async (listing: Listing, { limit, page }: ListingBookingsArgs, { db }: { db: Database }) => {
        try {
          if (listing.authorized) {
            let cursor = await db.booking.find({ _id: { $in: listing.bookings } });

            cursor.skip(page > 0 ? (page - 1) * limit : 0);
            cursor = cursor.limit(limit);

            const total = await cursor.count();
            const result = await cursor.toArray();

            return {
              total: total,
              result: result
            };
          }

          return null;
        } catch (error) {
          throw new Error(`Failed to query listing bookings: ${error}`);
        }
      }
    }
  }
};
