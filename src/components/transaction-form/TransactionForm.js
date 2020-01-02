import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as TransactionType from "./../../constants/TransactionType";
import { convertFrontEndDateTime } from "./../../utils/timeUtils";
import styles from "./styles";
import TransactionFormIncome from "./TransactionFormIncome";
import TransactionFormPay from "./TransactionFormPay";
import DeleteIcon from "@material-ui/icons/Delete";
import { getCurrency } from "./../../utils/helpers";
import {
  removeTransaction,
  saveAllTransaction
} from "./../../actions/transaction-action/actions";
import CameraIcon from "@material-ui/icons/Camera";

class TransactionForm extends Component {
  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
        {this.renderResult()}
      </React.Fragment>
    );
  }

  renderForm = () => {
    let { type } = this.props;

    return (
      <React.Fragment>
        {type === TransactionType.INCOME ? (
          <TransactionFormIncome />
        ) : (
          <TransactionFormPay />
        )}
      </React.Fragment>
    );
  };

  renderResult = () => {
    let { type, transaction, classes, isSaveAllTransaction } = this.props;
    let titleTotal = null;
    let listTransaction = [];

    if (type === TransactionType.INCOME) {
      listTransaction = transaction.transactionIncome;
      titleTotal = "Tổng thu";
    } else {
      listTransaction = transaction.transactionPay;
      titleTotal = "Tổng chi";
    }

    if (listTransaction.length === 0) {
      return;
    }

    let totalAmount = 0;

    return (
      <React.Fragment>
        <Box mt={3} mb={2}>
          <Divider />
        </Box>
        <Typography gutterBottom variant="h5" component="h2">
          Danh sách giao dịch tạm
        </Typography>

        <Table aria-label="spanning table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Tên giao dịch</TableCell>
              <TableCell align="right">Lượng tiền</TableCell>
              <TableCell align="right">Ngày giao dịch</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTransaction.map((row, i) => {
              totalAmount += parseInt(row.amount);
              return (
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{getCurrency(row.amount)}</TableCell>
                  <TableCell align="right">
                    {convertFrontEndDateTime(row.createdDate)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DeleteIcon />}
                      style={{ backgroundColor: "#f50057" }}
                      onClick={() => {
                        this.removeTransaction(row);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>{titleTotal}</TableCell>
              <TableCell align="right">{getCurrency(totalAmount)}</TableCell>
              <TableCell align="right" colSpan={2}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={isSaveAllTransaction}
                    startIcon={<CameraIcon />}
                    onClick={this.saveAllTransaction}
                  >
                    Lưu toàn bộ giao dịch
                  </Button>
                  {isSaveAllTransaction && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </React.Fragment>
    );
  };

  saveAllTransaction = () => {
    let { saveAllTransaction, type } = this.props;
    saveAllTransaction(type);
  };

  removeTransaction = transaction => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) {
      let { type, removeTransaction } = this.props;

      removeTransaction(type, transaction.id);
    }
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = state => ({
  transaction: state.transaction,
  isSaveAllTransaction: state.ui.isSaveAllTransaction
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { removeTransaction, saveAllTransaction },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withMyStyle, connectRedux)(TransactionForm);
