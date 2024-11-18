// db.ts
import { MongoClient, Db, Collection, MongoClientOptions } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "cs391-mp-5";
export const URLS_COLLECTION = "urls-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

// Define MongoClient options with SSL enabled
const options: MongoClientOptions = {
  tls: true,
  // tlsAllowInvalidCertificates: true, // Uncomment if necessary (not recommended for production)
};

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO_URI, options);
    await client.connect();
  }
  return client.db(DB_NAME);
}

export default async function getCollection(
  collectionName: string
): Promise<Collection> {
  if (!db) {
    db = await connect();
  }

  return db.collection(collectionName);
}
