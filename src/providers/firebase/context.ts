import { createContext } from "react";

export interface Firebase {
  auth: any;
  db?: any;
}

const defaultFirebase: Firebase = {auth: null}
export const FirebaseContext = createContext<Firebase>(defaultFirebase);
