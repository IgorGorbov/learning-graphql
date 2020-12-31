import { MongoClient } from "mongodb";

import { Database } from "../lib/types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@cluster0.mk4vw.mongodb.net/${process.env.DB_CLUSTER}?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true });
  const db = client.db("main");

  return {
    listings: db.collection("listings")
  };
};
