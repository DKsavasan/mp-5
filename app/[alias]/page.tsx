import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

export default async function AliasPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const resolvedParams = await params;
  const { alias } = resolvedParams;
  const urlData = await getUrlByAlias(alias);

  if (urlData) {
    redirect(urlData.url);
    return null;
  } else {
    return (
      <div>
        <h1>Alias not found</h1>
      </div>
    );
  }
}
