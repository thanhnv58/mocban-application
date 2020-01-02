import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { actValidateToke } from "../../actions/auth-action/actions";
import LoginForm from "../../components/login-form/LoginForm";
import { getLocalToken } from "./../../utils/helpers";
import styles from "./styles";
import * as UserRole from "./../../constants/UserRole";

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

  componentDidMount() {
    let { auth, actValidateToke } = this.props;
    let { isAuthenticated } = auth;
    let { hasLocalToken } = this.state;

    if (hasLocalToken === true) {
      if (isAuthenticated === null) {
        actValidateToke();
      }
    }
  }

  render() {
    let { location, auth, isValidateToken } = this.props;
    let { isAuthenticated, role } = auth;

    // Show loading
    if (isValidateToken === true) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />;
            </Box>
          </Grid>
        </Grid>
      );
    }

    if (isAuthenticated === true) {
      let { from } = location.state || { from: { pathname: "/" } };

      if (role === UserRole.SALE && from.pathname === "/dashboard") {
        from = { from: { pathname: "/sale" } };
      }

      return (
        <Redirect
          to={{
            pathname: "/sale"
          }}
        />
      );
    }

    return <LoginForm />;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isValidateToken: state.ui.isValidateToken
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actValidateToke
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(LoginScreen);
