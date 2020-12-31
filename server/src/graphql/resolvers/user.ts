import { IResolvers } from "apollo-server-express";

export const userResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      return "Query.autUrl";
    }
  },

  Mutation: {
    login: () => {
      return "Mutation.login";
    },
    logout: () => {
      return "Mutation.logout";
    }
  }
};
