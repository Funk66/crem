import { ElementType } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
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
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={Path.SignIn} />
      }
    />
  );
};

export default PrivateRoute;
