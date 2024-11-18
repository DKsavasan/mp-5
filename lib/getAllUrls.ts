import getCollection, { URLS_COLLECTION } from '@/db';
import { UrlProps } from '@/types';

export default async function getAllUrls(): Promise<UrlProps[]> {
  const urlsCollection = await getCollection(URLS_COLLECTION);
  const data = await urlsCollection.find().toArray();

  const urls: UrlProps[] = data.map((p) => ({
    id: p._id.toHexString(),
    alias: p.alias,
    url: p.url,
    oldurl: p.oldurl,
  }));

  return urls.reverse();
}
