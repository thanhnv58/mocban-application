import React from "react";
import LoginScreen from "../containers/login-screen/LoginScreen";
import DashboardScreen from "../containers/dashboard-screen/DashboardScreen";
import NotFound from "../views/not-found/NotFound";
import SaleScreen from "../containers/sale-screen/SaleScreen";
import LogoutScreen from "../containers/login-screen/LogoutScreen";

const routes = [
  {
    path: "/login",
    component: ({ location }) => <LoginScreen location={location} />
  },
  {
    path: "/logout",
    component: () => <LogoutScreen />
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
    path: "*",
    component: NotFound
  }
];

export default routes;
