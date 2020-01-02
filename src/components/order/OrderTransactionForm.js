import { Box, Button, Grid, InputAdornment } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { doTransaction } from "../../actions/sale/order-screen-action/actions";
import { getCurrencyValue } from "../../utils/helpers";
import * as mui from "../../utils/mui";
import normalizeCurrency from "../../views/normalizeCurrency";
import * as TransactionType from "../../constants/TransactionType";
import styles from "./styles";

class OrderTransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: null,
      arrItems: []
    };
  }

  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading4 } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
        className={classes.formTransaction}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <Field
              name="txtAmount"
              component={mui.renderTextField}
              label="Tiền ứng cho yêu cầu"
              margin="dense"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                )
              }}
              normalize={normalizeCurrency}
            />
          </Grid>

          <Grid item lg={6} md={6} xs={12}>
            <Field
              name="txtMessageAmount"
              component={mui.renderTextField}
              label="Tin nhắn chuyển tiền"
              required
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} xs={12} md={12}>
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<LocalAtmIcon />}
                    disabled={pristine || invalid || isLoading4}
                  >
                    Thanh toán
                  </Button>
                  {isLoading4 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  onSubmit = formData => {
    let { txtAmount, txtMessageAmount } = formData;

    let { id, reset, orderId } = this.props;

    let transactions = [
      {
        messageAmount: txtMessageAmount,
        amount: getCurrencyValue(txtAmount)
      }
    ];

    let requestDto = {
      orderId: id,
      orderIdStr: orderId,
      type: TransactionType.INCOME,
      transactions: transactions
    };

    let { doTransaction } = this.props;
    doTransaction(requestDto);

    reset();
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let { txtAmount, txtMessageAmount } = values;

  if (!txtAmount && !txtMessageAmount) {
    return errors;
  }

  const listField = [
    {
      field: "txtAmount",
      message: "Nhập số tiền!"
    },
    {
      field: "txtMessageAmount",
      message: "Nhập tin nhắn chuyển tiền!"
    }
  ];

  listField.forEach(fieldElm => {
    if (!values[fieldElm.field]) {
      errors[fieldElm.field] = fieldElm.message;
      return errors;
    }
  });

  if (txtAmount && txtAmount <= 0) {
    errors.txtUsername = "Số tiền phải lớn hơn 0 VND!";
    return errors;
  }

  return errors;
};

const mapStateToProps = state => ({
  isLoading4: state.saleReducer.ui.isLoading4
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      doTransaction
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "ORDER_TRANSACTION_FORM",
  validate
});

export default compose(
  withMyStyle,
  connectRedux,
  userForm
)(OrderTransactionForm);
