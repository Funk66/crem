import { useEffect, useState, useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pages from "./pages";
import { AuthContext, User } from "./providers/Auth";
import * as routes from "./constants/routes";
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
              <PrivateRoute exact path={routes.HOME} component={pages.Home} />
              <PrivateRoute
                exact
                path={routes.ACCOUNT}
                component={pages.Account}
              />
              <PrivateRoute
                exact
                path={routes.SKILLS}
                component={pages.Skills}
              />
              <PrivateRoute exact path={routes.TEAM} component={pages.Team} />
              <PrivateRoute
                exact
                path={routes.SEARCH}
                component={pages.Search}
              />
              <PrivateRoute
                exact
                path={routes.SETTINGS}
                component={pages.Settings}
              />
            </main>
          </div>
          <PublicRoute exact path={routes.SIGN_IN} component={pages.SignIn} />
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("root"));
