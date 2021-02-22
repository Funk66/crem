import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { auth } from "../providers/firebase";
import { AuthContext } from "../providers/Auth";
import * as routes from "../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      background: theme.palette.background.default,
    },
    header: {
      textAlign: "center",
      background: theme.palette.primary.dark,
      color: "#fff",
    },
    card: { margin: theme.spacing(2) },
  })
);

export const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  const { setUser } = useContext(AuthContext);

  const onSubmit = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        if (response.user?.email) {
          setUser({ email: response.user.email });
          history.push(routes.HOME);
          setEmail("");
          setPassword("");
        } else {
          setError("Unbekannter Nutzer");
        }
      })
      .catch((error: any) => {
        setError(error.message);
      });
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <Card elevation={3}>
            <CardHeader className={classes.header} title="CReM" />
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  margin="normal"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                  fullWidth
                  type="password"
                  id="password"
                  label="Passwort"
                  margin="normal"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <Typography style={{ color: "red" }}>{error}</Typography>
            </CardContent>
            <CardActions>
              <Button
                style={{ flexGrow: 1 }}
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                disabled={email === "" || password === ""}
              >
                Einloggen
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  );
};

export default SignIn;
