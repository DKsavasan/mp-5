// app/api/urls/route.ts
import { NextResponse } from "next/server";
import createNewUrl from "@/lib/createNewUrl";

export async function POST(request: Request) {
  const { alias, url, oldurl } = await request.json();

  if (!alias || !url) {
    return NextResponse.json(
      { error: "Alias and URL are required" },
      { status: 400 }
    );
  }

  // Enhanced URL Validation
  try {
    const parsedUrl = new URL(url);

    // Check if the protocol is either http: or https:
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return NextResponse.json(
        { error: "Invalid URL protocol" },
        { status: 400 }
      );
    }

    // Optionally, check if the hostname is valid (this will catch URLs without a hostname)
    if (!parsedUrl.hostname) {
      return NextResponse.json(
        { error: "Invalid URL hostname" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  const result = await createNewUrl(alias, url, oldurl);

  if (result === "ALIAS_EXISTS") {
    return NextResponse.json(
      { error: "Alias already exists" },
      { status: 400 }
    );
  }

  if (!result) {
    return NextResponse.json(
      { error: "Failed to create URL" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "URL created", data: result });
}
