// @flow
import React, { useState, useEffect } from "react";
import { Box, Button, Menu, MenuItem, Tooltip } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const options = ["Copy Message", "Copy log as JSON"];

const LogViewerTableActionButtons = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [row, setRow] = useState(-1);
  const [log, setLog] = useState({});

  useEffect(() => {
    setRow(props.row);
    setLog(props.log);
  }, [props]);

  const handleMenuItemClick = (_, index) => {
    setAnchorEl(null);

    if (options[index] === "Copy Message") {
      navigator.clipboard.writeText(log.message);
    } else if (options[index] === "Copy log as JSON") {
      navigator.clipboard.writeText(JSON.stringify(log));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title={"More"} placement="bottom">
        <Button onClick={handleClick}>
          <MoreVert></MoreVert>
        </Button>
      </Tooltip>
      <Menu
        id="more-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={row === index}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LogViewerTableActionButtons;
