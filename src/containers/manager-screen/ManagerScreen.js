import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import {
  helpers_hasPermission,
  helpers_GetLocalToken,
} from "./../../utils/helpers";
import * as UserRole from "../../constants/UserRole";
import CreateUserScreen from "./user-screen/CreateUserScreen";
import ListUserScreen from "./user-screen/ListUserScreen";
import styles from "./styles";
import MyDrawerManager from "../../components/drawer/MyDrawerManager";
import MainScreen from "./main-screen/MainScreen";
import DetailUserScreen from "./user-screen/DetailUserScreen";
// import "./onesignal-manager.js";

class ManagerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    });
  };

  render() {
    let { auth, classes } = this.props;
    let { isAuthenticated, role } = auth;

    let localToken = helpers_GetLocalToken();
    if (localToken === null || isAuthenticated === false) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    }

    // Main screen
    if (isAuthenticated === true) {
      if (!helpers_hasPermission(role, [UserRole.ADMIN, UserRole.MANAGER])) {
        return (
          <Redirect
            to={{
              pathname: "/notfound",
            }}
          />
        );
      }

      return (
        <div className={classes.root}>
          <CssBaseline />
          <MyAppBar handleDrawerToggle={this.handleDrawerToggle} />
          <MyDrawerManager
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

const mapStateToProps = (state) => ({
  auth: state.commonUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(ManagerScreen);

const routes = [
  {
    path: "/manager",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/manager/home",
        }}
      />
    ),
  },
  {
    path: "/manager/home",
    render: () => <MainScreen />,
  },
  {
    path: "/manager/create-user",
    exact: true,
    render: () => {
      return <CreateUserScreen />;
    },
  },
  {
    path: "/manager/list-user",
    render: () => {
      return <ListUserScreen />;
    },
  },
  {
    path: "/manager/detail-user/:username",
    render: ({ match }) => {
      let { params } = match;

      return <DetailUserScreen username={params.username} />;
    },
  },
];
