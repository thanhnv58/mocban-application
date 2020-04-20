import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawerSale from "../../components/drawer/MyDrawerSale";
import * as UserRole from "../../constants/UserRole";
import { helpers_hasPermission } from "../../utils/helpers";
import CreateClientScreen from "./client-management/CreateClientScreen";
import ClientManagementScreen from "./client-management/ClientManagementScreen";
import CreateOrderScreen from "./order-management/CreateOrderScreen";
import ListOrderScreen from "./order-management/OrderManagementScreen";
import styles from "./styles";
import OrderDetailScreen from "./order-management/OrderDetailScreen";
import ClientDetail from "./client-management/ClientDetailScreen";
import queryString from "query-string";

class SaleMainScreen extends Component {
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
    let { isAuthenticated } = this.props;

    // Get token save on local storage
    // Case not yet authentication
    if (!isAuthenticated) {
      return (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      );
    } else {
      let { listRole } = this.props;
      if (helpers_hasPermission(UserRole.SALE, listRole)) {
        let { classes } = this.props;
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
        // No permission to do this
        return (
          <Redirect
            to={{
              pathname: "/403",
            }}
          />
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.commonUser.isAuthenticated,
  listRole: state.commonUser.listRole,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(SaleMainScreen);

const routes = [
  {
    path: "/sale",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/sale/client-management",
        }}
      />
    ),
  },
  {
    path: "/sale/client-management",
    render: () => {
      return <ClientManagementScreen />;
    },
  },
  {
    path: "/sale/create-client",
    render: () => {
      return <CreateClientScreen />;
    },
  },
  {
    path: "/sale/client-detail/:idClient",
    render: ({ match }) => {
      let { params } = match;
      return <ClientDetail idClient={parseInt(params.idClient)} />;
    },
  },
  {
    path: "/sale/order-management",
    render: () => {
      return <ListOrderScreen />;
    },
  },
  {
    path: "/sale/:idClient/create-order",
    render: ({ match, location }) => {
      let { params } = match;
      const values = queryString.parse(location.search);
      return (
        <CreateOrderScreen
          idClient={parseInt(params.idClient)}
          idParent={values.idParent}
        />
      );
    },
  },

  {
    path: "/sale/list-order/:clientUsername",
    render: ({ match }) => {
      let { params } = match;
      return <ListOrderScreen clientUsername={params.clientUsername} />;
    },
  },
  {
    path: "/sale/order-detail/:idOrder",
    render: ({ match, location }) => {
      let { params } = match;
      const values = queryString.parse(location.search);
      return (
        <OrderDetailScreen
          idOrder={parseInt(params.idOrder)}
          newOrder={values.newOrder}
        />
      );
    },
  },
];
