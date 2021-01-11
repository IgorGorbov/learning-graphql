import { gql } from "apollo-server-express";

export const typeDefs = gql`
  enum ListingType {
    APARTMEN
    HOUSE
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType
    address: String!
    country: String!
    city: String!
    admin: String!
    price: Int!
    numOfGuests: Int!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
  }

  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  type Listings {
    region: String
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings
  }

  input LoginInput {
    code: String!
  }

  input LoginInput {
    code: String!
  }
  input ConnectStripeInput {
    code: String!
  }

  input HostListingInput {
    title: String!
    description: String!
    image: String!
    type: ListType!
    address: String!
    proce: Int!
    numOfGuests: Int!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(filter: ListingsFilter!, limit: Int!, page: Int!): Listings!
  }

  type Mutation {
    login(input: LoginInput): Viewer!
    logout: Viewer!
    connectStripe(input: ConnectStripeInput): Viewer!
    disconnectStripe: Viewer!
    hostListing(input: HostListingInput): Listing!
  }
`;
