import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Lock, Delete } from "@material-ui/icons";
import { ProfileCard } from "../components";
import { useAuth } from "../providers/Auth";

export const Account = () => {
  const { user } = useAuth();

  if (user)
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <ProfileCard user={user} />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <Card>
            <CardHeader title="Einstellungen" />
            <CardContent>
              <FormControl style={{ width: "100%", marginBottom: "32px" }}>
                <InputLabel id="language">Sprache</InputLabel>
                <Select labelId="language" value={"Deutsch"}>
                  <MenuItem value={"Deutsch"}>Deutsch</MenuItem>
                  <MenuItem>Englisch</MenuItem>
                  <MenuItem disabled>Spanisch</MenuItem>
                </Select>
              </FormControl>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Benachrichtigungs-Mails"
                />
              </FormGroup>
              <Button
                style={{ width: "100%", marginTop: "32px" }}
                variant="contained"
                color="primary"
                startIcon={<Lock />}
              >
                Passwort ändern
              </Button>
              <Button
                style={{ width: "100%", marginTop: "16px" }}
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
              >
                Konto löschen
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4} xl={6}></Grid>
      </Grid>
    );
  else return null;
};

export default Account;
