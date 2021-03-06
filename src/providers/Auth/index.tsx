import {
  ReactNode,
  useEffect,
  useState,
  useContext,
  createContext,
} from "react";
import firebase from "firebase/app";
import { auth, firestore } from "../firebase";

interface Superior {
  email: string;
  name: string;
}

export interface User extends Superior {
  id: string;
  location: string;
  avatar?: string;
  superior?: Superior;
}

export interface Auth {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const usersDB = firestore
    .collection("orgs")
    .doc("LDIL1mGQtVCXwADzl9BQ")
    .collection("users");

  const newUser = (user: firebase.User) => {
    usersDB
      .doc(user.uid)
      .get()
      .then((userRef) => {
        const userData = userRef.data();
        if (userData && user.email && user.displayName) {
          const appUser = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            location: userData.location,
            avatar:
              "https://firebasestorage.googleapis.com/v0/b/crem21.appspot.com/o/avatars%2F05OP8SxUgJO5lefxH0bJUSJs8Rq2.jpg?alt=media&token=2888aee6-5c6c-4e1b-9d60-a0dd95ec1649",
            superior: { name: "Sofia Graf", email: "graf@crinnova.de" },
          } as User;
          setUser(appUser);
          //if (userData.superior) {
          //userData.superior.get().then((superiorRef: any) => {
          //superiorRef.data().then((superior: Superior) => {
          //appUser.superior = superior;
          //setUser(appUser);
          //});
          //});
          //} else setUser(appUser);
        }
      });
  };

  const signIn = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      if (response.user) {
        const appUser = {
          id: response.user.uid,
          email: response.user.email,
          name: "Robert Landeck",
          location: "Berlin",
          avatar:
            "https://firebasestorage.googleapis.com/v0/b/crem21.appspot.com/o/avatars%2F05OP8SxUgJO5lefxH0bJUSJs8Rq2.jpg?alt=media&token=2888aee6-5c6c-4e1b-9d60-a0dd95ec1649",
          superior: { name: "Sofia Graf", email: "graf@crinnova.de" },
        } as User;
        setUser(appUser);
      }
      //newUser(response.user);
    });
  };

  const signOut = () => auth.signOut();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        newUser(user);
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    });
  }, []);

  return { user, signIn, signOut };
}

const authContext = createContext({} as Auth);

export function ProvideAuth({ children }: { children: ReactNode }) {
  return (
    <authContext.Provider value={useProvideAuth()}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return useContext(authContext);
}
