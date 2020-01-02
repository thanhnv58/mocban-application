import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

class Copyright extends Component {
  render() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mocban.com.vn/">
          {"Mộc Bản-" + new Date().getFullYear() + "."}
        </Link>
      </Typography>
    );
  }
}

export default Copyright;
