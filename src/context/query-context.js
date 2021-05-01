import React, { useState, createContext } from "react";

// Create Context Object
export const QueryContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const QueryContextProvider = (props) => {
  const [query, setQuery] = useState(0);

  return (
    <QueryContextProvider.Provider value={[query, setQuery]}>
      {props.children}
    </QueryContextProvider.Provider>
  );
};
