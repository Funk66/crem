import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { auth } from "../../providers/firebase";
import { Route } from "../../constants";

export const SignOut = () => {
  const history = useHistory();

  const onClick = () => {
    auth.signOut().then(() => history.push(Route.SignIn));
  };

  return (
    <Button
      type="button"
      color="secondary"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      Abmelden
    </Button>
  );
};

export default SignOut;
