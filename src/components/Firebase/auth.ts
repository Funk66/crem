import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email: string) =>
  auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = async (password: string) => {
  if (auth.currentUser) {
    await auth.currentUser.updatePassword(password);
  }
  throw Error("No auth.currentUser!");
};
