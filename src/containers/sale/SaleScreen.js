import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import queryString from "query-string";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawerSale from "../../components/drawer/MyDrawerSale";
import * as UserRole from "./../../constants/UserRole";
import { helpers_hasPermission } from "./../../utils/helpers";
import CreateClientScreen from "./../sale/client-screen/CreateClientScreen";
import ListClientScreen from "./../sale/client-screen/ListClientScreen";
import MainScreen from "./main-screen/MainScreen";
import CreateOrderScreen from "./order-screen/CreateOrderScreen";
import ListOrderScreen from "./order-screen/ListOrderScreen";
import styles from "./styles";
import OrderDetailScreen from "./order-screen/OrderDetailScreen";

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

  render() {
    let { isAuthenticated } = this.props;

    // Get token save on local storage
    // Case not yet authentication
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      );
    } else {
      let { listRole, classes } = this.props;

      if (helpers_hasPermission(UserRole.SALE, listRole)) {
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
      } else {
        return (
          <Redirect
            to={{
              pathname: "/notfound"
            }}
          />
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.commonUser.isAuthenticated,
  listRole: state.commonUser.listRole
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(SaleScreen);

const routes = [
  {
    path: "/sale",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/sale/home"
        }}
      />
    )
  },
  {
    path: "/sale/home",
    render: () => <MainScreen />
  },
  {
    path: "/sale/list-client",
    render: () => {
      return <ListClientScreen />;
    }
  },
  {
    path: "/sale/create-client",
    render: () => {
      return <CreateClientScreen />;
    }
  },
  {
    path: "/sale/create-order",
    render: ({ location }) => {
      const values = queryString.parse(location.search);
      return (
        <CreateOrderScreen
          clientUsername={values.clientId ? values.clientId : null}
        />
      );
    }
  },
  {
    path: "/sale/list-order",
    exact: true,
    render: () => {
      return <ListOrderScreen />;
    }
  },
  {
    path: "/sale/list-order/:clientUsername",
    render: ({ match }) => {
      let { params } = match;
      return <ListOrderScreen clientUsername={params.clientUsername} />;
    }
  },
  {
    path: "/sale/order-detail/:orderId",
    render: ({ match }) => {
      let { params } = match;
      return <OrderDetailScreen orderId={parseInt(params.orderId)} />;
    }
  }
];
