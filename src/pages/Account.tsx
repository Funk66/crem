import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  Email,
  Person,
  SupervisorAccount,
  LocationCity,
  Lock,
  Delete,
} from "@material-ui/icons";

const userInfo = [
  {
    entry: "Email",
    value: "rlandeck@crinnova.de",
    Icon: Email,
  },
  {
    entry: "Role",
    value: "Manager",
    Icon: Person,
  },
  {
    entry: "Vorgesetzter",
    value: "Richard Lambrech",
    Icon: SupervisorAccount,
  },
  {
    entry: "Standort",
    value: "Berlin",
    Icon: LocationCity,
  },
];

export const Account = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image="https://media-exp1.licdn.com/dms/image/C4D03AQHK7wSHlmbY1w/profile-displayphoto-shrink_800_800/0/1516502936524?e=1626307200&v=beta&t=38GAkjCM0OUW5buR-Yq3um6YeRLW84DrNKEsKc31h7Q"
            title="profile"
          />
          <CardContent>
            <List>
              <ListItem key={1}>
                <Typography variant="h4">Robert Landeck</Typography>
              </ListItem>
              {userInfo.map(({ entry, value, Icon }) => (
                <ListItem key={entry}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={value}
                    secondary={entry}
                  ></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4} xl={3}>
        <Card>
          <CardHeader title="Einstellungen" />
          <CardContent>
            <FormControl style={{ width: "100%", marginBottom: "32px"}}>
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
};

export default Account;
