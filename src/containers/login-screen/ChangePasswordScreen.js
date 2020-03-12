import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { getLocalToken } from "./../../utils/helpers";
import ChangePasswordForm from "../../components/change-password-form/ChangePasswordForm";
import { Link, Box } from "@material-ui/core";
import Copyright from "../../components/Copyright";

class ChangePasswordScreen extends Component {
  render() {
    let { auth } = this.props;
    let { isAuthenticated } = auth;

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

    if (isAuthenticated === true) {
      return (
        <React.Fragment>
          <ChangePasswordForm username={auth.username} />

          <Box mt={5} display="flex" justifyContent="center">
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "black" }}
              activeStyle={{
                fontWeight: "bold",
                color: "#03a9f4"
              }}
            >
              <Link component="button" variant="body2">
                Tới Trang chủ
              </Link>
            </NavLink>
          </Box>

          <Box mt={5}>
            <Copyright />
          </Box>
        </React.Fragment>
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

export default compose(connectRedux)(ChangePasswordScreen);
