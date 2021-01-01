// @flow
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  TableRow,
  TablePagination,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AddAnalyticViewTableActionButtons from "./add_analytic_view_table_action_buttons";

const createData = (viewType, viewName, dateSources, actions, editing) => {
  return { viewType, viewName, dateSources, actions, editing };
};

const columns = [
  { id: "Title", label: "Title" },
  { id: "Type", label: "Type" },
  {
    id: "Data Sources",
    label: "Data Sources",
  },
  {
    id: "Content Type",
    label: "Content Type",
  },
  {
    id: "Actions",
    label: "Actions",
    align: "right",
  },
];

const AnalyticViewTable = (props, ref) => {
  const [editing, setEditing] = useState(false);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(3);

  useEffect(() => {
    setEditing(props.editing);
  }, [props]);

  useImperativeHandle(ref, () => {
    return { addRow: addRow };
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const editHighlightedRow = (row) => {
    setSelectedRow(row);
    setEditing(!editing);
    props.editAction(!editing);
  };

  const [rows, setRows] = useState([
    createData("Bar", "Daily Log Traffic", "Log:Dates, Log:Count"),
    createData("Circle", "Users", "Log:Users"),
    createData("Shape", "Regions", "Log:Region"),
  ]);

  const addRow = (viewType, viewName, dateSources, editing) => {
    const newRow = createData(viewType, viewName, dateSources, editing);
    setRows([newRow].concat(rows));
    setSelectedRow(0);
  };

  const chartTypes = ["Line", "Bar Horizontal", "Bar Vertical", "Pie", "Polar"];
  const logLevels = ["DEBUG", "WARNING", "INFO", "ERROR", "FATAL", "ALL"];
  const chartContentType = ["Quantity", "Time"];

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
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const disabled = selectedRow !== -1 && index !== selectedRow;
              return (
                <TableRow
                  key={row.viewName}
                  style={
                    index === selectedRow
                      ? { backgroundColor: "lightgray" }
                      : {}
                  }
                >
                  <TableCell>
                    <TextField
                      type="text"
                      disabled={disabled || !editing}
                      onChange={(e) => {
                        row.viewName = e.target.value;
                      }}
                      placeholder={row.viewName}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel
                        shrink
                        htmlFor="chart-type-native-label-placeholder"
                      >
                        Chart Type
                      </InputLabel>

                      <NativeSelect
                        disabled={disabled || !editing}
                        onChange={(e) => {}}
                        inputProps={{
                          name: "Chart Type",
                          id: "chart-type-native-label-placeholder",
                        }}
                      >
                        {chartTypes.map((chartType) => {
                          let value = chartType
                            .toLocaleLowerCase()
                            .replace(" ", "-");
                          return (
                            <option key={value} value={value}>
                              {chartType}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="age-native-label-placeholder">
                        Log Level
                      </InputLabel>

                      <NativeSelect
                        disabled={disabled || !editing}
                        onChange={(e) => {}}
                        inputProps={{
                          name: "Log Level",
                          id: "log-level-native-label-placeholder",
                        }}
                      >
                        {logLevels.map((logLevel) => {
                          let value = logLevel.toLocaleLowerCase();
                          return (
                            <option key={value} value={value}>
                              {logLevel}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel shrink htmlFor="age-native-label-placeholder">
                        Content Type
                      </InputLabel>

                      <NativeSelect
                        disabled={disabled || !editing}
                        onChange={(e) => {}}
                        inputProps={{
                          name: "Contet Type",
                          id: "content-type-native-label-placeholder",
                        }}
                      >
                        {chartContentType.map((option) => {
                          let value = option.toLocaleLowerCase();
                          return (
                            <option key={value} value={value}>
                              {option}
                            </option>
                          );
                        })}
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                  <TableCell align="right">
                    <AddAnalyticViewTableActionButtons
                      key={row.viewName + index}
                      disabled={disabled}
                      editAction={editHighlightedRow}
                      editing={editing}
                      index={index}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </TableContainer>
  );
};

export default forwardRef(AnalyticViewTable);
