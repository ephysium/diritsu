"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";
import crypto from "crypto";

const ConfigurationPage: NextPage = () => {
  const [numOfTerminals, setNumOfTerminals] = useState<number>(1);
  const router = useRouter();

  const handleConfigure = () => {
    if (numOfTerminals > 0) {
      const crypto = require("crypto");
      const algorithm = "aes-256-cbc";
      const secretKey = crypto
        .createHash("sha256")
        .update("yourSecretKey")
        .digest(); // Ensure key is 32 bytes
      const iv = crypto.randomBytes(16); // AES requires a 16-byte IV

      const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
      let encrypted = cipher.update(numOfTerminals.toString(), "utf8", "hex");
      encrypted += cipher.final("hex");

      const combined = iv.toString("hex") + encrypted; // Combine IV and encrypted data

      console.log("Encrypted token:", combined); // Log to ensure the combined token is correct

      router.push(`/grid?token=${combined}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField
          id="filled-number"
          label="Number of Terminals"
          type="number"
          variant="filled"
          value={numOfTerminals}
          onChange={(e) => setNumOfTerminals(Number(e.target.value))}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: 1,
            },
          }}
        />
        <Button variant="outlined" onClick={handleConfigure}>
          Configure
        </Button>
      </Box>
    </Box>
  );
};

export default ConfigurationPage;
