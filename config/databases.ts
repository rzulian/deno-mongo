import { MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

const db = client.database("deno");

// Defining schema interface
interface UserSchema {
  _id: { $oid: string };
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

const users = db.collection<UserSchema>("users");

export {db, users};
