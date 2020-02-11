import { Box, Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as UserRole from "../../constants/UserRole";
import { getUserRole } from "../../utils/helpers";
import { compose } from "redux";

import * as mui from "../../utils/mui";
import styles from "./styles";

class CreateUserForm extends Component {
  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Field
              name="txtUsername"
              fullWidth
              label="Tên đăng nhập"
              margin="dense"
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              name="txtFullName"
              fullWidth
              label="Tên đầy đủ"
              margin="dense"
              required
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              name="txtPassword"
              fullWidth
              label="Mật khẩu"
              margin="dense"
              required
              variant="outlined"
              type="password"
              component={mui.renderTextField}
              autoComplete="on"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              name="txtRePassword"
              fullWidth
              label="Xác nhận mật khẩu"
              margin="dense"
              variant="outlined"
              type="password"
              component={mui.renderTextField}
              autoComplete="on"
            />
          </Grid>
          <Grid item md={6} xs={12}>
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
          <Grid item md={6} xs={12}>
            <Field
              name="txtEmail"
              fullWidth
              label="Email"
              margin="dense"
              required
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>
          <Grid item md={12} xs={12}>
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
          <Grid item md={12} xs={12}>
            <Field
              name="txtRole"
              label="Chức năng người dùng"
              required
              classFormControl={classes.formControl}
              component={mui.renderSelectField}
            >
              {this.listRole()}
            </Field>
          </Grid>
          <Grid item xs={12} md={12}>
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<PersonAddIcon />}
                    disabled={pristine || invalid || isLoading}
                  >
                    Thêm mới
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

  listRole = () => {
    let listRole = [
      UserRole.SALE,
      UserRole.DESIGN,
      UserRole.PRODUCER,
      UserRole.MANAGER
    ];

    return listRole.map((role, i) => {
      return (
        <MenuItem key={i} value={role}>
          {getUserRole(role)}
        </MenuItem>
      );
    });
  };

  resetForm = () => {
    let { reset } = this.props;

    reset();
  };

  onSubmit = formData => {
    let {
      txtUsername,
      txtFullName,
      txtPassword,
      txtPhoneNumber,
      txtEmail,
      txtAddress,
      txtRole
    } = formData;

    let user = {
      username: txtUsername,
      password: txtPassword,
      fullName: txtFullName,
      role: txtRole,
      phoneNumber: txtPhoneNumber,
      address: txtAddress,
      email: txtEmail
    };

    let { createUser } = this.props;
    createUser(user);
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let {
    txtUsername,
    txtFullName,
    txtPassword,
    txtRePassword,
    txtPhoneNumber,
    txtEmail,
    txtAddress,
    txtRole
  } = values;

  if (
    !txtUsername &&
    !txtFullName &&
    !txtPassword &&
    !txtRePassword &&
    !txtPhoneNumber &&
    !txtEmail &&
    !txtRole &&
    !txtAddress
  ) {
    return errors;
  }

  const listField = [
    {
      field: "txtFullName",
      message: "Nhập tên đầy đủ!"
    },
    {
      field: "txtUsername",
      message: "Nhập tên đăng nhập!"
    },
    {
      field: "txtPassword",
      message: "Nhập mật khẩu!"
    },
    {
      field: "txtRePassword",
      message: "Xác nhận mật khẩu"
    },
    {
      field: "txtPhoneNumber",
      message: "Nhập số điện thoại!"
    },
    {
      field: "txtEmail",
      message: "Nhập thông tin email!"
    },
    {
      field: "txtRole",
      message: "Chọn chức năng cho người dùng"
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

  if (txtPassword && txtRePassword && txtPassword !== txtRePassword) {
    errors.txtRePassword = "Mật khẩu xác nhận chưa chính xác!";
    return errors;
  }

  if (txtEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(txtEmail)) {
    errors.txtEmail = "Định dạng mail không chính xác!";
    return errors;
  }

  return errors;
};

const userForm = reduxForm({
  form: "CREATE_USER_FORM",
  validate,
  enableReinitialize: true
});

export default compose(withMyStyle, userForm)(CreateUserForm);
