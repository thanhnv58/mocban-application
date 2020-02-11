import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { logout } from "./../../actions/auth-action/actions";
// import "./onesignal-delete.js";

class LogoutScreen extends Component {
  componentDidMount() {
    let { logout } = this.props;

    logout();
  }

  render() {
    let { auth } = this.props;
    let { isAuthenticated } = auth;

    if (isAuthenticated) {
      return <React.Fragment></React.Fragment>;
    }

    if (isAuthenticated === null) {
      return (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
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
      logout
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(LogoutScreen);
