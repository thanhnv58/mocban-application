import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { paymentOrder } from "../../actions/sale/order-management/actions";
import { getCurrencyValue } from "../../utils/helpers";
import normalizeCurrency from "../../views/normalizeCurrency";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import * as PaymentStep from "../../constants/PaymentStep";
import * as OrderType from "../../constants/OrderType";
import styles from "./styles";

class OrderPaymentForm extends Component {
  constructor(props) {
    super(props);

    let { type, idOrder } = this.props;

    this.state = {
      type,
      idOrder,
      txtPayment1: "",
      txtPayment2: "",
      txtPayment3: "",
      isChange1: false,
      isChange2: false,
      isChange3: false,
    };
  }

  render() {
    let {
      txtPayment1,
      txtPayment2,
      txtPayment3,
      isChange1,
      isChange2,
      isChange3,
    } = this.state;
    let { classes, isLoading2, isLoading3, isLoading5 } = this.props;

    let { type } = this.state;

    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} lg={6}>
          <TextField
            name="txtPayment1"
            required
            label="Số tiền"
            variant="outlined"
            margin="dense"
            value={txtPayment1}
            onChange={this.handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.wrapper}>
            <Button
              className="btn-green"
              color="primary"
              variant="contained"
              disabled={!isChange1 || isLoading2}
              onClick={this.paymentPhase1}
              startIcon={<AttachMoneyIcon />}
            >
              Thanh toán đợt 1
            </Button>
            {isLoading2 && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          <TextField
            name="txtPayment2"
            required
            label="Số tiền"
            variant="outlined"
            margin="dense"
            value={txtPayment2}
            onChange={this.handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className={classes.wrapper}>
            <Button
              className="btn-green"
              color="primary"
              variant="contained"
              disabled={!isChange2 || isLoading3}
              onClick={this.paymentPhase2}
              startIcon={<AttachMoneyIcon />}
            >
              Thanh toán đợt 2
            </Button>
            {isLoading3 && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>

        {type === OrderType.PRODUCT && (
          <React.Fragment>
            <Grid item xs={12} lg={6}>
              <TextField
                name="txtPayment3"
                required
                label="Số tiền"
                variant="outlined"
                margin="dense"
                value={txtPayment3}
                onChange={this.handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">VND</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className={classes.wrapper}>
                <Button
                  className="btn-green"
                  color="primary"
                  variant="contained"
                  disabled={!isChange3 || isLoading5}
                  onClick={this.paymentPhase3}
                  startIcon={<AttachMoneyIcon />}
                >
                  Thanh toán đợt 3
                </Button>
                {isLoading5 && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    );
  }

  paymentPhase1 = () => {
    let { txtPayment1, idOrder } = this.state;
    let { paymentOrder } = this.props;
    paymentOrder(
      idOrder,
      {
        amount: getCurrencyValue(txtPayment1),
        step: PaymentStep.PAYMENT_1,
      },
      PaymentStep.PAYMENT_1
    );

    this.setState({
      isChange1: false,
    });
  };

  paymentPhase2 = () => {
    let { txtPayment2, idOrder } = this.state;
    let { paymentOrder } = this.props;
    paymentOrder(
      idOrder,
      {
        amount: getCurrencyValue(txtPayment2),
        step: PaymentStep.PAYMENT_2,
      },
      PaymentStep.PAYMENT_2
    );

    this.setState({
      isChange2: false,
    });
  };

  paymentPhase3 = () => {
    let { txtPayment3, idOrder } = this.state;
    let { paymentOrder } = this.props;
    paymentOrder(
      idOrder,
      {
        amount: getCurrencyValue(txtPayment3),
        step: PaymentStep.PAYMENT_3,
      },
      PaymentStep.PAYMENT_3
    );

    this.setState({
      isChange3: false,
    });
  };

  handleChange = (event) => {
    const name = event.target.name;

    let numVal = normalizeCurrency(event.target.value);

    let isChange =
      name === "txtPayment1"
        ? "isChange1"
        : name === "txtPayment2"
        ? "isChange2"
        : "isChange3";

    this.setState({
      [name]: numVal,
      [isChange]: true,
    });
  };
}

const mapStateToProps = (state) => ({
  isLoading2: state.saleReducer.ui.isLoading2,
  isLoading3: state.saleReducer.ui.isLoading3,
  isLoading5: state.saleReducer.ui.isLoading5,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      paymentOrder,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(OrderPaymentForm);
