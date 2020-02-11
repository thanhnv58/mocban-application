import { CssBaseline, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { compose } from "redux";
import Copyright from "../../../components/Copyright";
import CountOrderCharByMonthComponent from "../../../components/statistic/CountOrderCharByMonthComponent";
import NotificationComponent from "./../../../components/notification/NotificationComponent";
import styles from "./styles";
import IncomeCharByYearComponent from "../../../components/statistic/IncomeCharByYearComponent";

class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid item xs={12} lg={12}>
            <NotificationComponent />
          </Grid>
          <Grid item xs={12} lg={12}>
            <CountOrderCharByMonthComponent />
          </Grid>
          <Grid item xs={12} lg={12}>
            <IncomeCharByYearComponent />
          </Grid>
        </Grid>

        <Copyright />
      </React.Fragment>
    );
  }
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(MainScreen);
