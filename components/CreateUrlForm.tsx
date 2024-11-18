"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

export default function CreateUrlForm() {
  const [alias, setAlias] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);

  // Add severity state
  const [severity, setSeverity] = useState<"success" | "error" | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alias, url }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("URL created successfully");
      setSeverity("success"); // Set severity to "success"
      setCreatedUrl(`${window.location.origin}/${alias}`);
      setAlias("");
      setUrl("");
    } else {
      setMessage(data.error || "An error occurred");
      setSeverity("error"); // Set severity to "error"
      setCreatedUrl(null);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create a Shortened URL
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Alias"
          variant="outlined"
          fullWidth
          margin="normal"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          required
        />
        <TextField
          label="URL"
          variant="outlined"
          fullWidth
          margin="normal"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Create
        </Button>
      </form>
      {message && severity && (
        <Alert severity={severity} sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
      {createdUrl && (
        <Typography sx={{ mt: 2 }}>
          Shortened URL:{" "}
          <a href={createdUrl} target="_blank" rel="noopener noreferrer">
            {createdUrl}
          </a>
        </Typography>
      )}
    </Box>
  );
}
