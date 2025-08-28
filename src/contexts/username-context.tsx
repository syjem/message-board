"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UsernameContextType = {
  username: string;
  setUsername: (name: string) => void;
};

const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => {
  const context = useContext(UsernameContext);

  if (!context) {
    throw new Error("useUsername must be used inside a UsernameProvider");
  }

  return context;
};
