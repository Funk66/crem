import { useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { HomePage, SignInPage } from "./pages";
import { firebase, FirebaseContext } from "./providers/firebase";
import * as routes from "./constants/routes";

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
  [];

  return (
    <FirebaseContext.Provider value={{ 'auth': firebase.auth }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Route exact path={routes.HOME} component={HomePage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
}

render(<App />, document.getElementById("root"));
