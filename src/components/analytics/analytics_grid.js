// @flow
import React from "react";
import { Grid } from "@material-ui/core";
import AnalyticsCard from "./analytic_card";

const AnalyticsGrid = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xl={4} key={1}>
        <AnalyticsCard
          chartData={{
            labels: ["debug", "warning", "information"],
            title: "Traffic",
            type: "bar-vertical",
            description: "Log Level Counts",
          }}
        ></AnalyticsCard>
      </Grid>
      <Grid item xl={4} key={2}>
        <AnalyticsCard
          chartData={{
            labels: ["debug", "warning", "information"],
            title: "Traffic",
            type: "bar-horizontal",
            description: "Traffic over time",
          }}
        ></AnalyticsCard>
      </Grid>
    </Grid>
  );
};

export default AnalyticsGrid;
