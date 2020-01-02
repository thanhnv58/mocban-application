import { Button, Grid, Box } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { createClient } from "../../actions/sale/client-screen-action/actions";
import * as UserRole from "../../constants/UserRole";
import { getUserRole } from "../../utils/helpers";
import * as mui from "../../utils/mui";
import styles from "./styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

class CreateClientForm extends Component {
  render() {
    let {
      handleSubmit,
      classes,
      pristine,
      invalid,
      isLoading1,
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
              variant="outlined"
              component={mui.renderTextField}
              InputProps={{
                readOnly: true
              }}
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
          <Grid item xs={12} md={12}>
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<PersonAddIcon />}
                    disabled={pristine || invalid || isLoading1}
                  >
                    "Thêm mới"
                  </Button>
                  {isLoading1 && (
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
      txtAddress
    } = formData;

    let client = {
      username: txtUsername,
      password: txtPassword,
      fullName: txtFullName,
      role: UserRole.CLIENT,
      phoneNumber: txtPhoneNumber,
      address: txtAddress,
      email: txtEmail
    };

    let { createClient } = this.props;
    createClient(client);
  };

  listRole = () => {
    let listRole = [UserRole.CLIENT];

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
    txtAddress
  } = values;

  if (
    !txtUsername &&
    !txtFullName &&
    !txtPassword &&
    !txtRePassword &&
    !txtPhoneNumber &&
    !txtEmail &&
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
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createClient
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "CREATE_CLIENT_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, userForm)(CreateClientForm);
