import { Button, Grid, InputAdornment, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import { compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as TransactionType from "../../constants/TransactionType";
import { generateId, getCurrencyValue } from "../../utils/helpers";
import { parseDateTime } from "../../utils/timeUtils";
import * as mui from "./../../utils/mui";
import normalizeCurrency from "./../../views/normalizeCurrency";
import styles from "./styles";

class CreateTransactionForm extends Component {
  constructor(props) {
    super(props);

    let { clientUsername } = this.props;

    let readOnly = false;
    if (clientUsername && clientUsername !== "") {
      readOnly = true;
    }

    this.state = {
      dateTime: new Date(),
      txtClientUsername: clientUsername ? clientUsername : "",
      readOnly
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { clientUsername } = nextProps;
    let { txtClientUsername } = this.state;

    let readOnly = false;
    if (clientUsername && clientUsername !== "") {
      readOnly = true;
    }

    let tmp = "";
    if (clientUsername && clientUsername !== "") {
      tmp = clientUsername;
    } else {
      if (txtClientUsername && txtClientUsername !== "") {
        tmp = txtClientUsername;
      }
    }

    this.setState({
      txtClientUsername: tmp,
      readOnly
    });
  }

  render() {
    let { handleSubmit, pristine, invalid, mode } = this.props;
    let { dateTime, txtClientUsername, readOnly } = this.state;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={1} direction="row" alignItems="center">
          {mode === 1 && (
            <Grid item lg={12} xs={12}>
              <TextField
                name="txtClientUsername"
                value={txtClientUsername}
                label="Mã khách hàng"
                type="text"
                required
                onChange={this.handleChange}
                InputProps={{
                  readOnly: readOnly
                }}
              />
            </Grid>
          )}
          <Grid item lg={2} xs={12}>
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
          <Grid item lg={5} xs={12}>
            <Field
              name="txtMessageAmount"
              fullWidth
              label="Tin nhắn chuyển tiền"
              required
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item lg={2} xs={12}>
            <DatePicker
              label="Ngày giao dịch"
              fullWidth
              format="EEE - dd/MM/yyyy"
              value={dateTime}
              onChange={this.handleDateChange}
              animateYearScrolling
            />
          </Grid>

          <Grid item lg={2} xs={12}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={pristine || invalid}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  handleChange = e => {
    let { target } = e;
    let { name, value } = target;

    this.setState({
      [name]: value
    });
  };

  onSubmit = formData => {
    let { txtMessageAmount, txtAmount } = formData;
    let { dateTime, txtClientUsername } = this.state;
    let { reset, addTransaction, mode } = this.props;

    let clientUsername = "COMPANY";
    if (mode === 1) {
      clientUsername = txtClientUsername;
    }

    addTransaction({
      id: generateId(),
      clientUsername: clientUsername,
      messageAmount: txtMessageAmount,
      amount: getCurrencyValue(txtAmount),
      createdDate: parseDateTime(dateTime),
      type: TransactionType.PAY
    });

    reset();
  };

  handleDateChange = date => {
    this.setState({
      dateTime: date
    });
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let { txtMessageAmount, txtAmount } = values;

  if (!txtMessageAmount && !txtAmount) {
    return errors;
  }

  if (!txtMessageAmount) {
    errors.txtMessageAmount = "Nhập tin nhắn chuyển tiền!";
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

const form = reduxForm({
  form: "CREATE_TRANSACION_FORM",
  validate
});

export default compose(withMyStyle, form)(CreateTransactionForm);
