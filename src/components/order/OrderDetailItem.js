import {
  Box,
  Grid,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { convertFrontEndDateTime } from "../../utils/timeUtils";
import { updateOrder } from "../../actions/sale/order-management/actions";
import * as OrderStatus from "../../constants/OrderStatus";
import * as OrderType from "../../constants/OrderType";
import { helpers_toStringOrderStatus } from "../../utils/helpers";
import styles from "./styles";

const stepsForDesign1 = [
  helpers_toStringOrderStatus(OrderStatus.INIT),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_1),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_1_OK),
  helpers_toStringOrderStatus(OrderStatus.DESIGN_IN_PROGRESS),
];

const stepsForDesign21 = [
  helpers_toStringOrderStatus(OrderStatus.DESIGN_DONE),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_2),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_2_OK),
  helpers_toStringOrderStatus(OrderStatus.FINISH),
];

const stepsForDesign22 = [
  helpers_toStringOrderStatus(OrderStatus.DESIGN_DONE),
  helpers_toStringOrderStatus(OrderStatus.TO_PRODUCE),
];

const stepsForProduct1 = [
  helpers_toStringOrderStatus(OrderStatus.INIT),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_1),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_1_OK),
  helpers_toStringOrderStatus(OrderStatus.PRODUCE_IN_PROGRESS),
];

const stepsForProduct2 = [
  helpers_toStringOrderStatus(OrderStatus.PRODUCE_DONE),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_2),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_2_OK),
  helpers_toStringOrderStatus(OrderStatus.COMPLETE_IN_PROGRESS),
];

const stepsForProduct3 = [
  helpers_toStringOrderStatus(OrderStatus.COMPLETE_DONE),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_3),
  helpers_toStringOrderStatus(OrderStatus.PAYMENT_3_OK),
  helpers_toStringOrderStatus(OrderStatus.FINISH),
];

class OrderDetailItem extends Component {
  constructor(props) {
    super(props);

    let { order } = this.props;

    this.state = {
      order,
      txtNote: order ? order.note : "",
      isChange: false,
    };
  }

  componentDidMount() {
    let { order } = this.state;

    if (order) {
      this.setActiveStep(order.status, order.type);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let orderNextProps = nextProps.order;

    if (orderNextProps) {
      this.setActiveStep(orderNextProps.status, orderNextProps.type);

      this.setState({
        order: orderNextProps,
      });
    }
  }

  setActiveStep = (status, type) => {
    let activeStep = this.getActiveStep(status, type);
    this.setState({
      activeStep1: activeStep > 3 ? 4 : activeStep,
      activeStep2: activeStep > 7 ? 4 : activeStep - 4,
      activeStep3: activeStep > 11 ? 4 : activeStep - 8,
    });
  };

  getActiveStep = (step, type) => {
    switch (step) {
      case OrderStatus.INIT:
        return 1;
      case OrderStatus.PAYMENT_1:
        return 2;
      case OrderStatus.PAYMENT_1_OK:
        return 3;
      case OrderStatus.DESIGN_IN_PROGRESS:
        return 3;
      case OrderStatus.DESIGN_DONE:
        return 5;

      case OrderStatus.PAYMENT_2:
        return 6;
      case OrderStatus.PAYMENT_2_OK:
        if (type === OrderType.DESIGN) {
          return 8;
        } else {
          return 7;
        }

      case OrderStatus.FINISH:
        return 12;

      case OrderStatus.TO_PRODUCE:
        return 12;

      case OrderStatus.PRODUCE_IN_PROGRESS:
        return 3;
      case OrderStatus.PRODUCE_DONE:
        return 5;

      case OrderStatus.COMPLETE_IN_PROGRESS:
        return 7;
      case OrderStatus.COMPLETE_DONE:
        return 9;
      case OrderStatus.PAYMENT_3:
        return 10;
      case OrderStatus.PAYMENT_3_OK:
        return 12;
      default:
        return 0;
    }
  };

  render() {
    let { order } = this.state;

    if (!order) {
      return null;
    }

    let {
      txtNote,
      activeStep1,
      activeStep2,
      activeStep3,
      isChange,
    } = this.state;
    let { isLoading4, classes } = this.props;

    let steps1;
    let steps2;
    let steps3;

    if (order.type === OrderType.DESIGN) {
      steps1 = stepsForDesign1;
      steps2 =
        order.status === OrderStatus.TO_PRODUCE
          ? stepsForDesign22
          : stepsForDesign21;
    } else {
      steps1 = stepsForProduct1;
      steps2 = stepsForProduct2;
      steps3 = stepsForProduct3;
    }

    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Stepper activeStep={activeStep1}>
              {steps1.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Stepper activeStep={activeStep2}>
              {steps2.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          {order.type === OrderType.PRODUCT && (
            <Grid item xs={12} lg={12}>
              <Stepper activeStep={activeStep3}>
                {steps3.map((label, index) => {
                  return (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </Grid>
          )}
        </Grid>
        <Box mb={3} />
        <Grid container spacing={1}>
          <Grid item xs={6} lg={2}>
            Mã đơn hàng:
          </Grid>
          <Grid item xs={6} lg={4}>
            <b>{order.code}</b>
          </Grid>

          <Grid item xs={6} lg={2}>
            Loại đơn hàng:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.type}
          </Grid>

          <Grid item xs={6} lg={2}>
            Địa chỉ:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.location}
          </Grid>
          <Grid item xs={6} lg={2}>
            Người liên lạc:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.contact}
          </Grid>

          <Grid item xs={6} lg={2}>
            Ngày bắt đầu:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.startDate
              ? convertFrontEndDateTime(order.startDate)
              : "--:--"}
          </Grid>

          <Grid item xs={6} lg={2}>
            Ngày hoàn thành:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.endDate ? convertFrontEndDateTime(order.endDate) : "--:--"}
          </Grid>

          <Grid item xs={6} lg={2}>
            Thời gian:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.numberOfDay ? order.numberOfDay : "-.-"} ngày
          </Grid>
          <Grid item xs={6} lg={2}>
            Tiến độ:
          </Grid>
          <Grid item xs={6} lg={4}>
            {order.progress ? order.progress : "-.-"} %
          </Grid>

          <Grid item xs={12} lg={2}>
            Ghi chú:
          </Grid>
          <Grid item xs={12} lg={10}>
            <TextField
              name="txtNote"
              multiline
              rows="5"
              rowsMax="10"
              defaultValue={txtNote}
              onChange={this.handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={2}></Grid>
          <Grid item xs={12} lg={10}>
            <div className={classes.wrapper}>
              <Button
                className="btn-orange"
                color="primary"
                variant="contained"
                disabled={isLoading4 || !isChange}
                onClick={this.updateOrderNote}
              >
                Cập nhật
              </Button>
              {isLoading4 && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  handleChange = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
      isChange: true,
    });
  };

  updateOrderNote = () => {
    let { txtNote, order } = this.state;

    let { updateOrder } = this.props;

    updateOrder(order.idOrder, {
      note: txtNote,
    });

    this.setState({
      isChange: false,
    });
  };
}

const mapStateToProps = (state) => ({
  isLoading4: state.saleReducer.ui.isLoading4,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateOrder,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(OrderDetailItem);
