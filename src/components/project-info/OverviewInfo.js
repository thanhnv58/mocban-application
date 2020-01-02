import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExtensionIcon from "@material-ui/icons/Extension";
import GamesIcon from "@material-ui/icons/Games";
import SaveIcon from "@material-ui/icons/Save";
import ToysIcon from "@material-ui/icons/Toys";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  changePhase,
  closeProject,
  updateProjectInfo
} from "../../actions/project-screen-action/actions";
import * as ProjectPhase from "../../constants/ProjectPhase";
import * as ProjectStatus from "../../constants/ProjectStatus";
import * as mui from "../../utils/mui";
import ProjectDetail from "../project-detail/ProjectDetail";
import styles from "./styles";
import { NavLink } from "react-router-dom";

class OverviewInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h1" component="h2" gutterBottom align="left">
          Thông tin tổng quan
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {this.renderProjectStatus()}
          </Grid>
          <Grid item xs={12} md={6}>
            {this.renderUserInfo()}
            {this.renderProjectTransaction()}
            {this.renderUpdateProject()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderUserInfo = () => {
    let { projectInfo, classes } = this.props;
    let { client } = projectInfo;
    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Thông tin khách hàng
        </Typography>
        <Box mt={3}></Box>
        <Grid container spacing={1}>
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
        </Grid>
      </Paper>
    );

    return xhtml;
  };

  renderProjectStatus = () => {
    let { projectInfo, classes, isCloseProject } = this.props;
    let { phase } = projectInfo;

    let xhtml = null;
    let projectDetailPropsDesign = null;
    let projectDetailPropsProduction = null;

    if (phase === ProjectPhase.EXCHANGE) {
      projectDetailPropsDesign = {
        data: null,
        title: "Thiết kế",
        helper: "Nếu trao đổi xong với khách hàng, hãy yêu cầu thiết kế",
        btnText: "Yêu cầu thiết kế",
        requestPhase: ProjectPhase.DESIGN,
        icon: <ToysIcon />
      };

      // xhtml = this.projectStatus(projectDetailPropsDesign);
    } else if (phase === ProjectPhase.REQUEST_DESIGN) {
      projectDetailPropsDesign = {
        data: projectInfo.projectDetails[0],
        title: "Thiết kế"
      };
    } else if (phase === ProjectPhase.DESIGN) {
      projectDetailPropsDesign = {
        data: projectInfo.projectDetails[0],
        title: "Thiết kế"
      };

      projectDetailPropsProduction = {
        data: null,
        title: "Sản xuất",
        helper: "Nếu đã thiết kế xong, hãy yêu cầu sản xuất",
        btnText: "Yêu cầu sản xuất",
        requestPhase: ProjectPhase.PRODUCTION,
        icon: <ExtensionIcon />
      };
    } else if (
      phase === ProjectPhase.REQUEST_PRODUCTION ||
      phase === ProjectPhase.PRODUCTION ||
      phase === ProjectPhase.DONE
    ) {
      projectDetailPropsDesign = {
        data: projectInfo.projectDetails[0],
        title: "Thiết kế"
      };

      projectDetailPropsProduction = {
        data: projectInfo.projectDetails[1],
        title: "Sản xuất"
      };
    } else if (phase === ProjectPhase.CANCEL) {
      projectDetailPropsDesign = projectInfo.projectDetails[0]
        ? {
            data: projectInfo.projectDetails[0],
            title: "Thiết kế"
          }
        : null;

      projectDetailPropsProduction = projectInfo.projectDetails[1]
        ? {
            data: projectInfo.projectDetails[1],
            title: "Sản xuất"
          }
        : null;
    } else {
      // EXCEPTION
    }

    xhtml = (
      <React.Fragment>
        {projectDetailPropsDesign &&
          this.renderProjectDetailInfo(projectDetailPropsDesign)}
        {projectDetailPropsProduction && (
          <React.Fragment>
            <Box mt={2} mb={2}>
              <Divider />
            </Box>
            {this.renderProjectDetailInfo(projectDetailPropsProduction)}
          </React.Fragment>
        )}
      </React.Fragment>
    );

    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Trạng thái dự án
        </Typography>
        <Box mt={3}></Box>
        {xhtml}
        {phase === ProjectPhase.CANCEL && (
          <React.Fragment>
            <Box m={2}>
              <Divider />
            </Box>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              style={{ color: "red" }}
            >
              Dự án này đã bị hủy!!!
            </Typography>
          </React.Fragment>
        )}
        {phase !== ProjectPhase.DONE && phase !== ProjectPhase.CANCEL && (
          <React.Fragment>
            <Box mt={3}>
              <Divider />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              {phase === ProjectPhase.PRODUCTION && (
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VerifiedUserIcon />}
                    onClick={() => {
                      this.closeProject(ProjectPhase.DONE);
                    }}
                    disabled={isCloseProject}
                    style={{ marginRight: 8 }}
                  >
                    Hoàn thành dự án
                  </Button>
                  {isCloseProject && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              )}

              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<GamesIcon />}
                  onClick={() => {
                    this.closeProject(ProjectPhase.CANCEL);
                  }}
                  disabled={isCloseProject}
                  style={{ backgroundColor: "#ec407a" }}
                >
                  Hủy dự án
                </Button>
                {isCloseProject && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    );
  };

  renderProjectTransaction = () => {
    let { classes, projectInfo } = this.props;

    return (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Giao dịch dự án
        </Typography>
        <Box mt={3} display="flex" justifyContent="center">
          <NavLink
            to={`/dashboard/transactions/project/${projectInfo.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#f06292" }}
            >
              Thống kế thu chi
            </Button>
          </NavLink>
        </Box>
        <Box mt={1} display="flex" justifyContent="center">
          <Typography variant="h6" component="p" style={{ color: "#0d47a1" }}>
            Để biết chi tiết các giao dịch
          </Typography>
        </Box>
      </Paper>
    );
  };

  closeProject = phase => {
    let { projectInfo, closeProject } = this.props;

    closeProject({
      projectId: projectInfo.id,
      phase
    });
  };

  renderProjectDetailInfo = projectDetail => {
    let { data, title } = projectDetail;
    let xhtml = null;

    if (data) {
      let { status } = data;

      if (status === ProjectStatus.UN_CONFIRM) {
        xhtml = (
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" component="p">
                Yêu cầu đã được chuyển đến kỹ thuật viên, hãy đợi họ
                <b style={{ color: "red" }}>{` xác nhận công việc`}</b>!
              </Typography>
            </Grid>
          </Grid>
        );
      } else {
        xhtml = <ProjectDetail data={data} />;
      }
    } else {
      xhtml = this.renderRequestPhase(projectDetail);
    }

    return (
      <React.Fragment>
        <Typography component="h6" variant="h5">
          {title}
        </Typography>
        <Box ml={2} mt={1}>
          {xhtml}
        </Box>
      </React.Fragment>
    );
  };

  renderRequestPhase = projectDetail => {
    let { classes, isChangePhase } = this.props;
    let { helper, icon, requestPhase, btnText } = projectDetail;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Typography variant="body2" component="p">
            {helper}
          </Typography>
        </Grid>
        <Grid item>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              startIcon={icon}
              onClick={v => {
                this.requestNextPhase(requestPhase);
              }}
              disabled={isChangePhase}
            >
              {btnText}
            </Button>
            {isChangePhase && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </Grid>
    );
  };

  requestNextPhase = phase => {
    let { projectInfo, changePhase } = this.props;
    let { id } = projectInfo;

    changePhase({
      projectId: id,
      phase
    });
  };

  updateProject = values => {
    let { txtName, txtLocation, txtCustomerRequest, txtNote } = values;
    let { projectInfo, updateProjectInfo } = this.props;

    const requestDto = {
      projectId: projectInfo.id,
      name: txtName,
      customerRequest: txtCustomerRequest,
      note: txtNote,
      location: txtLocation
    };

    updateProjectInfo(requestDto);
  };

  renderUpdateProject = () => {
    let {
      handleSubmit,
      classes,
      isUpdateProjectInfo,
      invalid,
      pristine
    } = this.props;

    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Thông tin dự án
        </Typography>
        <form onSubmit={handleSubmit(this.updateProject)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Field
                name="txtName"
                component={mui.renderTextField}
                label="Tên dự án"
                multiline
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Field
                name="txtLocation"
                component={mui.renderTextField}
                label="Địa điểm"
                multiline
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body2" component="p">
                {`Yêu cầu khách hàng: `}
              </Typography>
              <Field
                name="txtCustomerRequest"
                component={mui.renderTextField}
                multiline
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Typography variant="body2" component="p">
                {`Ghi chú: `}
              </Typography>
              <Field
                name="txtNote"
                component={mui.renderTextField}
                multiline
                fullWidth
              />
            </Grid>

            <Grid item>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  disabled={isUpdateProjectInfo || invalid || pristine}
                >
                  Lưu thay đổi
                </Button>
                {isUpdateProjectInfo && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="body2" component="p">
                {
                  "Nếu muốn chỉnh sửa thông thông tin thì hãy sửa và nhấn nút 'Lưu thay đổi'"
                }
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Paper>
    );

    return xhtml;
  };
}

const mapStateToProps = state => ({
  isUpdateProjectInfo: state.ui.isUpdateProjectInfo,
  isCloseProject: state.ui.isCloseProject,
  isChangePhase: state.ui.isChangePhase,
  projectInfo: state.projectInfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateProjectInfo,
      changePhase,
      closeProject
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const validate = values => {
  const errors = {};

  let { txtName, txtLocation, txtCustomerRequest } = values;

  if (!txtName) {
    errors.txtName = "Nhập tên dự án!";
  }

  if (!txtLocation) {
    errors.txtLocation = "Nhập vị trí công trình!";
  }

  if (!txtCustomerRequest) {
    errors.txtCustomerRequest = "Hãy điền yêu cầu khách hàng!";
  }

  return errors;
};

const form = reduxForm({
  form: "UPDATE_PROJECT_FORM",
  validate,
  enableReinitialize: true
});

const withMyStyle = withStyles(styles);
export default compose(withMyStyle, form, connectRedux)(OverviewInfo);
