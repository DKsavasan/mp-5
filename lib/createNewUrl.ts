import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlProps } from "@/types";

export default async function createNewUrl(
  alias: string,
  url: string,
  oldurl: string
): Promise<UrlProps | "ALIAS_EXISTS" | null> {
  const urlsCollection = await getCollection(URLS_COLLECTION);

  // Check if alias already exists
  const existing = await urlsCollection.findOne({ alias });
  if (existing) {
    return "ALIAS_EXISTS";
  }

  const p = {
    alias: alias,
    url: url,
    oldurl: oldurl,
  };

  const res = await urlsCollection.insertOne(p);

  if (!res.acknowledged) {
    return null;
  }

  return { ...p, id: res.insertedId.toHexString() };
}
