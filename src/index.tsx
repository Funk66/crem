import { useState, useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as pages from "./pages";
import { AuthContext, User } from "./providers/Auth";
import * as routes from "./constants/routes";
import { PublicRoute, PrivateRoute } from "./components";

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
  const [user, setUser] = useState<User>();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div>
            <PrivateRoute exact path={routes.HOME} component={pages.Home} />
            <PublicRoute exact path={routes.SIGN_IN} component={pages.SignIn} />
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

render(<App />, document.getElementById("root"));
