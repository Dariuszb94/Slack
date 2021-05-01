import React from "react";

import { QueryContextProvider } from "../context/query-context";

export default function CounterView() {
  return (
    <QueryContextProvider>
      <h3>Counter</h3>
    </QueryContextProvider>
  );
}
