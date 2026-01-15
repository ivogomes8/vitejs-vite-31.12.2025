import { createContext, useContext, useState } from "react";

const AIContext = createContext(null);

export function AIProvider({ children }) {
  const [plannerContext, setPlannerContext] = useState({
    direction: "",
    destination: "",
    interests: "",
    suggestions: "",
  });

  return (
    <AIContext.Provider value={{ plannerContext, setPlannerContext }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used inside AIProvider");
  }
  return context;
}
