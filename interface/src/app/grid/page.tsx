"use client";

import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import crypto from "crypto";

const TerminalPage: NextPage = () => {
  const [numOfTerminals, setNumOfTerminals] = useState<number>(0);
  const terminalRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const terminals = terminalRefs.current.map((terminalRef, index) => {
      if (terminalRef) {
        const term = new Terminal({
          cursorBlink: true,
          theme: {
            background: "black",
            foreground: "white",
          },
        });

        term.open(terminalRef);
        term.write("> Welcome to the terminal!\r\n");

        return term;
      }
      return null;
    });

    return () => {
      terminals.forEach((term) => term?.dispose());
    };
  }, [numOfTerminals]);

  useEffect(() => {
    const crypto = require("crypto");
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      try {
        console.log("Received token:", token); // Log to check if the token is received properly

        const algorithm = "aes-256-cbc";
        const secretKey = crypto
          .createHash("sha256")
          .update("yourSecretKey")
          .digest(); // Ensure key is 32 bytes

        const iv = Buffer.from(token.slice(0, 32), "hex"); // Extract IV (first 32 hex characters = 16 bytes)
        const encryptedData = token.slice(32); // The rest is the encrypted data

        console.log("Extracted IV:", iv);
        console.log("Encrypted data:", encryptedData);

        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");

        setNumOfTerminals(parseInt(decrypted, 10)); // Decrypted value is your numOfTerminals
      } catch (error) {
        console.error("Invalid token or decryption failed.", error);
      }
    } else {
      console.error("Token not found in the URL.");
    }
  }, []);

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: 2,
      }}
    >
      {Array.from({ length: numOfTerminals }).map((_, index) => (
        <Box
          key={index}
          ref={(el) => {
            terminalRefs.current[index] = el as HTMLDivElement | null;
          }}
        />
      ))}
    </Grid>
  );
};

export default TerminalPage;
