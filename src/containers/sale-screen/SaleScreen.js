import { Box, CircularProgress, Grid } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawerSale from "../../components/drawer/MyDrawerSale";
import { actValidateToke } from "./../../actions/auth-action/actions";
import * as UserRole from "./../../constants/UserRole";
import { getLocalToken, hasPermission } from "./../../utils/helpers";
import CreateClientScreen from "./../sale-screen/client-screen/CreateClientScreen";
import ListClientScreen from "./../sale-screen/client-screen/ListClientScreen";
import CreateOrderScreen from "./order-screen/CreateOrderScreen";
import SearchClientOrderScreen from "./order-screen/SearchClientOrderScreen";
import styles from "./styles";
import ListOrderScreen from "./order-screen/ListOrderScreen";
import MainScreen from "./main-screen/MainScreen";

class SaleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen
    });
  };

  componentDidMount() {
    let { auth, actValidateToke } = this.props;
    let { isAuthenticated } = auth;

    let localToken = getLocalToken();
    if (localToken) {
      if (isAuthenticated === null) {
        actValidateToke();
      }
    }
  }

  render() {
    let { auth, location, classes, isValidateToken } = this.props;
    let { isAuthenticated, role } = auth;

    // Show loading
    if (isValidateToken === true) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />;
            </Box>
          </Grid>
        </Grid>
      );
    }

    // Auth false
    let localToken = getLocalToken();
    if (localToken === null || isAuthenticated === false) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      );
    }

    // Main screen
    if (isAuthenticated === true) {
      if (
        !hasPermission(role, [
          UserRole.SALE,
          UserRole.ADMIN_SYSTEM,
          UserRole.MANAGER
        ])
      ) {
        return (
          <Redirect
            to={{
              pathname: "/notfound"
            }}
          />
        );
      }

      return (
        <div className={classes.root}>
          <CssBaseline />
          <MyAppBar handleDrawerToggle={this.handleDrawerToggle} />
          <MyDrawerSale
            mobileOpen={this.state.mobileOpen}
            handleDrawerToggle={this.handleDrawerToggle}
          />

          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {routes.map((route, i) => {
                return (
                  <Route
                    key={i}
                    path={route.path}
                    render={route.render}
                    exact={route.exact ? route.exact : false}
                  />
                );
              })}
            </Switch>
          </main>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isValidateToken: state.ui.isValidateToken
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actValidateToke
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(SaleScreen);

const routes = [
  {
    path: "/sale",
    exact: true,
    render: () => <MainScreen />
  },
  {
    path: "/sale/clients/list",
    render: () => {
      return <ListClientScreen />;
    }
  },
  {
    path: "/sale/clients/create",
    render: () => {
      return <CreateClientScreen />;
    }
  },
  {
    path: "/sale/orders/create",
    render: ({ location }) => {
      const values = queryString.parse(location.search);
      return (
        <CreateOrderScreen
          clientId={values.clientId ? values.clientId : null}
        />
      );
    }
  },
  {
    path: "/sale/orders/search",
    render: ({ location }) => {
      const values = queryString.parse(location.search);
      return (
        <SearchClientOrderScreen
          clientId={values.clientId ? values.clientId : null}
        />
      );
    }
  },
  {
    path: "/sale/orders/list",
    render: () => {
      return <ListOrderScreen />;
    }
  }
];
