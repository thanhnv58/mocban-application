import {
  Button,
  Grid,
  InputAdornment,
  Typography,
  MenuItem
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { updateProjectDetail } from "../../actions/project-screen-action/actions";
import * as mui from "../../utils/mui";
import styles from "./styles";
import * as ProjectStatus from "../../constants/ProjectStatus";
import { getStatus } from "./../../utils/helpers";

class UpdateProjectDetailForm2 extends Component {
  updateDesignStatus = values => {
    let { txtStatus, txtProgress, txtNote } = values;
    let { updateProjectDetail, projectDetailId } = this.props;

    updateProjectDetail({
      projectDetailId: projectDetailId,
      status: txtStatus,
      progress: txtProgress,
      note: txtNote
    });
  };

  changeStatus = e => {
    let { target } = e;
    let { value, name } = target;
    if (name === "txtStatus") {
      this.setState({
        isConfirm: value === ProjectStatus.CONFIRM
      });
    }
  };

  constructor(props) {
    super(props);
    let { initialValues } = this.props;
    let { txtStatus } = initialValues;

    this.state = {
      isConfirm: txtStatus === ProjectStatus.CONFIRM
    };
  }

  render() {
    let {
      handleSubmit,
      classes,
      pristine,
      invalid,
      isUpdateProjectDetail
    } = this.props;

    let { isConfirm } = this.state;

    return (
      <form onSubmit={handleSubmit(this.updateDesignStatus)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Field
              name="txtStatus"
              classFormControl={classes.formControl}
              label="Trạng thái công việc"
              component={mui.renderSelectField}
              onChange={this.changeStatus}
            >
              {this.listStatus()}
            </Field>
          </Grid>

          <Grid item xs={12} md={6}>
            <Field
              name="txtProgress"
              component={mui.renderTextField}
              label="Tiến độ công việc"
              type="number"
              fullWidth
              disabled={isConfirm}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                )
              }}
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
                disabled={isUpdateProjectDetail || invalid || pristine}
              >
                Cập nhật tiến độ
              </Button>
              {isUpdateProjectDetail && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }

  listStatus = () => {
    let listStatus = [
      ProjectStatus.CONFIRM,
      ProjectStatus.IN_PROGRESS,
      ProjectStatus.RESOLVE
    ];

    return listStatus.map((s, i) => {
      return (
        <MenuItem key={i} value={s}>
          {getStatus(s)}
        </MenuItem>
      );
    });
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = state => ({
  isUpdateProjectDetail: state.ui.isUpdateProjectDetail
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateProjectDetail
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const validate = values => {
  const errors = {};

  let { txtProgress } = values;

  if (txtProgress) {
    if (txtProgress < 0 || txtProgress > 100) {
      errors.txtProgress = "Tiến độ từ 0 đên 100 %!";
    }
  }

  return errors;
};

const updateForm = reduxForm({
  form: "UPDATE_PROJECT_DETAIL_FORM_2",
  validate,
  enableReinitialize: true
});

export default compose(
  withMyStyle,
  connectRedux,
  updateForm
)(UpdateProjectDetailForm2);
