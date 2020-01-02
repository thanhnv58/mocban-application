import { Box, Button, Grid, InputAdornment } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { generateId, getCurrencyValue } from "../../utils/helpers";
import * as mui from "../../utils/mui";
import * as timeUtils from "../../utils/timeUtils";
import normalizeCurrency from "../../views/normalizeCurrency";
import { addTransaction } from "./../../actions/transaction-action/actions";
import * as TransactionType from "./../../constants/TransactionType";
import styles from "./styles";

class TransactionFormIncome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateTime: new Date()
    };
  }

  render() {
    let { handleSubmit, pristine, invalid } = this.props;

    let { dateTime } = this.state;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Field
              name="txtName"
              fullWidth
              label="Tên giao dịch"
              required
              component={mui.renderTextField}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Field
              name="txtAmount"
              fullWidth
              label="Lượng tiền"
              required
              type="text"
              component={mui.renderTextField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                )
              }}
              normalize={normalizeCurrency}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <DatePicker
              label="Ngày giao dịch"
              fullWidth
              format="EEE - dd/MM/yyyy"
              value={dateTime}
              onChange={this.handleDateChange}
              animateYearScrolling
            />
          </Grid>

          <Grid item md={2} xs={12}>
            <Box display="flex" justifyContent="center" mt={1}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={pristine || invalid}
              >
                Add
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  onSubmit = formData => {
    let { txtName, txtAmount } = formData;
    let { dateTime } = this.state;
    let { reset, addTransaction } = this.props;

    addTransaction(TransactionType.INCOME, {
      id: generateId(),
      name: txtName,
      amount: getCurrencyValue(txtAmount),
      createdDate: timeUtils.parseDateTime(dateTime)
    });

    reset();
  };

  handleDateChange = date => {
    this.setState({
      confirmStartDate: date
    });
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let { txtName, txtAmount } = values;

  if (!txtName && !txtAmount) {
    return errors;
  }

  if (!txtName) {
    errors.txtName = "Nhập tên giao dịch!";
  }

  if (!txtAmount) {
    errors.txtAmount = "Nhập lượng tiền!";
  } else {
    if (txtAmount <= 0) {
      errors.txtAmount = "Lượng tiền phải > 0!";
    }
  }

  return errors;
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addTransaction }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const form = reduxForm({
  form: "ADD_TRANSACTION_INCOME_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, form)(TransactionFormIncome);
