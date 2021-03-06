import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  Email,
  Person,
  SupervisorAccount,
  LocationCity,
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
      <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
        <Card>
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image="https://media-exp1.licdn.com/dms/image/C4D03AQHK7wSHlmbY1w/profile-displayphoto-shrink_400_400/0/1516502936524?e=1619654400&v=beta&t=0pQ5hnPuwi6GXsMvB4fCP525UpdNq_4hHzJ2k_VNaWA"
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
      <Grid item xs={12} sm={4} md={6} lg={6} xl={9}></Grid>
    </Grid>
  );
};

export default Account;
