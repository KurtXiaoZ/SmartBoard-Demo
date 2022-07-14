import { createContext } from "react";

// An object that contains all contexts for state management
export const contexts = {
  ItemsContext: createContext(),
  MovementContext: createContext(),
  SelectionContext: createContext(),
  SyncMovContext: createContext(),
}