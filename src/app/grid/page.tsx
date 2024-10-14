"use client";

import { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

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
    const numOfTerminalsParam = new URLSearchParams(window.location.search).get(
      "numOfTerminals"
    );
    if (numOfTerminalsParam) {
      setNumOfTerminals(parseInt(numOfTerminalsParam, 10));
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
