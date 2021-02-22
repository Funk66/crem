import { ElementType, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/Auth";
import { SIGN_IN } from "../../constants/routes";

interface PrivateRouteProps {
  component: ElementType;
  exact: boolean;
  path: string;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={SIGN_IN} />
      }
    />
  );
};

export default PrivateRoute;
