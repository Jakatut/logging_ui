// @flow
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LogoImage from "../../assets/images/log.png";

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(1, 1, 1, 1),
    width: "150px",
  },
}));

const Logo = (props) => {
  const classes = useStyles();
  return (
    <div>
      <img src={LogoImage} alt="log viewer logo" className={classes.logo}></img>
    </div>
  );
};

export default Logo;
