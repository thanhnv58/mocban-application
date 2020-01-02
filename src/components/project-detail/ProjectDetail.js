import { Grid, LinearProgress } from "@material-ui/core";
import { lighten, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { compose } from "redux";
import {
  convertFrontEndDateTime,
  estimateDateTime,
  findNumberOfUsingDay
} from "../../utils/timeUtils";
import styles from "./styles";
import { getStatus } from "./../../utils/helpers";

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    backgroundColor: lighten("#b3e5fc", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#01579b"
  }
})(LinearProgress);

class ProjectDetail extends Component {
  render() {
    let { data } = this.props;
    let { status, progress, startDate, endDate, estimateDay } = data;

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={1}>
          <Typography variant="body2" component="p">
            {`Trạng thái: `}
          </Typography>
        </Grid>
        <Grid item xs={12} md={11}>
          <Typography variant="body2" component="p">
            <b>{getStatus(status)}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="body2" component="p">
            {`Tiến độ: `}
          </Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <BorderLinearProgress
            variant="determinate"
            color="secondary"
            value={progress}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Typography variant="body2" component="p">
            <b>{`${progress}%`}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component="p">
            {`Ngày bắt đầu: `} <b>{convertFrontEndDateTime(startDate)}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component="p">
            {`Ngày ước tính: `}
            <b>
              {convertFrontEndDateTime(
                estimateDateTime(startDate, estimateDay)
              )}
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component="p">
            {`Thời gian ước tính: `}
            <b>{`${estimateDay ? estimateDay : 0} ngày`}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component="p">
            {`Ngày kết thúc: `}
            <b>{convertFrontEndDateTime(endDate)}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" component="p">
            {`Số ngày thực tế đã dùng: `}
            <b>{findNumberOfUsingDay(startDate, endDate)} ngày</b>
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

// const mapStateToProps = state => ({
//   authState: state.auth
// });

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       logout
//     },
//     dispatch
//   );
// };

// const connectRedux = connect(null, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(ProjectDetail);
