import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { compose } from "redux";
import styles from "./styles";

class Forbidden extends Component {
  render() {
    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center" spacing={4}>
          <Grid item lg={6} xs={12}>
            <div className={classes.content}>
              <Typography variant="h1">
                403: There is no way Immma let you pass through!
              </Typography>
              <Typography variant="subtitle2">
                Bạn không có quyền làm việc này đâu, đừng cố gắng quá làm gì
                !!!!!
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(Forbidden);
