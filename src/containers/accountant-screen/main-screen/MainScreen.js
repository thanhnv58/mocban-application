import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import { getNotificationOfAccountant } from "./../../../actions/accountant/main-screen-action/actions";
import styles from "./styles";
import SecurityIcon from "@material-ui/icons/Security";
import { NavLink } from "react-router-dom";
import InOutAmountChartByYearComponent from "../../../components/statistic/InOutAmountChartByYearComponent";

class MainScreen extends Component {
  componentDidMount() {
    let { getNotificationOfAccountant, notificationAccountant } = this.props;

    if (notificationAccountant === null) {
      getNotificationOfAccountant();
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid item xs={12} lg={12}>
            {this.renderNotification()}
          </Grid>
          <Grid item xs={12} lg={12}>
            <InOutAmountChartByYearComponent />
          </Grid>
        </Grid>

        <Copyright />
      </React.Fragment>
    );
  }

  renderNotification = () => {
    let { classes, notificationAccountant, isLoading1 } = this.props;

    return (
      <Box mr={2}>
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
                {isLoading1 && (
                  <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                  </Box>
                )}

                {notificationAccountant && (
                  <React.Fragment>
                    {notificationAccountant.numberOfTransactionNeedValidate >
                      0 && (
                      <React.Fragment>
                        <Typography variant="body1">
                          <b>{`Bạn có ${notificationAccountant.numberOfTransactionNeedValidate} giao dịch cần xác nhận!`}</b>
                        </Typography>
                        <Box mt={1} display="flex" justifyContent="center">
                          <NavLink
                            to={`/accountant/validate-transaction`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<SecurityIcon />}
                            >
                              Tới Xác thực giao dịch
                            </Button>
                          </NavLink>
                        </Box>
                      </React.Fragment>
                    )}

                    {notificationAccountant.numberOfTransactionNeedValidate ===
                      0 && (
                      <React.Fragment>
                        <Typography variant="body1">
                          <b>{`Bạn không có giao dịch cần xác nhận!`}</b>
                        </Typography>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  };
}

const mapStateToProps = state => ({
  isLoading1: state.accountantReducer.ui.isLoading1,
  notificationAccountant: state.accountantReducer.notificationAccountant
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNotificationOfAccountant }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(MainScreen);
