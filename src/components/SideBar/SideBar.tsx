import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  List,
  Drawer,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  ExitToApp,
  People,
  Search,
  Settings,
  Star,
} from "@material-ui/icons";
import { Route } from "../../constants";
import { useAuth } from "../../providers/Auth";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
  },
  toggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5, 0.5, 0, 0.5),
  },
}));

const navButtons = [
  {
    name: "Konto",
    route: "/account",
    Icon: AccountCircle,
  },
  {
    name: "Kompetenzen",
    route: "/skills",
    Icon: Star,
  },
  {
    name: "Team",
    route: "/team",
    Icon: People,
  },
  {
    name: "Suche",
    route: "/search",
    Icon: Search,
    divider: true,
  },
  {
    name: "Einstellungen",
    route: "/settings",
    Icon: Settings,
  },
];

export const SideBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const auth = useAuth();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setSelected(history.location.pathname);
    return history.listen((location) => {
      setSelected(location.pathname);
    });
  }, [history]);

  if (auth.user)
    return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toggle}>
          <IconButton onClick={toggleDrawer}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <List component="nav">
          <Divider />
          {navButtons.map(({ name, route, Icon, divider }) => (
            <ListItem
              button
              key={name}
              onClick={() => history.push(route)}
              selected={selected === route}
              divider={divider}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
          <ListItem
            button
            key={"Ausloggen"}
            onClick={() => auth.signOut().then(() => history.push(Route.SignIn))}
            divider
          >
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Ausloggen" />
          </ListItem>
        </List>
      </Drawer>
    );
  else return null;
};

export default SideBar;
