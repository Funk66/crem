import { ElementType } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../providers/Auth";
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
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={Path.Home} /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
