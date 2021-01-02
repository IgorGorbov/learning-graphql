import { MongoClient } from "mongodb";

import { Database } from "../types";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_CLUSTER}`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("main");

  return {
    listings: db.collection("listings"),
    users: db.collection("users"),
    booking: db.collection("booking")
  };
};
