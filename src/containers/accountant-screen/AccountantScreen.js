import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import * as UserRole from "../../constants/UserRole";
import { hasPermission, getLocalToken } from "../../utils/helpers";
import styles from "./styles";
import MyDrawerAccountant from "../../components/drawer/MyDrawerAccountant";
import MainScreen from "./main-screen/MainScreen";
import ListClientScreen from "./list-client-screen/ListClientScreen";
import ClientTransactionListScreen from "./transaction-screen/ClientTransactionListScreen";
import queryString from "query-string";
import CreateTransactionScreen from "./transaction-screen/CreateTransactionScreen";
import SearchTransactionScreen from "./transaction-screen/SearchTransactionScreen";
import ValidateTransactionScreen from "./transaction-screen/ValidateTransactionScreen";
// import "./onesignal-accountant.js";

class AccountantScreen extends Component {
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

    let localToken = getLocalToken();
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
        !hasPermission(role, [
          UserRole.ACCOUNTANT,
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
          <MyDrawerAccountant
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
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(AccountantScreen);

const routes = [
  {
    path: "/accountant",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/accountant/home"
        }}
      />
    )
  },
  {
    path: "/accountant/home",
    render: () => <MainScreen />
  },
  {
    path: "/accountant/list-client",
    render: () => {
      return <ListClientScreen />;
    }
  },
  {
    path: "/accountant/transaction/:clientUsername",
    render: ({ match }) => {
      let { params } = match;
      return (
        <ClientTransactionListScreen clientUsername={params.clientUsername} />
      );
    }
  },
  {
    path: "/accountant/create-transaction",
    render: ({ location }) => {
      const values = queryString.parse(location.search);
      return (
        <CreateTransactionScreen
          clientUsername={values.clientId ? values.clientId : null}
        />
      );
    }
  },
  {
    path: "/accountant/list-transaction",
    render: () => {
      return <SearchTransactionScreen />;
    }
  },
  {
    path: "/accountant/validate-transaction",
    render: () => {
      return <ValidateTransactionScreen />;
    }
  }
];
