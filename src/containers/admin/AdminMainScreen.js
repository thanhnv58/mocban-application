import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import MyAppBar from "../../components/app-bar/MyAppBar";
import MyDrawerAdmin from "../../components/drawer/MyDrawerAdmin";
import * as UserRole from "../../constants/UserRole";
import { helpers_hasPermission } from "../../utils/helpers";
import UserManagementScreen from "./user-management/UserManagementScreen";
import CreateUserScreen from "./user-management/CreateUserScreen";
import UserDetailScreen from "./user-management/UserDetailScreen";
import styles from "./styles";

class AdminMainScreen extends Component {
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
      if (helpers_hasPermission(UserRole.ADMIN, listRole)) {
        let { classes } = this.props;
        return (
          <div className={classes.root}>
            <CssBaseline />
            <MyAppBar handleDrawerToggle={this.handleDrawerToggle} />
            <MyDrawerAdmin
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

export default compose(withMyStyle, connectRedux)(AdminMainScreen);

const routes = [
  {
    path: "/admin",
    exact: true,
    render: () => (
      <Redirect
        to={{
          pathname: "/admin/user-management",
        }}
      />
    ),
  },
  {
    path: "/admin/user-management",
    render: () => {
      return <UserManagementScreen />;
    },
  },
  {
    path: "/admin/create-user",
    render: () => {
      return <CreateUserScreen />;
    },
  },
  {
    path: "/admin/user-detail/:idUser",
    render: ({ match }) => {
      let { params } = match;
      return <UserDetailScreen idUser={parseInt(params.idUser)} />;
    },
  },
  // {
  //   path: "/sale/order-management",
  //   render: () => {
  //     return <ListOrderScreen />;
  //   },
  // },
  // {
  //   path: "/sale/:idClient/create-order",
  //   render: ({ match, location }) => {
  //     let { params } = match;
  //     const values = queryString.parse(location.search);
  //     return (
  //       <CreateOrderScreen
  //         idClient={parseInt(params.idClient)}
  //         idParent={values.idParent}
  //       />
  //     );
  //   },
  // },

  // {
  //   path: "/sale/list-order/:clientUsername",
  //   render: ({ match }) => {
  //     let { params } = match;
  //     return <ListOrderScreen clientUsername={params.clientUsername} />;
  //   },
  // },
  // {
  //   path: "/sale/order-detail/:idOrder",
  //   render: ({ match, location }) => {
  //     let { params } = match;
  //     const values = queryString.parse(location.search);
  //     return (
  //       <OrderDetailScreen
  //         idOrder={parseInt(params.idOrder)}
  //         newOrder={values.newOrder}
  //       />
  //     );
  //   },
  // },
];
