import { IResolvers } from "apollo-server-express";

import { Listing } from "../../types";

export const listingResolvers: IResolvers = {
  Query: {
    listing: "Query.listing"
  },
  Listing: {
    id: (listing: Listing) => {
      return listing._id.toString();
    }
  }
};
