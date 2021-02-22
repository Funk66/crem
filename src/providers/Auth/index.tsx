import { createContext, Dispatch, SetStateAction } from "react";

export interface User {
  email?: string;
}

export interface Auth {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

export const AuthContext = createContext({} as Auth);
