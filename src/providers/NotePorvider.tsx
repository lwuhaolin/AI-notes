"use client";

import React, { createContext, useState } from "react";

type NotePorviderContextType = {
  noteText: string;
  setnoteText: (noteTest: string) => void;
};

export const NoteProviderContext = createContext<NotePorviderContextType>({
  noteText: "",
  setnoteText: () => {},
});

function NoteProvider({ children }: { children: React.ReactNode }) {
  const [noteText, setnoteText] = useState("");
  return (
    <NoteProviderContext.Provider value={{ noteText, setnoteText }}>
      {children}
    </NoteProviderContext.Provider>
  );
}

export default NoteProvider;