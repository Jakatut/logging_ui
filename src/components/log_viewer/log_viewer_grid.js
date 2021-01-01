// @flow
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles/";
import { Box, Paper } from "@material-ui/core";
import LogViewerTable from "./log_viewer_table";
import FilterForm from "./filter_form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
  },
  logsContainer: {
    marginTop: "16px",
  },
  filterContainer: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  dataContainer: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const LogViewerGrid = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState({
    log_level: "",
    id: "",
    location: "",
    created_at: "",
    from: "",
    to: "",
  });

  const updateFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <Box className={classes.container}>
      <div className={classes.root}>
        <Paper className={classes.filterContainer}>
          <FilterForm onFilter={updateFilters}></FilterForm>
        </Paper>
        <Paper className={classes.dataContainer}>
          <LogViewerTable filters={filters}></LogViewerTable>
        </Paper>
      </div>
    </Box>
  );
};

export default LogViewerGrid;
