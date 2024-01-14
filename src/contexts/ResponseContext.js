import { createContext, useState } from "react";

export const ResponseContext = createContext();

export function ResponseProvider({ children }) {
  const [response, setResponse] = useState(false);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
}
