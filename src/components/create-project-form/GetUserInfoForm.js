import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SecurityIcon from "@material-ui/icons/Security";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  getUserInfo,
  clearUserInfo
} from "../../actions/project-screen-action/actions";
import * as mui from "./../../utils/mui";
import styles from "./styles";
import TwitterIcon from "@material-ui/icons/Twitter";

class GetUserInfoForm extends Component {
  getUserInfo = values => {
    let { txtUsername, txtPhoneNumber, txtEmail } = values;

    if (txtUsername || txtPhoneNumber || txtEmail) {
      let { getUserInfo } = this.props;

      getUserInfo(txtUsername, txtPhoneNumber, txtEmail);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Xác thực thông tin khách hàng
          </Typography>
        </Box>

        {this.renderUserInfo()}
      </React.Fragment>
    );
  }

  renderUserInfo = () => {
    let { client } = this.props;
    if (client === null) {
      return this.renderFormGetUserInfo();
    }
    let xhtml = (
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" component="p">
            {`Tên khách hàng: `} <b>{client.fullName}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" component="p">
            {`Tên truy cập: `} <b>{client.username}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" component="p">
            {`Số điện thoại: `} <b>{client.phoneNumber}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body2" component="p">
            {`Email: `} <b>{client.email}</b>
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Typography variant="body2" component="p">
            {`Địa chỉ nhà: `} <b>{client.address}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box mt={2}>
            <Button
              variant="contained"
              startIcon={<TwitterIcon />}
              onClick={this.clearUser}
              style={{ backgroundColor: "#f8bbd0", color: "black" }}
            >
              Clear data
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box display="flex" justifyContent="center">
            <SecurityIcon style={{ fontSize: 40, color: "#1976d2" }} />
          </Box>
        </Grid>
      </Grid>
    );

    return xhtml;
  };

  clearUser = () => {
    let { clearUserInfo } = this.props;
    clearUserInfo();
  };

  renderFormGetUserInfo = () => {
    let {
      classes,
      handleSubmit,
      isLoadUserInfo,
      pristine,
      invalid
    } = this.props;
    let xhtml = null;

    xhtml = (
      <form noValidate onSubmit={handleSubmit(this.getUserInfo)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              name="txtUsername"
              component={mui.renderTextField}
              fullWidth
              label="Tên đăng nhập"
              helperText="Có thể điền 1 thông tin hoặc cả 3 thông tin"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="txtPhoneNumber"
              component={mui.renderTextField}
              label="Số điện thoại"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="txtEmail"
              component={mui.renderTextField}
              label="Email"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Box mt={2}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SecurityIcon />}
                  disabled={pristine || invalid || isLoadUserInfo}
                >
                  Xác thực thông tin
                </Button>
                {isLoadUserInfo && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Box>
          </Grid>
        </Grid>
      </form>
    );

    return xhtml;
  };
}

const mapStateToProps = state => ({
  isLoadUserInfo: state.ui.isLoadUserInfo,
  client: state.project.client
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserInfo,
      clearUserInfo
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const validate = values => {
  const errors = {};

  let { txtUsername, txtPhoneNumber, txtEmail } = values;

  if (!txtUsername && !txtPhoneNumber && !txtEmail) {
    errors.txtEmail = "Hãy điền ít nhất 1 trong 3 thông tin của khách hàng!";
  }

  return errors;
};

const form = reduxForm({
  form: "GET_USER_INFO_FORM",
  validate
});

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, form, connectRedux)(GetUserInfoForm);
