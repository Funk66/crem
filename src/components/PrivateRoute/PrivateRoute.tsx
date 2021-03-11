import { ElementType, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/Auth";
import { Route as Path } from "../../constants";

interface PrivateRouteProps {
  component: ElementType;
  exact: boolean;
  path: string;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps) => {
  const user = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.email ? <Component {...props} /> : <Redirect to={Path.SignIn} />
      }
    />
  );
};

export default PrivateRoute;
