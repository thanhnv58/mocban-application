import { Box, Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { Component } from "react";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as mui from "../../utils/mui";
import styles from "./styles";

class UpdateUserForm extends Component {
  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12}>
            <Field
              name="txtPassword"
              fullWidth
              label="Mật khẩu"
              margin="dense"
              variant="outlined"
              component={mui.renderTextField}
              autoComplete="on"
            />
          </Grid>
          <Grid item lg={3} xs={12}>
            <Field
              name="txtPhoneNumber"
              fullWidth
              label="Số điện thoại"
              margin="dense"
              required
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item lg={9} xs={12}>
            <Field
              name="txtAddress"
              fullWidth
              label="Địa chỉ"
              margin="dense"
              required
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={pristine || invalid || isLoading}
                  >
                    Chỉnh sửa thông tin
                  </Button>
                  {isLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
              <Box>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<RotateLeftIcon />}
                    onClick={this.resetForm}
                  >
                    Reset
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  resetForm = () => {
    let { reset } = this.props;
    reset();
  };

  onSubmit = formData => {
    let { userId } = this.props;
    let { txtPassword, txtPhoneNumber, txtAddress } = formData;

    let user = {
      userId,
      password: txtPassword,
      phoneNumber: txtPhoneNumber,
      address: txtAddress
    };

    let { updateUser } = this.props;
    updateUser(user);

    this.resetForm();
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let { txtPhoneNumber, txtAddress } = values;

  if (!txtPhoneNumber && !txtAddress) {
    return errors;
  }

  const listField = [
    {
      field: "txtPhoneNumber",
      message: "Nhập số điện thoại!"
    },
    {
      field: "txtAddress",
      message: "Nhập thông tin địa chỉ!"
    }
  ];

  listField.forEach(fieldElm => {
    if (!values[fieldElm.field]) {
      errors[fieldElm.field] = fieldElm.message;
      return errors;
    }
  });

  return errors;
};

const userForm = reduxForm({
  form: "UPDATE_USER_FORM",
  validate,
  enableReinitialize: true
});

export default compose(withMyStyle, userForm)(UpdateUserForm);
