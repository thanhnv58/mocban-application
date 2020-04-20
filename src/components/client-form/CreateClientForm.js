import { Button, Grid, Box, Select } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { createClient } from "../../actions/sale/client-management/actions";
import * as mui from "../../utils/mui";
import styles from "./styles";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import * as ClientStatus from "../../constants/ClientStatus";

class CreateClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientStatus: ClientStatus.JUST_APPROACHED,
    };
  }

  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading1 } = this.props;

    let { clientStatus } = this.state;

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
          <Grid item lg={4} xs={12}>
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
          <Grid item lg={3} xs={12}>
            <Select
              native
              value={clientStatus}
              fullWidth
              onChange={this.handleChange}
              className="middle-div"
              inputProps={{
                name: "clientStatus",
              }}
            >
              <option value={ClientStatus.JUST_APPROACHED}>Mới tiếp cận</option>
              <option value={ClientStatus.HAVE_DEMAND}>Đang có nhu cầu</option>
            </Select>
          </Grid>
          <Grid item lg={9} xs={12}>
            <Field
              name="txtNote"
              fullWidth
              label="Ghi chú"
              margin="dense"
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
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<RotateLeftIcon />}
                    onClick={this.resetForm}
                  >
                    Làm mới form
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  handleChange = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  };

  resetForm = () => {
    let { reset } = this.props;
    reset();
  };

  onSubmit = (formData) => {
    let {
      txtFullName,
      txtPhoneNumber,
      txtEmail,
      txtAddress,
      txtNote,
    } = formData;

    let { clientStatus } = this.state;

    let client = {
      fullName: txtFullName,
      phoneNumber: txtPhoneNumber,
      address: txtAddress,
      email: txtEmail,
      status: clientStatus,
      note: txtNote,
    };

    let { createClient } = this.props;
    createClient(client);
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

const mapStateToProps = (state) => ({
  isLoading1: state.saleReducer.ui.isLoading1,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createClient,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "CREATE_CLIENT_FORM",
  validate,
  // enableReinitialize: true,
});

export default compose(withMyStyle, connectRedux, userForm)(CreateClientForm);
