import { Grid, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  getUserDetail,
  updateUser,
  getPassword
} from "../../../actions/manager/user-screen-action/actions";
import Copyright from "../../../components/Copyright";
import styles from "./styles";
import UpdateUserForm from "../../../components/user-form/UpdateUserForm";

class DetailUserScreen extends Component {
  componentDidMount() {
    let { username, getUserDetail, userDetail } = this.props;

    if (userDetail === null || userDetail.username !== username) {
      getUserDetail(username);
    }
  }

  render() {
    let { isLoading1, userDetail } = this.props;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (!userDetail) {
      return null;
    }

    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          <b>Thông tin người dùng</b>
        </Typography>

        <Box mt={3} mb={4} ml={2} mr={2}>
          {this.renderClientInfo()}
        </Box>

        <Box mt={3} mb={4} ml={2} mr={2}>
          {this.renderUpdateUserForm()}
        </Box>

        <Box mt={3} mb={4} ml={2} mr={2}>
          {this.renderGetPassword()}
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderClientInfo = () => {
    let { userDetail, classes } = this.props;

    return (
      <Grid container spacing={1}>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Mã khách hàng: `}
            <b
              className={classes.textContentColor}
            >{`${userDetail.username}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Họ và tên: `}
            <b
              className={classes.textContentColor}
            >{`${userDetail.fullName}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Số điện thoại: `}
            <b
              className={classes.textContentColor}
            >{`${userDetail.phoneNumber}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Email: `}
            <b className={classes.textContentColor}>{`${userDetail.email}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={12}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Địa chỉ nhà: `}
            <b
              className={classes.textContentColor}
            >{`${userDetail.address}`}</b>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  renderUpdateUserForm = () => {
    let { userDetail, updateUser, isLoading2 } = this.props;

    let initialValues = {
      txtPhoneNumber: userDetail.phoneNumber,
      txtAddress: userDetail.address
    };

    return (
      <UpdateUserForm
        initialValues={initialValues}
        updateUser={updateUser}
        isLoading={isLoading2}
        userId={userDetail.id}
      />
    );
  };

  renderGetPassword = () => {
    let { isLoading3, classes, userDetail } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <div className={classes.wrapper}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={this.getPassword}
              disabled={isLoading3}
            >
              Lấy mật khẩu
            </Button>
            {isLoading3 && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {userDetail.password && <b>{userDetail.password}</b>}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  getPassword = () => {
    let { userDetail, getPassword } = this.props;

    getPassword({
      username: userDetail.username
    });
  };
}

const mapStateToProps = state => ({
  userDetail: state.managerReducer.userDetail,
  isLoading1: state.managerReducer.ui.isLoading1,
  isLoading2: state.managerReducer.ui.isLoading2,
  isLoading3: state.managerReducer.ui.isLoading3
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUserDetail,
      updateUser,
      getPassword
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(DetailUserScreen);
