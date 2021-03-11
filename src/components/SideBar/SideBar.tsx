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
import { auth } from "../../providers/firebase";
import { Route } from "../../constants";

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

interface SideBarProps {
  hidden: boolean;
}

export const SideBar = ({ hidden }: SideBarProps) => {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const signOut = () => {
    auth.signOut().then(() => history.push(Route.SignIn));
  };

  useEffect(() => {
    setSelected(history.location.pathname);
    return history.listen((location) => {
      setSelected(location.pathname);
    });
  }, [history]);

  return hidden ? null : (
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
        <ListItem button key={"Ausloggen"} onClick={signOut} divider>
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Ausloggen" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
