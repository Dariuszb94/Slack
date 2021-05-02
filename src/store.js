// store.js
import React, { createContext, useReducer } from "react";

const initialState = {};
const store = createContext({ color: "black" });
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "action description":
        const newState = state + 1; // do something with the action
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
