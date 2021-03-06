require("dotenv").config();

import express, { Application } from "express";
import CookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";

import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(CookieParser(process.env.SECRET));

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req, res }) => ({ req, res, db })
  });

  server.applyMiddleware({ app, path: "/api" });

  app.listen(process.env.PORT);
};

mount(express())
  .then(() => console.log(`[app] : http://localhost:${process.env.PORT}`))
  .catch((error) => console.error(error));
