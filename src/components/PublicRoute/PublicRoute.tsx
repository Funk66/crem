import { ElementType, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/Auth";
import { Route as Path } from "../../constants";

interface PublicRouteProps {
  component: ElementType;
  exact: boolean;
  path: string;
}

export const PublicRoute = ({
  component: Component,
  ...rest
}: PublicRouteProps) => {
  const user = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.email ? <Redirect to={Path.Home} /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
