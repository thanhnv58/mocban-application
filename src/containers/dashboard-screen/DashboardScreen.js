import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawer from "../../components/drawer/MyDrawer";
import ProjectScreen from "./project-screen/ProjectScreen";
import TransactionScreen from "./transaction-screen/TransactionScreen";
import styles from "./styles";
import ListClientScreen from "./client-screen/ListClientScreen";
import CreateClientScreen from "./client-screen/CreateClientScreen";
import { Grid, Box, CircularProgress } from "@material-ui/core";
import { actValidateToke } from "./../../actions/auth-action/actions";
import * as UserRole from "./../../constants/UserRole";
import { hasPermission, getLocalToken } from "./../../utils/helpers";

const routes = [
  {
    path: "/dashboard",
    exact: true,
    render: () => <h3>Danh sach cong viec - Man hinh chinh</h3>
  },
  {
    path: "/dashboard/clients",
    exact: true,
    render: () => {
      return <ListClientScreen />;
    }
  },
  {
    path: "/dashboard/clients/create",
    render: () => {
      return <CreateClientScreen />;
    }
  },
  {
    path: "/dashboard/projects",
    render: ({ location }) => {
      const values = queryString.parse(location.search);
      return <ProjectScreen userId={values.user ? values.user : null} />;
    }
  },
  {
    path: "/dashboard/transactions",
    render: () => {
      return <TransactionScreen />;
    }
  }
];

class DashboardScreen extends Component {
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
    let { auth, location, classes, isLoading1 } = this.props;
    let { isAuthenticated, role } = auth;

    // Show loading
    if (isLoading1 === true) {
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

    if (isAuthenticated === true) {
      if (!hasPermission(role, [UserRole.ADMIN_SYSTEM, UserRole.MANAGER])) {
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
          <MyDrawer
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
  auth: state.auth
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

export default compose(withMyStyle, connectRedux)(DashboardScreen);
