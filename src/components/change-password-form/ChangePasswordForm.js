import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as mui from "../../utils/mui";
import styles from "./styles";
import { TextField } from "@material-ui/core";
import { changePassword } from "../../actions/common-user-action/actions";

class ChangePasswordForm extends Component {
  render() {
    let {
      classes,
      pristine,
      invalid,
      isChangePassword,
      handleSubmit,
      username,
    } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đổi mật khẩu
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(this.changePassword)}
          >
            <TextField
              id="standard-read-only-input"
              label="Tên đăng nhập"
              defaultValue={username}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Field
              name="txtOldPassword"
              component={mui.renderTextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu cũ"
              type="password"
              autoFocus
            />
            <Field
              name="txtNewPassword"
              component={mui.renderTextField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu mới"
              type="password"
            />

            <Box mt={2}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={pristine || invalid || isChangePassword}
                >
                  Đổi mật khẩu
                </Button>
                {isChangePassword && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Box>
          </form>
        </div>
      </Container>
    );
  }

  changePassword = (values) => {
    let { txtOldPassword, txtNewPassword } = values;
    let { changePassword } = this.props;
    changePassword({
      oldPassword: txtOldPassword,
      newPassword: txtNewPassword,
    });
  };
}

const mapStateToProps = (state) => ({
  isChangePassword: state.commonUser.isChangePassword,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changePassword,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export const validate = (values) => {
  const errors = {};

  let { txtOldPassword, txtNewPassword } = values;

  if (!txtOldPassword && !txtNewPassword) {
    return {};
  }

  if (!txtOldPassword) {
    errors.txtOldPassword = "Mật khẩu cũ không được để trống!";
    return errors;
  }

  if (!txtNewPassword) {
    errors.txtNewPassword = "Mật khẩu mới không được để trống!";
    return errors;
  }

  return errors;
};

const form = reduxForm({
  form: "CHANGE_PASSWORD_FORM",
  validate,
});

export default compose(withMyStyle, connectRedux, form)(ChangePasswordForm);
