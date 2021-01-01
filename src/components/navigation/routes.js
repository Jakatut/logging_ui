//@flow
import React from "react";
import LogViewer from "../../pages/log_viewer";
import Analytics from "../../pages/analytics";
import Settings from "../../pages/settings";
import ProtectedRoute from "../auth/protected_route";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Routes = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <ProtectedRoute exact path="/" component={() => <LogViewer />} />
      <ProtectedRoute exact path="/analytics" component={() => <Analytics />} />
      <ProtectedRoute exact path="/settings" component={() => <Settings />} />
      <ProtectedRoute exact path="/logviewer" component={() => <LogViewer />} />
    </main>
  );
};

export default Routes;
