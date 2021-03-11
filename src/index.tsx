import { useEffect, useState, useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pages from "./pages";
import { AuthContext, User } from "./providers/Auth";
import { Route } from "./constants";
import { PublicRoute, PrivateRoute, SideBar } from "./components";
import { auth } from "./providers/firebase";

const useStyles = makeStyles((theme) => ({
  root: { display: "flex" },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const classes = useStyles();
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
  } as User);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("email", JSON.stringify(user.email));
        setUser({ email: user.email });
      } else {
        localStorage.removeItem("email");
        setUser({});
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={user}>
        <BrowserRouter>
          <div className={classes.root}>
            <SideBar hidden={!user.email} />
            <main className={classes.content}>
              <PrivateRoute exact path={Route.Home} component={pages.Home} />
              <PrivateRoute
                exact
                path={Route.Account}
                component={pages.Account}
              />
              <PrivateRoute
                exact
                path={Route.Skills}
                component={pages.Skills}
              />
              <PrivateRoute exact path={Route.Team} component={pages.Team} />
              <PrivateRoute exact path={Route.Team} component={pages.Search} />
              <PrivateRoute
                exact
                path={Route.Settings}
                component={pages.Settings}
              />
            </main>
          </div>
          <PublicRoute exact path={Route.SignIn} component={pages.SignIn} />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("root"));
