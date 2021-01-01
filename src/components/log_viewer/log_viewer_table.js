// @flow
import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TablePagination,
  Box,
  TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import LogViewerTableActionButtons from "./log_viewer_table_action_buttons";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";

const columns = [
  { id: "ID", label: "ID" },
  { id: "Created At", label: "Created At" },
  { id: "Log Level", label: "Log Level" },
  { id: "Message", label: "Message" },
  { id: "Location", label: "Location" },
  { id: "Actions", label: "Actions" },
];

const LogViewerTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(8);
  const [rows, setRows] = useState(undefined);
  const [logCount, setLogCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getAccessTokenSilently } = useAuth0();

  const handleChangePage = (_, newPage) => {
    console.log("pageChange");
    setPage(newPage);
    getRows();
  };

  const createSearchQuery = useCallback(() => {
    let query = "";
    let logLevel = "";
    for (let key in props.filters) {
      if (key === "log_level") {
        // If log level is not provided, don't add the url's forward slash
        if (
          typeof props.filters[key] === "undefined" ||
          props.filters[key] === ""
        ) {
          logLevel = "";
        } else {
          logLevel = "/" + props.filters[key];
        }
      } else if (
        typeof props.filters[key] !== "undefined" &&
        props.filters[key] !== ""
      ) {
        let join = "&";
        join = query.length > 0 ? "&" : "";
        query += join + key + "=" + props.filters[key];
      }
    }

    // add & if not queries were given. Append query if a query was given.
    // these will be used for page & limit.
    if (query.length === 0) {
      query = logLevel + "?";
    } else {
      query = logLevel + "?" + query + "&";
    }
    return query + "page=" + page + "&limit=" + rowsPerPage;
  }, [props, page, rowsPerPage]);

  const getRows = useCallback(async () => {
    setLoading(true);

    const logServiceEndpoint = process.env.REACT_APP_LOGGING_SERCVICE_URL;
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      scope: process.env.REACT_APP_AUTH0_SCOPE,
    });
    const response = await fetch(logServiceEndpoint + createSearchQuery(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const ok = await response.ok;
    if (!ok) {
      setLoading(false);
      setError("Could not get logs. Please try again later.");
    } else {
      const json = await response.json();

      let data = typeof json.data === "undefined" ? [] : json.data;
      let total = typeof json.total === "undefined" ? 0 : json.total;

      setRows(data);
      setLogCount(total);
      setLoading(false);
    }
  }, [createSearchQuery, getAccessTokenSilently]);

  useEffect(() => {
    getRows();
  }, [getRows]);

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading || typeof rows === "undefined" ? (
            <LoadingRow error={error} />
          ) : (
            rows.map((row, index) => {
              return <Row index={index} row={row} key={index}></Row>;
            })
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={logCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </TableContainer>
  );
};

const Row = (props) => {
  const [open, setOpen] = useState(false);
  const expandRow = () => {
    setOpen(true);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {props.row.id}
      </TableCell>
      <TableCell>{props.row.created_at}</TableCell>
      <TableCell scope="row">{props.row.log_level}</TableCell>
      <TableCell>
        <Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            label="Message"
            rows={4}
            variant="outlined"
            value={props.row.message}
            fullWidth
          >
            {props.row.message}
          </TextField>
        </Box>
      </TableCell>
      <TableCell>
        <Box>
          <TextField
            id="outlined-multiline-static"
            multiline
            label="Location"
            rows={4}
            variant="outlined"
            value={props.row.location}
            fullWidth
          >
            {props.row.Location}
          </TextField>
        </Box>
      </TableCell>
      <TableCell>
        <LogViewerTableActionButtons
          copyMessageAction={undefined}
          copyAllAction={undefined}
          row={props.index}
          log={props.row}
          onExpand={expandRow}
          expanded={open}
        />
      </TableCell>
    </TableRow>
  );
};

const LoadingRow = (props) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row"></TableCell>
      <TableCell />
      <TableCell />
      <TableCell>
        {props.error.length === 0 ? <CircularProgress /> : props.error}
      </TableCell>
      <TableCell />
      <TableCell />
    </TableRow>
  );
};

export default LogViewerTable;
