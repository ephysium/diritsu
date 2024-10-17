"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context and its shape
interface TerminalSetupType {
  count: number;
  increment: () => void;
}

// Create the context
const TerminalSetup = createContext<TerminalSetupType | undefined>(undefined);

// Create the provider component
export const TerminalSetupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <TerminalSetup.Provider value={{ count, increment }}>
      {children}
    </TerminalSetup.Provider>
  );
};

// Custom hook for consuming the context
export const useTerminalSetup = () => {
  const context = useContext(TerminalSetup);
  if (!context) {
    throw new Error("useTerminalSetup must be used within a MyProvider");
  }
  return context;
};
