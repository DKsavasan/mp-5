// app/[alias]/page.tsx
import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

export default async function AliasPage({
  params,
}: {
  params: { alias: string };
}) {
  const { alias } = params;
  const urlData = await getUrlByAlias(alias);

  if (urlData) {
    // Redirect to the original URL
    redirect(urlData.url);
    return null; // Return null after redirecting
  } else {
    // Handle alias not found
    return (
      <div>
        <h1>Alias not found</h1>
      </div>
    );
  }
}
