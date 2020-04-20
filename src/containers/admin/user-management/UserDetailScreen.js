import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import {
  getUserDetail,
  showUpdateUser,
  deleteUser,
  resetUserPass,
} from "../../../actions/admin/user-management/actions";
import { timeUtils_parseDateTime2 } from "../../../utils/timeUtils";
import UpdateUserForm from "../../../components/user-form/UpdateUserForm";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";

class UserDetailScreen extends Component {
  constructor(props) {
    super(props);

    let { isShowUpdateUser } = props;

    this.state = {
      showUpdateForm: isShowUpdateUser,
    };
  }

  componentDidMount() {
    let { getUserDetail, idUser, userDetail } = this.props;

    if (!userDetail || parseInt(userDetail.idUser) !== parseInt(idUser)) {
      getUserDetail(idUser);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { isShowUpdateUser } = nextProps;

    if (typeof isShowUpdateUser === "boolean") {
      this.setState({
        showUpdateForm: isShowUpdateUser,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          Chi tiết khách hàng
        </Typography>

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_userDetail()}
        </Box>

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_userUpdate()}
        </Box>
        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_userDelete()}
        </Box>
        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_userReset()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  render_userDetail = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      let { userDetail } = this.props;

      if (!userDetail) {
        return null;
      } else {
        return (
          <React.Fragment>
            <b>Thông tin cá nhân</b>
            <Box ml={2} mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={2}>
                  Họ tên:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{userDetail.fullName}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Số ĐT:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{userDetail.phoneNumber}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Địa chỉ:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {userDetail.address}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Email:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {userDetail.email}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Username:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{userDetail.username}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Chức năng:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b className="color-blue">
                    {userDetail.roles.map((r) => r + ", ")}
                  </b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Ngày tạo:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {timeUtils_parseDateTime2(userDetail.createdDate)}
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_userUpdate = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { userDetail } = this.props;

      if (!userDetail) {
        return null;
      } else {
        let { showUpdateForm } = this.state;

        let initialValues = {
          txtFullName: userDetail.fullName,
          txtPhoneNumber: userDetail.phoneNumber,
          txtEmail: userDetail.email,
          txtAddress: userDetail.address,
        };

        return (
          <React.Fragment>
            <b>Cập nhật thông tin</b>
            <Box ml={2} mt={1}>
              {showUpdateForm ? (
                <UpdateUserForm
                  initialValues={initialValues}
                  roles={userDetail.roles}
                  idUser={userDetail.idUser}
                  username={userDetail.username}
                />
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className="btn-orange"
                  onClick={this.showUpdateForm}
                >
                  Cập nhật
                </Button>
              )}
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_userDelete = () => {
    let { isLoading1, isLoading3 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { userDetail } = this.props;

      if (!userDetail) {
        return null;
      } else {
        return (
          <React.Fragment>
            <b>Xóa user</b>
            <Box ml={2} mt={1}>
              <Button
                variant="contained"
                color="primary"
                className="btn-red"
                onClick={this.deleteUser}
                startIcon={<DeleteIcon />}
                disabled={isLoading3}
              >
                Xóa
              </Button>
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_userReset = () => {
    let { isLoading1, isLoading4 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { userDetail } = this.props;

      if (!userDetail) {
        return null;
      } else {
        return (
          <React.Fragment>
            <b>Reset password</b>
            <Box ml={2} mt={1}>
              <Button
                variant="contained"
                color="primary"
                className="btn-blue"
                onClick={this.resetUserPassword}
                startIcon={<LockIcon />}
                disabled={isLoading4}
              >
                Reset
              </Button>
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  showUpdateForm = () => {
    let { showUpdateUser } = this.props;
    showUpdateUser();
  };

  deleteUser = () => {
    let { deleteUser, idUser } = this.props;
    deleteUser(idUser);
  };

  resetUserPassword = () => {
    let { resetUserPass, idUser } = this.props;
    resetUserPass(idUser);
  };
}

const mapStateToProps = (state) => ({
  userDetail: state.adminReducer.userDetail,
  isLoading1: state.adminReducer.ui.isLoading1,
  isLoading3: state.adminReducer.ui.isLoading3,
  isLoading4: state.adminReducer.ui.isLoading4,
  isShowUpdateUser: state.adminReducer.ui.isShowUpdateUser,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserDetail,
      showUpdateUser,
      deleteUser,
      resetUserPass,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(UserDetailScreen);
