"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const PseudoTerminal: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      setOutput([...output, `> ${input}`]);
      setInput("");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", padding: 2 }}>
      <Box
        sx={{
          width: "75%",
          marginRight: 2,
          bgcolor: "black",
          color: "lime",
          padding: 2,
          overflowY: "auto",
        }}
      >
        {output.map((line, index) => (
          <Typography key={index} fontFamily="monospace">
            {line}
          </Typography>
        ))}
      </Box>
      <Box sx={{ width: "25%", display: "flex", flexDirection: "column" }}>
        <TextField
          value={input}
          onChange={handleInputChange}
          variant="outlined"
          size="small"
          fullWidth
          sx={{ marginBottom: 1 }}
        />
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default PseudoTerminal;
