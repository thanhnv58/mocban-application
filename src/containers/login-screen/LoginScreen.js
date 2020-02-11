import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import LoginForm from "../../components/login-form/LoginForm";
import * as UserRole from "./../../constants/UserRole";
import { getLocalToken } from "./../../utils/helpers";
import styles from "./styles";
// import "./onesignal-delete.js";

class LoginScreen extends Component {
  onLogin = values => {
    let { txtUsername, txtPassword } = values;

    let { authenticate } = this.props;
    authenticate(txtUsername, txtPassword);
  };

  constructor(props) {
    super(props);

    let authObj = getLocalToken();

    this.state = {
      hasLocalToken: authObj !== null
    };
  }

  render() {
    let { auth } = this.props;
    let { isAuthenticated, role } = auth;

    if (isAuthenticated === true) {
      switch (role) {
        case UserRole.SALE:
          return (
            <Redirect
              to={{
                pathname: "/sale"
              }}
            />
          );
        case UserRole.ACCOUNTANT:
          return (
            <Redirect
              to={{
                pathname: "/accountant"
              }}
            />
          );
        case UserRole.DESIGN:
        case UserRole.PRODUCER:
          return (
            <Redirect
              to={{
                pathname: "/technician"
              }}
            />
          );
        case UserRole.MANAGER:
        case UserRole.ADMIN_SYSTEM:
          return (
            <Redirect
              to={{
                pathname: "/manager"
              }}
            />
          );
        default:
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
      }
    }

    return <LoginForm />;
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

export default compose(withMyStyle, connectRedux)(LoginScreen);
