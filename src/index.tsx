import { useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pages from "./pages";
import { Route } from "./constants";
import { PublicRoute, PrivateRoute, SideBar } from "./components";
import { ProvideAuth } from "./providers/Auth";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProvideAuth>
        <BrowserRouter>
          <div className={classes.root}>
            <SideBar />
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
              <PrivateRoute
                exact
                path={Route.Search}
                component={pages.Search}
              />
              <PrivateRoute
                exact
                path={Route.Settings}
                component={pages.Settings}
              />
            </main>
          </div>
          <PublicRoute exact path={Route.SignIn} component={pages.SignIn} />
        </BrowserRouter>
      </ProvideAuth>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("root"));
