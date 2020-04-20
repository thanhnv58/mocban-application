import {
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as UserRole from "../../constants/UserRole";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as mui from "../../utils/mui";
import { updateUser } from "../../actions/admin/user-management/actions";
import { toastError } from "../../utils/ToastUtils";
import styles from "./styles";

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);

    let { idUser, username, roles } = this.props;

    const indexAdmin = roles.indexOf(UserRole.ADMIN);
    const indexManager = roles.indexOf(UserRole.MANAGER);
    const indexSale = roles.indexOf(UserRole.SALE);
    const indexWorker = roles.indexOf(UserRole.WORKER);
    const indexAccountant = roles.indexOf(UserRole.ACCOUNTANT);
    const indexCompleter = roles.indexOf(UserRole.COMPLETER);

    this.state = {
      roleAdmin: indexAdmin !== -1,
      roleManager: indexManager !== -1,
      roleSale: indexSale !== -1,
      roleWorker: indexWorker !== -1,
      roleAccountant: indexAccountant !== -1,
      roleCompleter: indexCompleter !== -1,
      username,
      idUser,
    };
  }

  render() {
    let { handleSubmit, classes, invalid, isLoading2 } = this.props;

    let {
      roleAdmin,
      roleManager,
      roleSale,
      roleWorker,
      roleAccountant,
      roleCompleter,
      username,
    } = this.state;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} lg={2}>
            Username:
          </Grid>
          <Grid item xs={6} lg={10}>
            <b>{username}</b>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Field
              name="txtFullName"
              fullWidth
              label="Tên đầy đủ"
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>
          <Grid item lg={4} xs={12}>
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
          <Grid item md={4} xs={12}>
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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleAdmin}
                    onChange={this.handleChange}
                    name="roleManager"
                    color="primary"
                  />
                }
                label="Admin"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleManager}
                    onChange={this.handleChange}
                    name="roleManager"
                    color="primary"
                  />
                }
                label="Manager"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleSale}
                    onChange={this.handleChange}
                    name="roleSale"
                    color="primary"
                  />
                }
                label="Sale"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleWorker}
                    onChange={this.handleChange}
                    name="roleWorker"
                    color="primary"
                  />
                }
                label="Worker"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleAccountant}
                    onChange={this.handleChange}
                    name="roleAccountant"
                    color="primary"
                  />
                }
                label="Accountant"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={roleCompleter}
                    onChange={this.handleChange}
                    name="roleCompleter"
                    color="primary"
                  />
                }
                label="Completer"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className={classes.wrapper}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className="btn-orange"
                disabled={invalid || isLoading2}
              >
                Cập nhật
              </Button>
              {isLoading2 && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  resetForm = () => {
    let { reset } = this.props;
    reset();

    this.setState({
      roleManager: false,
      roleSale: false,
      roleWorker: false,
      roleAccountant: false,
      roleCompleter: false,
    });
  };

  onSubmit = (formData) => {
    let {
      roleAdmin,
      roleManager,
      roleSale,
      roleWorker,
      roleAccountant,
      roleCompleter,
      idUser,
    } = this.state;

    let listRoles = [];

    if (roleAdmin) listRoles.push(UserRole.ADMIN);
    if (roleManager) listRoles.push(UserRole.MANAGER);
    if (roleSale) listRoles.push(UserRole.SALE);
    if (roleWorker) listRoles.push(UserRole.WORKER);
    if (roleAccountant) listRoles.push(UserRole.ACCOUNTANT);
    if (roleCompleter) listRoles.push(UserRole.COMPLETER);

    if (listRoles.length === 0) {
      toastError("Chọn chức năng cho người dùng!");
    } else {
      let { txtPhoneNumber, txtEmail, txtAddress } = formData;
      let user = {
        phoneNumber: txtPhoneNumber,
        address: txtAddress,
        email: txtEmail,
        roles: listRoles,
      };

      let { updateUser } = this.props;
      updateUser(idUser, user);
    }
  };
}

const withMyStyle = withStyles(styles);

export const validate = (values) => {
  const errors = {};

  let { txtFullName, txtPhoneNumber, txtEmail, txtAddress } = values;

  if (!txtFullName && !txtPhoneNumber && !txtEmail && !txtAddress) {
    return errors;
  }

  const listField = [
    {
      field: "txtPhoneNumber",
      message: "Nhập số điện thoại!",
    },
    {
      field: "txtEmail",
      message: "Nhập thông tin email!",
    },
    {
      field: "txtAddress",
      message: "Nhập thông tin địa chỉ!",
    },
  ];

  listField.forEach((fieldElm) => {
    if (!values[fieldElm.field]) {
      errors[fieldElm.field] = fieldElm.message;
      return errors;
    }
  });

  if (txtEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(txtEmail)) {
    errors.txtEmail = "Định dạng mail không chính xác!";
    return errors;
  }

  return errors;
};

const userForm = reduxForm({
  form: "UPDATE_USER_FORM",
  validate,
  enableReinitialize: true,
});

const mapStateToProps = (state) => ({
  isLoading2: state.adminReducer.ui.isLoading2,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateUser,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withMyStyle, userForm, connectRedux)(UpdateUserForm);
