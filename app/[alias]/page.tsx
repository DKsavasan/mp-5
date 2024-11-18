import { redirect } from "next/navigation";
import getUrlByAlias from "@/lib/getUrlByAlias";

interface PageProps {
  params: {
    alias: string;
  };
}

export default async function AliasPage({ params }: PageProps) {
  const { alias } = params;
  const urlData = await getUrlByAlias(alias);

  if (urlData) {
    // Redirect to the original URL
    redirect(urlData.url);
  } else {
    // Handle alias not found
    return (
      <div>
        <h1>Alias not found</h1>
      </div>
    );
  }
}
