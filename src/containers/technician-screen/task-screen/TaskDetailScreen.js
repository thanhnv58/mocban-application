import { Divider, Grid, Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getTaskDetail } from "../../../actions/technician/task-screen-action/actions";
import Copyright from "../../../components/Copyright";
import TaskDetailComponent from "../../../components/order/TaskDetailComponent";
import styles from "./styles";
import TaskProgressForm from "../../../components/order/TaskProgressForm";

class TaskDetailScreen extends Component {
  componentDidMount() {
    let { getTaskDetail, taskDetail, orderId } = this.props;

    if (!taskDetail || taskDetail.id !== parseInt(orderId)) {
      getTaskDetail(parseInt(orderId));
    }
  }

  render() {
    let { isLoading1, taskDetail } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6">Chi tiết công việc</Typography>

        {isLoading1 && (
          <Box display="flex" justifyContent="center" mt={3} mb={4}>
            <CircularProgress />
          </Box>
        )}

        {isLoading1 === false && taskDetail && (
          <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={4}
            ml={3}
            mr={3}
          >
            {this.renderTaskDetail()}
          </Box>
        )}
        <Copyright />
      </React.Fragment>
    );
  }

  renderTaskDetail = () => {
    let { taskDetail, classes } = this.props;

    let initialValues = {
      txtProgress: taskDetail.progress ? taskDetail.progress : 0,
      txtEstimateDay: taskDetail.estimateDay ? taskDetail.estimateDay : 0
    };

    return (
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} lg={12}>
          <TaskDetailComponent taskDetail={taskDetail} />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.container}
          >
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" align="left">
                <b>Cập nhật tiến độ</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box ml={2}>
                <TaskProgressForm
                  initialValues={initialValues}
                  taskId={taskDetail.id}
                  status={taskDetail.status}
                  items={taskDetail.items ? taskDetail.items : []}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };
}

const mapStateToProps = state => ({
  taskDetail: state.technicianReducer.taskDetail,
  isLoading1: state.technicianReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTaskDetail
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(TaskDetailScreen);
