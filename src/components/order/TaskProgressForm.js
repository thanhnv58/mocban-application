import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Divider
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import BuildIcon from "@material-ui/icons/Build";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import {
  updateProgressTask,
  updateItems
} from "../../actions/technician/task-screen-action/actions";
import * as OrderStatus from "../../constants/OrderStatus";
import { getTaskStatus } from "../../utils/helpers";
import { findIndexOfElementInArray } from "../../utils/arrayUtils";

import * as mui from "../../utils/mui";
import * as ItemStatus from "./../../constants/ItemStatus";
import styles from "./styles";

class TaskProgressForm extends Component {
  constructor(props) {
    super(props);

    let { status, items } = this.props;

    this.state = {
      radioStatus: status,
      listItem: items
    };
  }

  render() {
    let { handleSubmit, classes, invalid, isLoading2, pristine } = this.props;

    let { radioStatus, listItem } = this.state;

    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.updateDesignStatus)}>
          <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} lg={3}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Trạng thái công việc</FormLabel>
                <RadioGroup
                  name="radioStatus"
                  value={radioStatus}
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value={OrderStatus.IN_PROGRESS}
                    control={<Radio />}
                    label={getTaskStatus(OrderStatus.IN_PROGRESS)}
                  />
                  <FormControlLabel
                    value={OrderStatus.DONE}
                    control={<Radio />}
                    label={getTaskStatus(OrderStatus.DONE)}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={6} lg={2}>
              <Field
                name="txtProgress"
                component={mui.renderTextField}
                label="Tiến độ công việc"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6} lg={3}>
              <Field
                name="txtEstimateDay"
                component={mui.renderTextField}
                label="Ước lượng thời gian(đv: ngày)"
                type="number"
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
                  disabled={isLoading2 || invalid || pristine}
                >
                  Cập nhật tiến độ
                </Button>
                {isLoading2 && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </Grid>
        </form>
        <Box mt={3}></Box>
        <Divider />
        {listItem.length > 0 && (
          <Box mt={2} mr={2}>
            <Typography variant="body2" color="textSecondary">
              {`Danh sách đồ dùng: `}
            </Typography>
            {this.renderListItem()}
          </Box>
        )}
      </React.Fragment>
    );
  }

  renderListItem = () => {
    let { listItem } = this.state;
    let { classes, isLoading3 } = this.props;

    return (
      <TableContainer>
        <Table>
          <TableBody>
            {listItem.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align="left">
                  <b>{index + 1}</b>
                </TableCell>
                <TableCell align="left">
                  <b>{item.name}</b>
                </TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={item.status === ItemStatus.DONE}
                    value="secondary"
                    color="primary"
                    onChange={e => {
                      this.checkItem(item.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} />
              <TableCell align="center">
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={isLoading3}
                    startIcon={<BuildIcon />}
                    onClick={this.updateItems}
                  >
                    Cập nhật đồ
                  </Button>
                  {isLoading3 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  updateItems = () => {
    let { listItem } = this.state;
    let { updateItems, taskId } = this.props;

    updateItems({
      orderId: taskId,
      items: listItem
    });
  };

  checkItem = itemId => {
    let { listItem } = this.state;
    let index = findIndexOfElementInArray(listItem, i => {
      return i.id === itemId;
    });

    if (index !== -1) {
      listItem[index] = {
        ...listItem[index],
        status:
          listItem[index].status === ItemStatus.DONE
            ? ItemStatus.NOT_DONE
            : ItemStatus.DONE
      };

      this.setState({
        listItem: [...listItem]
      });
    }
  };

  handleChange = event => {
    let { target } = event;
    let { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  updateDesignStatus = values => {
    let { updateProgressTask, taskId } = this.props;

    let { radioStatus } = this.state;
    let { txtProgress, txtEstimateDay } = values;

    updateProgressTask({
      orderId: taskId,
      status: radioStatus,
      progress: parseInt(txtProgress),
      estimateDay: parseInt(txtEstimateDay)
    });
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = state => ({
  isLoading2: state.technicianReducer.ui.isLoading2,
  isLoading3: state.technicianReducer.ui.isLoading3
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateProgressTask,
      updateItems
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
  form: "TASK_PROCESS_FORM",
  validate,
  enableReinitialize: true
});

export default compose(withMyStyle, connectRedux, updateForm)(TaskProgressForm);
