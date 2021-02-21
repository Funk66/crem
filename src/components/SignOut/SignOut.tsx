import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import { auth } from "../../providers/firebase";
import * as routes from "../../constants/routes";

export default () => {
  const history = useHistory();

  const onClick = () => {
    auth.signOut();
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
