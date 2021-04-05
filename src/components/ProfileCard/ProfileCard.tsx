import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Email, SupervisorAccount, LocationCity } from "@material-ui/icons";
import { useAuth } from "../../providers/Auth";

export function ProfileCard() {
  const { user, getAvatar } = useAuth();
  const avatar = getAvatar();

  if (user)
    return (
      <Card>
        {avatar ? (
          <CardMedia
            style={{ height: 0, paddingTop: "56.25%" }}
            image={avatar}
            title="avatar"
          />
        ) : null}
        <CardContent>
          <List>
            <ListItem key={1}>
              <Typography variant="h4">{user.name}</Typography>
            </ListItem>
            <ListItem key={"email"}>
              <ListItemIcon>
                <Email />
              </ListItemIcon>
              <ListItemText
                primary={user.email}
                secondary={"Email"}
              ></ListItemText>
            </ListItem>
            {user.superior ? (
              <ListItem key={"superior"}>
                <ListItemIcon>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText
                  primary={user.superior.name}
                  secondary={"Vorgesetzter"}
                ></ListItemText>
              </ListItem>
            ) : null}
            <ListItem key={"location"}>
              <ListItemIcon>
                <LocationCity />
              </ListItemIcon>
              <ListItemText
                primary={user.location}
                secondary={"Standort"}
              ></ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  else return null;
}

export default ProfileCard;
