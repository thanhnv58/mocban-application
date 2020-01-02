import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import { DatePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { confirmWork } from "./../../actions/project-screen-action/actions";
import * as mui from "./../../utils/mui";
import * as timeUtils from "./../../utils/timeUtils";
import styles from "./styles";
import * as ProjectPhase from "./../../constants/ProjectPhase";

class ConfirmWorkForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmStartDate: new Date()
    };
  }

  render() {
    let {
      classes,
      handleSubmit,
      invalid,
      pristine,
      isConfirmWork
    } = this.props;
    let { confirmStartDate } = this.state;

    return (
      <form onSubmit={handleSubmit(this.confirmWork)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Ngày bắt đầu"
              fullWidth
              required
              format="EEE - dd/MM/yyyy"
              value={confirmStartDate}
              onChange={this.handleDateChange}
              animateYearScrolling
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Field
              name="txtEstimateDay"
              component={mui.renderTextField}
              label="Số ngày ước lượng"
              type="number"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">ngày</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item>
            <Box mt={2}>
              <div className={classes.wrapper}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<OfflineBoltIcon />}
                  disabled={isConfirmWork || invalid || pristine}
                >
                  Xác nhận công việc
                </Button>
                {isConfirmWork && (
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
  }

  confirmWork = values => {
    let { txtEstimateDay } = values;
    let { confirmStartDate } = this.state;
    let { confirmWork, projectDetailId } = this.props;

    confirmWork(
      {
        projectDetailId: projectDetailId,
        startDate: timeUtils.parseDateTime(confirmStartDate),
        estimateDay: txtEstimateDay
      },
      ProjectPhase.DESIGN
    );
  };

  handleDateChange = date => {
    this.setState({
      confirmStartDate: date
    });
  };
}

const mapStateToProps = state => ({
  isConfirmWork: state.ui.isConfirmWork
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      confirmWork
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const validate = values => {
  const errors = {};

  let { txtEstimateDay } = values;

  if (!txtEstimateDay) {
    errors.txtEstimateDay = "Nhập thời gian ước lượng!";
  } else {
    if (txtEstimateDay < 1 || txtEstimateDay > 1000) {
      errors.txtEstimateDay = "Nhập thời gian từ 1 đến 1000!";
    }
  }

  return errors;
};

const form = reduxForm({
  form: "CONFIRM_WORK_FORM",
  validate,
  enableReinitialize: true
});

const withMyStyle = withStyles(styles);
export default compose(withMyStyle, connectRedux, form)(ConfirmWorkForm);
