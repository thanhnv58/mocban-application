import { CssBaseline, Grid, Button, Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import styles from "./styles";
import { connect } from "react-redux";
import NewClientChartByYearComponent from "../../../components/statistic/NewClientChartByYearComponent";
import InOutAmountChartByYearComponent from "../../../components/statistic/InOutAmountChartByYearComponent";
import { getNewClientOfYear } from "./../../../actions/statistic-action/actions";
import StoreIcon from "@material-ui/icons/Store";
import EuroIcon from "@material-ui/icons/Euro";
import { NavLink } from "react-router-dom";

class MainScreen extends Component {
  render() {
    let { isLoading2, getNewClientOfYear } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {this.renderSwitchRole()}
          </Grid>

          <Grid item xs={12} lg={12}>
            <InOutAmountChartByYearComponent />
          </Grid>
          <Grid item xs={12} lg={12}>
            <NewClientChartByYearComponent
              isLoading={isLoading2}
              getDataFromServer={getNewClientOfYear}
            />
          </Grid>
        </Grid>

        <Copyright />
      </React.Fragment>
    );
  }

  renderSwitchRole = () => {
    return (
      <Box mt={3} mr={2} mb={3}>
        <Typography variant="h6" align="left">
          Chuyển đổi chức năng
        </Typography>

        <Box mt={2}></Box>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <NavLink
              to={`/accountant/home`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<EuroIcon />}
                style={{ backgroundColor: "#0288d1" }}
              >
                Kế toán
              </Button>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink
              to={`/sale/home`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<StoreIcon />}
                style={{ backgroundColor: "#0288d1" }}
              >
                Bán hàng
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Box>
    );
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = state => ({
  isLoading2: state.statisticReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNewClientOfYear }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withMyStyle, connectRedux)(MainScreen);
