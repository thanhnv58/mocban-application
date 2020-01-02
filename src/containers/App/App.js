import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./../../routers/routes";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {routes.map((route, i) => {
            return this.renderRoute(route, i);
          })}
        </Switch>
      </React.Fragment>
    );
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

export default App;
