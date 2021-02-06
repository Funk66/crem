import { useContext } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { FirebaseContext } from "../../providers/firebase";
import * as routes from "../../constants/routes";

export default () => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);

  const onClick = () => {
    firebase.auth.signOut();
    history.push(routes.SIGN_IN);
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
