import { Box, CssBaseline, Divider, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as timeUtils from "../../utils/timeUtils";
import styles from "./styles";

class Notification extends Component {
  render() {
    let { classes } = this.props;
    let project = {};

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Thông báo</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <Box ml={2} mr={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Đang suy nghĩ`} <b>{`.....`}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Ngày bắt đầu: `}
                      <b>{`${timeUtils.convertFrontEndDateTime(
                        project.startDate
                      )}`}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(Notification);
