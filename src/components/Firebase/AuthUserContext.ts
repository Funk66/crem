import { createContext } from "react";

interface AuthUser {
  email: string;
}

export const AuthUserContext = createContext<AuthUser | null>(null);
