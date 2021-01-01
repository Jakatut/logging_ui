// @flow
import "./App.css";
import React, { useState } from "react";
import NavigationDrawer from "./components/navigation/navigation_drawer";
import { BrowserRouter as Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./components/loading/loading";
import NavBar from "./components/navigation/nav_bar";
import Routes from "./components/navigation/routes";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
  },
}));

function App() {
  const classes = useStyles();
  const { isLoading } = useAuth0();
  const [navigationDrawerOpen, setNavigationDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setNavigationDrawerOpen(!navigationDrawerOpen);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="App">
      <div>
        <Switch>
          <div className={classes.root}>
            <NavBar handleDrawerToggle={handleDrawerToggle}></NavBar>
            <NavigationDrawer
              handleDrawerToggle={handleDrawerToggle}
              open={navigationDrawerOpen}
              container={window.document.body}
            ></NavigationDrawer>
            <Routes></Routes>
          </div>
        </Switch>
      </div>
    </div>
  );
}

export default App;
