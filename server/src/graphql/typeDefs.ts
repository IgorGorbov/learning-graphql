import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    authUrl: String!
  }

  type Mutation {
    login: String!
    logout: String!
  }
`;
