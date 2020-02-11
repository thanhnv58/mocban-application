import { Box, Grid, LinearProgress, Paper, TextField } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { lighten, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { compose } from "redux";
import { getOrderType, getTaskColor, getTaskStatus } from "../../utils/helpers";
import {
  convertFrontEndDateTime,
  convertFrontEndDateTime2
} from "../../utils/timeUtils";
import styles from "./styles";
import "./style.css";

class TaskDetailComponent extends Component {
  render() {
    let { classes } = this.props;

    return (
      <Grid
        container
        spacing={1}
        component={Paper}
        className={classes.container}
      >
        <Grid item xs={12} lg={12}>
          <Typography variant="body1" align="left">
            <b>Mô tả</b>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box mt={1} mb={1}>
            <Divider />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12}>
          {this.renderTaskInfo()}
        </Grid>

        <Grid item xs={12} lg={12}>
          {this.renderTaskStatus()}
        </Grid>
      </Grid>
    );
  }

  renderTaskInfo = () => {
    let { taskDetail, classes } = this.props;

    return (
      <Box ml={2}>
        <Grid container spacing={1}>
          <Grid item ms={12} lg={4}>
            <Typography variant="body2" color="textSecondary">
              {`Loại đơn hàng: `}
              <b className={classes.textContentColor}>{`${getOrderType(
                taskDetail.orderType
              )}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={8}>
            <Typography variant="body2" color="textSecondary">
              {`SĐT người liên hệ tại công trình: `}
              <b
                className={classes.textContentColor}
              >{`${taskDetail.clientContact}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={4}>
            <Typography variant="body2" color="textSecondary">
              {`Ngày tạo đơn hàng: `}
              <b
                className={classes.textContentColor}
              >{`${convertFrontEndDateTime2(taskDetail.createdDate)}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={8}>
            <Typography variant="body2" color="textSecondary">
              {`Địa chỉ công trình: `}
              <b
                className={classes.textContentColor}
              >{`${taskDetail.location}`}</b>
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`Yêu cầu khách hàng: `}</Typography>
          </Grid>
          <Grid item ms={12} lg={12}>
            <Box ml={2} mr={2}>
              <TextField
                id="clientRequire"
                multiline
                rows="8"
                fullWidth
                style={{ color: "red" }}
                defaultValue={taskDetail.note}
                InputProps={{
                  readOnly: true
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  renderTaskStatus = () => {
    let { taskDetail, classes } = this.props;
    let { startDate, endDate, estimateDay, status, progress } = taskDetail;

    return (
      <Box ml={2} mt={2}>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item ms={12} lg={12}>
            <Typography variant="body2" color="textSecondary" component="span">
              {`Trạng thái công việc: `}
              <b style={{ color: getTaskColor(status) }}>{`${getTaskStatus(
                status
              )}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={4}>
            <Typography variant="body2" color="textSecondary">
              {`Ngày bắt đầu làm: `}
              <b
                className={classes.textContentColor}
              >{`${convertFrontEndDateTime(startDate)}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={4}>
            <Typography variant="body2" color="textSecondary">
              {`Ngày hoàn thành: `}
              <b
                className={classes.textContentColor}
              >{`${convertFrontEndDateTime(endDate)}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} lg={4}>
            <Typography variant="body2" color="textSecondary">
              {`Số ngày ước tính: `}
              <b className={classes.textContentColor}>{`${
                estimateDay ? estimateDay : "N/A"
              } ngày`}</b>
            </Typography>
          </Grid>

          <Grid item ms={12} lg={2}>
            <Typography variant="body2" color="textSecondary">
              {`Tiến độ công việc: `}
            </Typography>
          </Grid>
          <Grid item ms={10} lg={9}>
            <BorderLinearProgress
              variant="determinate"
              value={progress ? progress : 0}
            />
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              <b className={classes.textContentColor}>{`${
                progress ? progress : 0
              }%`}</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(TaskDetailComponent);

const BorderLinearProgress = withStyles({
  root: {
    height: 15,
    backgroundColor: lighten("#ff6f00", 0.8)
  },
  bar: {
    borderRadius: 15,
    backgroundColor: "#ff6f00"
  }
})(LinearProgress);
