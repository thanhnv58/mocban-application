import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { authenticate } from "../../actions/common-user-action/actions";
import Copyright from "../../components/Copyright";
import * as mui from "./../../utils/mui";
import styles from "./styles";

class LoginForm extends Component {
  render() {
    let { classes, pristine, invalid, ui_isLogin, handleSubmit } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(this.onLogin)}
          >
            <Field
              name="txtUsername"
              component={mui.renderTextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Tên đăng nhập"
              autoFocus
            />
            <Field
              name="txtPassword"
              component={mui.renderTextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              autoComplete="on"
            />

            <Box mt={2}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={pristine || invalid || ui_isLogin}
                >
                  Đăng nhập
                </Button>
                {ui_isLogin && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Box>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }

  onLogin = values => {
    let { txtUsername, txtPassword } = values;
    let { authenticate } = this.props;

    authenticate(txtUsername, txtPassword);
  };
}

const mapStateToProps = state => ({
  ui_isLogin: state.commonUser.ui_isLogin
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      authenticate
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let { txtUsername, txtPassword } = values;

  if (!txtUsername && !txtPassword) {
    return {};
  }

  if (!txtUsername) {
    errors.txtUsername = "Username is required!";
    return errors;
  }

  if (!txtPassword) {
    errors.txtPassword = "Password is required!";
    return errors;
  }

  return errors;
};

const loginForm = reduxForm({
  form: "LOGIN_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, loginForm)(LoginForm);
