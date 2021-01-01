import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

const Loading = () => {
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
  );
};

export default Loading;
