import {
  Box,
  Grid,
  LinearProgress,
  List,
  Step,
  StepButton,
  StepConnector,
  Stepper,
  Typography
} from "@material-ui/core";
import { lighten, withStyles } from "@material-ui/core/styles";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CheckIcon from "@material-ui/icons/Check";
import SecurityIcon from "@material-ui/icons/Security";
import PanToolIcon from "@material-ui/icons/PanTool";
import React, { Component } from "react";
import { compose } from "redux";
import * as ItemStatus from "./../../constants/ItemStatus";
import * as OrderStatus from "./../../constants/OrderStatus";
import {
  getCurrency,
  getOrderType,
  getOrderStatus
} from "./../../utils/helpers";
import {
  convertFrontEndDateTime,
  convertFrontEndDateTime2
} from "./../../utils/timeUtils";
import styles from "./styles";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  active: {
    "& $line": {
      borderColor: "#5c6bc0"
    }
  },
  completed: {
    "& $line": {
      borderColor: "#5c6bc0"
    }
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1
  }
})(StepConnector);

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

class OrderSteperView extends Component {
  constructor(props) {
    super(props);

    let { orderDetail } = this.props;
    let { status } = orderDetail;

    let completedStepArr = [0];
    let isDoing = 1;

    if (status === OrderStatus.VALIDATE_TRUE) {
      completedStepArr.push(1);
      isDoing = 2;

      if (status === OrderStatus.DONE) {
        completedStepArr.push(2);
      }
    }

    this.state = {
      activeStep: isDoing === 2 && completedStepArr.length === 3 ? 0 : isDoing,
      isDoing: isDoing,
      completed: new Set(completedStepArr)
    };
  }

  render() {
    let { activeStep, isDoing } = this.state;

    const steps = this.getSteps();

    return (
      <React.Fragment>
        <Stepper
          alternativeLabel
          activeStep={isDoing}
          connector={<QontoConnector />}
        >
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepButton
                  onClick={e => {
                    this.handleStep(index);
                  }}
                  completed={this.isStepComplete(index)}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <Box ml={2} mr={2}>
          {this.getStepContent(activeStep)}
        </Box>
      </React.Fragment>
    );
  }

  getSteps = () => {
    return ["Tạo đơn hàng", "Xác thực đơn hàng", "Thực hiện đơn hàng"];
  };

  getStepContent = step => {
    let { isDoing } = this.state;

    if (step > isDoing) {
      step = isDoing;
    }

    switch (step) {
      case 0:
        return this.renderStepCreateOrder();
      case 1:
        return this.renderStepValidateOrder();
      case 2:
        return this.renderStepPerformOrder();
      default:
        return "Unknown step";
    }
  };

  renderStepPerformOrder = () => {
    let { orderDetail, classes } = this.props;
    let {
      items,
      startDate,
      endDate,
      estimateDay,
      status,
      progress
    } = orderDetail;

    return (
      <Grid container spacing={1}>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Ngày bắt đầu: `}
            <b className={classes.textContentColor}>{`${convertFrontEndDateTime(
              startDate
            )}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Ngày hoàn thành: `}
            <b className={classes.textContentColor}>{`${convertFrontEndDateTime(
              endDate
            )}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Số ngày ước tính: `}
            <b className={classes.textContentColor}>{`${estimateDay} ngày`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="span">
            {`Trạng thái: `}
            <b className={classes.textContentColor}>{`${getOrderStatus(
              status
            )}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={2} lg={1}>
          <Typography variant="body2" color="textSecondary">
            {`Tiến độ: `}
          </Typography>
        </Grid>
        <Grid item ms={10} md={9} lg={10}>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
        <Grid item ms={2} md={1} lg={1}>
          <Typography variant="body2" color="textSecondary">
            <b className={classes.textContentColor}>{`${progress}%`}</b>
          </Typography>
        </Grid>
        <Grid item>
          {items.length > 0 && (
            <Typography variant="body2" color="textSecondary">
              {`Danh sách đồ dùng: `}
            </Typography>
          )}
        </Grid>
        <Grid item ms={12} md={10} lg={10}>
          <Box mt={3}>{this.renderListItem()}</Box>
        </Grid>
      </Grid>
    );
  };

  renderListItem = () => {
    let { orderDetail } = this.props;
    let { items } = orderDetail;

    return (
      <React.Fragment>
        {items.length > 0 && (
          <List>
            {items.map((item, index) => (
              <Grid container key={index}>
                <Grid item>
                  <Box mr={1}>
                    <ArrowRightIcon />
                  </Box>
                </Grid>
                <Grid item ms={3} lg={3}>
                  <Typography variant="body1">
                    <b>{item.name}</b>
                  </Typography>
                </Grid>
                <Grid item ms={7} lg={7}>
                  <Typography variant="body1">{item.description}</Typography>
                </Grid>
                <Grid item ms={1} lg={1}>
                  {item.status === ItemStatus.DONE && (
                    <CheckIcon style={{ color: "#1b5e20" }} />
                  )}
                </Grid>
              </Grid>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  };

  renderStepValidateOrder = () => {
    let { orderDetail, classes } = this.props;
    let { isValid, validDate, validNote } = orderDetail;

    return (
      <React.Fragment>
        {isValid === null && (
          <Box display="flex" justifyContent="center">
            <Typography variant="body1" component="p">
              <b
                className={classes.textContentColor}
              >{`Đơn hàng đã được chuyển đến kế toán chờ xác thực ......`}</b>
            </Typography>
          </Box>
        )}

        {isValid === false && (
          <div>
            <Box display="flex" justifyContent="center" mb={2}>
              <PanToolIcon style={{ fontSize: 40, color: "red" }} />
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="body1" component="p">
                {`Xác nhận đơn hàng thất bại `}
                <b
                  style={{ backgroundColor: "red" }}
                >{`${convertFrontEndDateTime2(validDate)}`}</b>
              </Typography>

              <Typography variant="body1" component="p">
                <b style={{ backgroundColor: "blue" }}>{`${validNote}`}</b>
              </Typography>
            </Box>
          </div>
        )}

        {isValid === true && (
          <div>
            <Box display="flex" justifyContent="center" mb={2}>
              <SecurityIcon style={{ fontSize: 40, color: "#f44336" }} />
            </Box>
            <Box display="flex" justifyContent="center">
              <Typography variant="body1" component="p">
                {`Đã xác nhận đơn hàng vào ngày `}
                <b
                  className={classes.textContentColor}
                >{`${convertFrontEndDateTime2(validDate)}`}</b>
              </Typography>
            </Box>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderStepCreateOrder = () => {
    let { orderDetail, classes } = this.props;

    return (
      <Grid container spacing={1}>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Loại đơn hàng: `}
            <b className={classes.textContentColor}>{`${getOrderType(
              orderDetail.orderType
            )}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`SĐT người liên hệ tại công trình: `}
            <b
              className={classes.textContentColor}
            >{`${orderDetail.clientContact}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Số tiền khi tạo yêu cầu: `}
            <b className={classes.textContentColor}>{`${getCurrency(
              orderDetail.firstAmount
            )}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={6}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Đỉa chỉ công trình: `}
            <b
              className={classes.textContentColor}
            >{`${orderDetail.location}`}</b>
          </Typography>
        </Grid>
        <Grid item ms={12} md={12} lg={12}>
          <Typography variant="body2" color="textSecondary" component="p">
            {`Ngày tạo đơn hàng: `}
            <b
              className={classes.textContentColor}
            >{`${convertFrontEndDateTime2(orderDetail.createdDate)}`}</b>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  isStepComplete(step) {
    let { completed } = this.state;

    return completed.has(step);
  }

  handleStep = step => {
    this.setState({
      activeStep: step
    });
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(OrderSteperView);
