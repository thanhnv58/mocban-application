import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { createProject } from "../../actions/project-screen-action/actions";
import * as mui from "./../../utils/mui";
import styles from "./styles";
import { DatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import * as timeUtils from "./../../utils/timeUtils";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date()
    };
  }

  createProject = values => {
    let { txtName, txtLocation, txtCustomerRequest, txtNote } = values;

    let { selectedDate } = this.state;
    let { client, createProject } = this.props;

    let userRequestDto = {
      name: txtName,
      clientId: client.id,
      startDate: timeUtils.parseDateTime(selectedDate),
      customerRequest: txtCustomerRequest,
      note: txtNote,
      location: txtLocation
    };

    createProject(userRequestDto);
  };

  handleDateChange = date => {
    this.setState({
      selectedDate: date
    });
  };

  render() {
    let { selectedDate } = this.state;

    let {
      handleSubmit,
      classes,
      pristine,
      invalid,
      isCreateProjectFormSubmit
    } = this.props;

    return (
      <React.Fragment>
        <Box mt={2}>
          <Typography variant="h6" gutterBottom>
            Thông tin dự án
          </Typography>
        </Box>
        <form noValidate onSubmit={handleSubmit(this.createProject)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field
                name="txtName"
                component={mui.renderTextField}
                fullWidth
                required
                label="Tên dự án"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Ngày bắt đầu"
                fullWidth
                required
                format="dd-MM-yyyy"
                value={selectedDate}
                onChange={this.handleDateChange}
                animateYearScrolling
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="txtLocation"
                component={mui.renderTextField}
                label="Địa chỉ công trình"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="txtCustomerRequest"
                component={mui.renderTextField}
                label="Yêu cầu khách hàng"
                multiline
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="txtNote"
                component={mui.renderTextField}
                label="Ghi chú"
                multiline
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
                    startIcon={<AddIcon />}
                    disabled={isCreateProjectFormSubmit || invalid || pristine}
                  >
                    Tạo dự án
                  </Button>
                  {isCreateProjectFormSubmit && (
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isCreateProjectFormSubmit: state.ui.isCreateProjectFormSubmit,
  client: state.project.client
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createProject
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
  form: "CREATE_PROJECT_FORM",
  validate
});

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, form, connectRedux)(Form);
