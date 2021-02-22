import { ElementType, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../providers/Auth";
import { HOME } from "../../constants/routes";

interface PublicRouteProps {
  component: ElementType;
  exact: boolean;
  path: string;
}

export const PublicRoute = ({
  component: Component,
  ...rest
}: PublicRouteProps) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={HOME} /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
