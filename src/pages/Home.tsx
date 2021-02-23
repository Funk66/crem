import { useContext } from "react";
import { SignOut } from "../components";
import { AuthContext } from "../providers/Auth";

export const Home = () => {
  const user = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      <p>{JSON.stringify(user)}</p>
      <SignOut />
    </div>
  );
};

export default Home;
