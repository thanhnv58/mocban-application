import { Box, CircularProgress, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import AccountantScreen from "../accountant-screen/AccountantScreen";
import { actValidateToken } from "./../../actions/common-user-action/actions";
import { helpers_GetLocalToken } from "./../../utils/helpers";
import NotFound from "./../../views/not-found/NotFound";
import DashboardScreen from "../manager-screen/ManagerScreen";
import LoginScreen from "./../common-user/LoginScreen";
import LogoutScreen from "./../common-user/LogoutScreen";
import SaleScreen from "./../sale/SaleScreen";
import styles from "./styles";
import TechnicianScreen from "../technician-screen/TechnicianScreen";
import ManagerScreen from "../manager-screen/ManagerScreen";
import ChangePasswordScreen from "../common-user/ChangePasswordScreen";

class App extends Component {
  componentDidMount() {
    let { isAuthenticated } = this.props;

    let localToken = helpers_GetLocalToken();
    if (localToken && isAuthenticated === null) {
      let { actValidateToken } = this.props;
      actValidateToken();
    }
  }

  render() {
    let { ui_isValidateToken } = this.props;

    // Validating token with local storage
    if (ui_isValidateToken === true) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" m={4}>
              <CircularProgress />;
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <React.Fragment>
          <Switch>
            {routes.map((route, i) => {
              return this.renderRoute(route, i);
            })}
            <Route path={"*"} component={NotFound} />
          </Switch>
        </React.Fragment>
      );
    }
  }

  renderRoute = (route, i) => {
    let xhtml = null;

    xhtml = (
      <Route
        key={i}
        path={route.path}
        component={route.component}
        exact={route.exact ? route.exact : false}
      />
    );

    return xhtml;
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.commonUser.isAuthenticated,
  ui_isValidateToken: state.commonUser.ui_isValidateToken
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ actValidateToken }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(App);

const routes = [
  {
    path: "/",
    exact: true,
    component: () => (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    )
  },
  {
    path: "/login",
    component: () => <LoginScreen />
  },
  {
    path: "/logout",
    component: () => <LogoutScreen />
  },
  {
    path: "/change-password",
    component: () => <ChangePasswordScreen />
  },
  {
    path: "/dashboard",
    component: ({ location, match }) => (
      <DashboardScreen location={location} match={match} />
    )
  },
  {
    path: "/sale",
    component: ({ location, match }) => (
      <SaleScreen location={location} match={match} />
    )
  },
  {
    path: "/accountant",
    component: ({ location, match }) => (
      <AccountantScreen location={location} match={match} />
    )
  },
  {
    path: "/technician",
    component: () => <TechnicianScreen />
  },
  {
    path: "/manager",
    component: () => <ManagerScreen />
  }
];
