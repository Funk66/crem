import { useContext } from "react";
import { SignOut } from "../components";
import { AuthContext } from "../providers/Auth";

export const Home = () => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(authContext.user)}</p>
      <SignOut />
    </div>
  );
};

export default Home;
