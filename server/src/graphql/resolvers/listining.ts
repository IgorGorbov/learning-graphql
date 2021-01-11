import { Request } from "express";
import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";

import {
  Database,
  HostListingData,
  HostListingInput,
  Listing,
  ListingArgs,
  ListingBookingsArgs,
  ListingFilters,
  ListingsArgs,
  ListingsQuery,
  ListingType
} from "../../types";
import { authorize } from "../../utils";
import { Google } from "../../utils/google";

const verifyHostListingInput = ({ title, description, type, price }: HostListingData) => {
  if (title.length > 100) {
    throw new Error("listing title must be under 100 characters");
  }
  if (description.length > 5000) {
    throw new Error("listing description must be under 5000 characters");
  }
  if (type !== ListingType.Apartment && type !== ListingType.House) {
    throw new Error("listing type must be either an apartment or house");
  }
  if (price < 0) {
    throw new Error("price must be greater than 0");
  }
};

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
    Mutation: {
      hostListing: async (
        _root: undefined,
        { input }: HostListingInput,
        { req, db }: { req: Request; db: Database }
      ) => {
        verifyHostListingInput(input);

        let viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error("viewer cannot be found");
        }

        const { country, admin, city } = await Google.geocode(input.address);
        if (!country || !admin || !city) {
          throw new Error("invalid address input");
        }

        // const imageUrl = await Cloudinary.upload(input.image);

        const insertResult = await db.listings.insertOne({
          _id: new ObjectId(),
          ...input,
          image: "",
          bookings: [],
          bookingsIndex: {},
          country: country,
          admin: admin,
          city: city,
          host: viewer._id
        });

        const insertedListing: Listing = insertResult.ops[0];

        await db.users.updateOne({ _id: viewer._id }, { $push: { listings: insertedListing._id } });

        return insertedListing;
      }
    },
    listings: async (_root: undefined, { location, filter, page, limit }: ListingsArgs, { db }: { db: Database }) => {
      try {
        const query: ListingsQuery = location ? await Google.geocode(location) : {};

        const region = [query.city, query.admin, query.country].filter(Boolean).join(",");

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

        return { total: total, result: result, region: region };
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
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
};
