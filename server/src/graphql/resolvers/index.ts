import merge from "lodash.merge";

import { userResolvers } from "./user";
import { bookingResolvers } from "./booking";
import { listingResolvers } from "./listining";

export const resolvers = merge(userResolvers, listingResolvers, bookingResolvers);
