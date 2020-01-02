import { CssBaseline, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { compose } from "redux";
import Copyright from "../../../components/Copyright";
import Statistic from "../../../components/statistic/Statistic";
import Notification from "./../../../components/notification/Notification";
import styles from "./styles";

class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid item xs={12} lg={8}>
            <Notification />
          </Grid>
          <Grid item xs={12} lg={8}>
            <Statistic />
          </Grid>
        </Grid>

        <Copyright />
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({}, dispatch);
// };

// const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(MainScreen);
