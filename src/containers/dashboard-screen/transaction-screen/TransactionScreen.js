import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { fetchUser } from "./../../../actions/user-screen-action/actions";
import TransactionDetailScreen from "./transaction-detail-screen/TransactionDetailScreen";
import TransactionMainScreen from "./transaction-main-screen/TransactionMainScreen";
import styles from "./styles";
import TransactionCreateScreen from "./transaction-create-screen/TransactionCreateScreen";

class TransactionScreen extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={"/dashboard/transactions"}>
          <TransactionMainScreen />
        </Route>
        <Route
          path={"/dashboard/transactions/project/:id/create"}
          render={({ match }) => {
            let { params } = match;
            let { id } = params;
            return <TransactionCreateScreen projectId={parseInt(id)} />;
          }}
        />
        <Route path={"/dashboard/transactions/project/:id"}>
          <Screen />
        </Route>
        <Route path={"/dashboard/transactions/*"}>
          <Redirect to="/dashboard/transactions" />
        </Route>
      </Switch>
    );
  }
}

function Screen() {
  let { id } = useParams();

  let xhtml = <TransactionDetailScreen projectId={parseInt(id)} />;

  return xhtml;
}

const mapStateToProps = state => ({
  pageUser: state.users
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(TransactionScreen);
