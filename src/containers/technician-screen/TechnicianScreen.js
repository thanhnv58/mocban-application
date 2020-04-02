import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawerTechnician from "../../components/drawer/MyDrawerTechnician";
import * as UserRole from "../../constants/UserRole";
import {
  helpers_GetLocalToken,
  helpers_hasPermission
} from "../../utils/helpers";
import MainScreen from "./main-screen/MainScreen";
import ListTaskScreen from "./task-screen/ListTaskScreen";
import styles from "./styles";
import TaskDetailScreen from "./task-screen/TaskDetailScreen";
// import "./onesignal-technician.js";

class TechnicianScreen extends Component {
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

  render() {
    let { auth, classes } = this.props;
    let { isAuthenticated, role } = auth;

    let localToken = helpers_GetLocalToken();
    if (localToken === null || isAuthenticated === false) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    }

    // Main screen
    if (isAuthenticated === true) {
      if (
        !helpers_hasPermission(role, [
          UserRole.DESIGN,
          UserRole.PRODUCER,
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
          <MyDrawerTechnician
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
  auth: state.autcommonUserh
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(TechnicianScreen);

const routes = [
  {
    path: "/technician",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/technician/home"
        }}
      />
    )
  },
  {
    path: "/technician/home",
    render: () => <MainScreen />
  },
  {
    path: "/technician/task-list",
    render: () => {
      return <ListTaskScreen />;
    }
  },
  {
    path: "/technician/task-detail/:orderId",
    render: ({ match }) => {
      let { params } = match;
      return <TaskDetailScreen orderId={parseInt(params.orderId)} />;
    }
  }
];
