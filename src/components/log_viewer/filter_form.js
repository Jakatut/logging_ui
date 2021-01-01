// @flow
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles/";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  NativeSelect,
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const logLevels = ["ALL", "DEBUG", "WARNING", "ERROR", "FATAL", "INFO"];

const useStyles = makeStyles((theme) => ({
  filterForm: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  filterButton: {
    height: "50px",
    backgroundColor: "#3f51b5",
    color: "white",
  },
  formControl: {
    width: "250px",
  },
}));

const FilterForm = (props) => {
  const classes = useStyles();

  const [logLevel, setLogLevel] = useState("ALL");
  const [ID, setID] = useState("");
  const [location, setLocations] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const createFilter = () => {
    let filters = {};
    if (logLevel === "ALL" || typeof logLevel === "undefined") {
      filters["log_level"] = "";
    } else {
      filters["log_level"] = logLevel;
    }

    if (ID !== "") {
      filters["id"] = ID;
    }
    if (location !== "") {
      filters["location"] = location;
    }
    if (from !== null) {
      const dateValues = paddDateValues(from);
      filters["from"] =
        from.getUTCFullYear() +
        "-" +
        dateValues.month +
        "-" +
        dateValues.date +
        "T" +
        dateValues.hours +
        ":" +
        dateValues.minutes +
        ":00.000Z";
    }
    if (to !== null) {
      const dateValues = paddDateValues(to);
      filters["to"] =
        to.getUTCFullYear() +
        "-" +
        dateValues.month +
        "-" +
        dateValues.date +
        "T" +
        dateValues.hours +
        ":" +
        dateValues.minutes +
        ":00.000Z";
    }

    return filters;
  };

  const paddDateValues = (date) => {
    var month = date.getMonth();
    month = month < 10 ? "0" + month : month;
    var day = date.getDate();
    day = day < 10 ? "0" + day : day;
    var hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return { month: month + 1, date: day, hours: hours, minutes: minutes };
  };

  return (
    <Box className={classes.filterForm}>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Log Level
        </InputLabel>
        <NativeSelect
          value={logLevel}
          onChange={(e) => {
            setLogLevel(e.target.value);
          }}
          inputProps={{
            name: "Log Level",
            id: "log-level-native-label-placeholder",
          }}
        >
          {logLevels.map((level) => {
            return (
              <option key={level} value={level}>
                {level}
              </option>
            );
          })}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="id-outlined-static"
          label="ID"
          variant="outlined"
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          id="location-outlined-static"
          label="Location"
          variant="outlined"
          onChange={(e) => {
            setLocations(e.target.value);
          }}
        />
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl className={classes.formControl}>
          <KeyboardDateTimePicker
            variant="inline"
            label="From"
            value={from}
            onChange={(e) => {
              setFrom(e);
            }}
            format="yyyy-MM-dd hh:mm"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <KeyboardDateTimePicker
            variant="inline"
            label="To"
            value={to}
            onChange={(e) => {
              setTo(e);
            }}
            format="yyyy-MM-dd hh:mm"
          />
        </FormControl>
      </MuiPickersUtilsProvider>
      <FormControl className={classes.formControl}>
        <Button
          className={classes.filterButton}
          onClick={() => {
            const filters = createFilter();
            props.onFilter(filters);
          }}
        >
          Filter
        </Button>
      </FormControl>
    </Box>
  );
};

export default FilterForm;
