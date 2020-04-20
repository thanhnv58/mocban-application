import {
  Box,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import * as UserRole from "../../constants/UserRole";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import * as mui from "../../utils/mui";
import { createUser } from "../../actions/admin/user-management/actions";
import { toastError } from "../../utils/ToastUtils";
import styles from "./styles";

class CreateUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roleManager: false,
      roleSale: false,
      roleWorker: false,
      roleAccountant: false,
      roleCompleter: false,
    };
  }

  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading1 } = this.props;

    let {
      roleManager,
      roleSale,
      roleWorker,
      roleAccountant,
      roleCompleter,
    } = this.state;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item lg={4} xs={12}>
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
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<PersonAddIcon />}
                    className="btn-green"
                    disabled={pristine || invalid || isLoading1}
                  >
                    Thêm mới
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
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={<RotateLeftIcon />}
                  onClick={this.resetForm}
                >
                  Reset
                </Button>
              </Box>
            </Box>
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
      roleManager,
      roleSale,
      roleWorker,
      roleAccountant,
      roleCompleter,
    } = this.state;

    let listRoles = [];

    if (roleManager) listRoles.push(UserRole.MANAGER);
    if (roleSale) listRoles.push(UserRole.SALE);
    if (roleWorker) listRoles.push(UserRole.WORKER);
    if (roleAccountant) listRoles.push(UserRole.ACCOUNTANT);
    if (roleCompleter) listRoles.push(UserRole.COMPLETER);

    if (listRoles.length === 0) {
      toastError("Chọn chức năng cho người dùng!");
    } else {
      let { txtFullName, txtPhoneNumber, txtEmail, txtAddress } = formData;
      let user = {
        fullName: txtFullName,
        phoneNumber: txtPhoneNumber,
        address: txtAddress,
        email: txtEmail,
        roles: listRoles,
      };

      let { createUser } = this.props;
      createUser(user);
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
      field: "txtFullName",
      message: "Nhập tên đầy đủ!",
    },
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
  form: "CREATE_USER_FORM",
  validate,
});

const mapStateToProps = (state) => ({
  isLoading1: state.adminReducer.ui.isLoading1,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createUser,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withMyStyle, userForm, connectRedux)(CreateUserForm);
