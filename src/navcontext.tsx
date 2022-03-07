import { createContext } from "react";

export interface NavigationContextValueType {
  prev?: string;
  next?: string;
}

export const NavigationContext = createContext<NavigationContextValueType>({});
