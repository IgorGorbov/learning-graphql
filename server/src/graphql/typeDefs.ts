import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  enum ListingType {
    APARTMEN
    HOUSE
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: String!
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

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing: String!
  }

  type Mutation {
    login(input: LoginInput): Viewer!
    logout: Viewer!
  }
`;
