import React from "react";
import getAllUrls from "@/lib/getAllUrls";
import CreateUrlForm from "@/components/CreateUrlForm";
import { headers } from "next/headers";
import { Box, Typography, List, ListItem, Link } from "@mui/material";

export default async function Home() {
  const urls = await getAllUrls();

  // Await the headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", my: 4 }}>
      <CreateUrlForm />
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Previously Created URLs
      </Typography>
      <List>
        {urls.map((url) => (
          <ListItem key={url.id} divider>
            <Typography variant="body1">
              <strong>Alias:</strong> {url.alias} &nbsp; | &nbsp;
              <strong>URL:</strong>{" "}
              <Link href={url.url} target="_blank" rel="noopener noreferrer">
                {url.url}
              </Link>{" "}
              &nbsp; | &nbsp;
              <strong>Shortened URL:</strong>{" "}
              <Link
                href={`/${url.alias}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${baseUrl}/${url.alias}`}
              </Link>
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
