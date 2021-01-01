// @flow
import React from "react";
import { Route } from "react-router-dom";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import LinearProgress from "@material-ui/core/LinearProgress";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => (
        <div style={{ width: "100%", margin: "0 auto" }}>
          <LinearProgress />
          <LinearProgress color="secondary" />
        </div>
      ),
    })}
    {...args}
  />
  // <Route component={component} {...args} />
);

export default ProtectedRoute;
