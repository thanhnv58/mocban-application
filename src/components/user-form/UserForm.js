import { Button, Grid, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { createUser } from "./../../actions/user-screen-action/actions";
import * as UserRole from "./../../constants/UserRole";
import { getUserRole } from "./../../utils/helpers";
import * as mui from "./../../utils/mui";
import styles from "./styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

class UserForm extends Component {
  render() {
    let {
      formInfo,
      handleSubmit,
      classes,
      pristine,
      invalid,
      isCreateUserFormSubmit,
      reset
    } = this.props;

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
              required
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
          <Grid item md={6} xs={12}>
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
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Box>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={formInfo.icon}
                    disabled={pristine || invalid || isCreateUserFormSubmit}
                  >
                    {formInfo.btnSubmit}
                  </Button>
                  {isCreateUserFormSubmit && (
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
                    onClick={() => {
                      reset();
                    }}
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

  listRole = () => {
    let listRole = [
      UserRole.CLIENT,
      UserRole.SALE,
      UserRole.DESIGN,
      UserRole.DESIGN_LEADER,
      UserRole.PRODUCER,
      UserRole.PRODUCER_LEADER
    ];

    return listRole.map((role, i) => {
      return (
        <MenuItem key={i} value={role}>
          {getUserRole(role)}
        </MenuItem>
      );
    });
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
    txtRole,
    txtAddress
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
      field: "txtUsername",
      message: "Nhập tên đăng nhập!"
    },
    {
      field: "txtFullName",
      message: "Nhập tên đầy đủ!"
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

  if (txtUsername && txtUsername.includes(" ")) {
    errors.txtUsername = "Tên đăng nhập không được chứa khoảng trắng!";
    return errors;
  }

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

const mapStateToProps = state => ({
  isCreateUserFormSubmit: state.ui.isCreateUserFormSubmit
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "USER_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, userForm)(UserForm);
