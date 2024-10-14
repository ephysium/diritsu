"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Box, TextField, Button } from "@mui/material";

const ConfigurationPage: NextPage = () => {
  const [numOfTerminals, setNumOfTerminals] = useState<number>(1);
  const router = useRouter();

  const handleConfigure = () => {
    if (numOfTerminals > 0) {
      router.push(`/grid?numOfTerminals=${numOfTerminals}`);
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
