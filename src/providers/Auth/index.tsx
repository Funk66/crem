import { createContext } from "react";

export interface User {
  email?: string | null;
}

export const AuthContext = createContext({} as User);
