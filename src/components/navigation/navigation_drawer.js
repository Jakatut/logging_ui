// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles/";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import BarChartIcon from "@material-ui/icons/BarChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Hidden from "@material-ui/core/Hidden";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const NavigationDrawer = (props) => {
  const { logout, isAuthenticated } = useAuth0();
  const classes = useStyles();

  const drawer = (
    <div>
      <List>
        <Divider />
        <ListItem button key={"LogViewer"} id={"navigation-drawer-LogViewer"}>
          <Link to="/logviewer" className="nav-link">
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary={"LogViewer"} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem button key={"Analytics"} id={"navigation-drawer-Analytics"}>
          <Link to="/analytics" className="nav-link">
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary={"Analytics"} />
          </Link>
        </ListItem>
        <Divider />

        {isAuthenticated ? (
          <ListItem button key={"Logout"} id={"navigation-drawer-Logout"}>
            <Link
              to=""
              className="nav-link"
              onClick={() => {
                logout({
                  returnTo: window.location.origin,
                });
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </Link>
          </ListItem>
        ) : (
          <></>
        )}
        <Divider />
      </List>
    </div>
  );

  // const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          open={props.open}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default NavigationDrawer;
