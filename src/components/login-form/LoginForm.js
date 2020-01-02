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
import { authenticate } from "../../actions/auth-action/actions";
import Copyright from "../../components/Copyright";
import * as mui from "./../../utils/mui";
import styles from "./styles";

class LoginForm extends Component {
  render() {
    let { handleSubmit, classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              label="Username"
              autoFocus
            />
            <Field
              name="txtPassword"
              component={mui.renderTextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="on"
            />
            {this.renderSubmitBtn()}
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </form>
        </div>
        <Box mt={8}>
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

  renderSubmitBtn = () => {
    let { classes, pristine, invalid, isLogin } = this.props;

    let xhtml = null;

    xhtml = (
      <div className={classes.wrapper}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={pristine || invalid || isLogin}
          className={classes.submit}
        >
          Sign In
        </Button>
        {isLogin && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    );

    return xhtml;
  };
}

const mapStateToProps = state => ({
  auth: state.auth,
  isLogin: state.ui.isLogin
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
