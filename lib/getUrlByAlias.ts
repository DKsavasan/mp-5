import getCollection, { URLS_COLLECTION } from "@/db";
import { UrlProps } from "@/types";

export default async function getUrlByAlias(
  alias: string
): Promise<UrlProps | null> {
  const urlsCollection = await getCollection(URLS_COLLECTION);
  const data = await urlsCollection.findOne({ alias });

  if (!data) {
    return null;
  }

  const url: UrlProps = {
    id: data._id.toHexString(),
    alias: data.alias,
    url: data.url,
    oldurl: data.oldurl,
  };

  return url;
}
