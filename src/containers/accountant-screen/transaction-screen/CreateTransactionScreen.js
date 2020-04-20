import {
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import CreateTransactionForm from "../../../components/transaction/CreateTransactionForm";
import * as TransactionType from "../../../constants/TransactionType";
import {
  getCurrency,
  getTransactionType,
  getTransactionTypeColor,
} from "../../../utils/helpers";
import { Prompt } from "react-router-dom";
import { convertFrontEndDateTime } from "../../../utils/timeUtils";
import { toastError } from "../../../utils/ToastUtils";
import { findIndexOfElementInArray } from "../../../utils/arrayUtils";
import {
  createAllTransactions,
  confirmCreateSuccess,
} from "../../../actions/accountant/transaction-screen/actions";
import styles from "./styles";

class CreateTransactionScreen extends Component {
  constructor(props) {
    super(props);

    let { clientUsername } = this.props;
    this.state = {
      radioTransactionMode: clientUsername ? 1 : 0,
      listTransaction: [],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let { createAllTransaction, confirmCreateSuccess } = nextProps;
    let { isSuccess } = createAllTransaction;
    if (isSuccess) {
      confirmCreateSuccess();
      this.setState({
        listTransaction: [],
      });
    }
  }

  render() {
    let { radioTransactionMode, listTransaction } = this.state;
    let { clientUsername } = this.props;

    let isBlocking = listTransaction.length > 0;

    return (
      <React.Fragment>
        <Prompt
          when={isBlocking}
          message={(location) => `Bạn có muốn rời đi khi chưa Lưu giao dịch`}
        />
        <Box mt={0} mb={4}>
          <Typography variant="h6" align="left">
            <b>Tạo giao dịch</b>
          </Typography>

          <Box ml={2} mt={2}>
            {this.renderTransactionMode()}
          </Box>

          <Box ml={2} mt={2} mr={2}>
            <CreateTransactionForm
              mode={radioTransactionMode}
              clientUsername={
                radioTransactionMode === 1 ? clientUsername : null
              }
              addTransaction={this.addTransactionToList}
            />
          </Box>

          <Box ml={3} mt={3} mr={3}>
            {listTransaction.length > 0 && this.renderTransactionTable()}
          </Box>
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderTransactionMode = () => {
    let { radioTransactionMode } = this.state;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="position"
          name="radioTransactionMode"
          value={radioTransactionMode}
          onChange={this.handleChange}
          row
        >
          <FormControlLabel
            value={0}
            control={<Radio color="primary" />}
            label="Chi cho công việc công ty"
            labelPlacement="end"
          />
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label="Chi cho đơn hàng của khách"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  handleChange = (e) => {
    let { target } = e;
    let { name, value } = target;

    this.setState({
      [name]: parseInt(value),
    });
  };

  addTransactionToList = (transaction) => {
    let { listTransaction } = this.state;

    if (
      listTransaction.length > 0 &&
      listTransaction[0].clientUsername !== transaction.clientUsername
    ) {
      toastError(
        "Bạn không được phép tạo giao dịch cho 2 khách hàng khách nhau"
      );
      return;
    }

    listTransaction.push(transaction);
    this.setState({
      listTransaction: listTransaction,
    });
  };

  removeTransaction = (transactionId) => {
    let { listTransaction } = this.state;
    let index = findIndexOfElementInArray(listTransaction, (e) => {
      return e.id === transactionId;
    });

    if (index !== -1) {
      listTransaction.splice(index, 1);

      this.setState({
        listTransaction: listTransaction,
      });
    }
  };

  saveAllTransaction = () => {
    let { listTransaction } = this.state;
    let { createAllTransactions } = this.props;

    let transactions = listTransaction.map((t) => {
      return {
        messageAmount: t.messageAmount,
        amount: t.amount,
        createdDate: t.createdDate,
      };
    });

    let requestDto = {
      clientUsername: listTransaction[0].clientUsername,
      type: TransactionType.PAY,
      transactions: transactions,
    };

    createAllTransactions(requestDto);
  };

  renderTransactionTable = () => {
    let { classes, isLoading1 } = this.props;
    let { listTransaction } = this.state;

    let totalAmount = 0;

    // Show list client
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Mã khách hàng</StyledTableCell>
              <StyledTableCell align="left">
                Nội dung giao dịch ({`${listTransaction.length}`})
              </StyledTableCell>
              <StyledTableCell align="center">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
              <StyledTableCell align="center">Loại</StyledTableCell>
              <StyledTableCell align="center">Hành động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listTransaction.length > 0 &&
              listTransaction.map((transaction, i) => {
                if (transaction.type === TransactionType.INCOME) {
                  totalAmount += transaction.amount;
                } else if (transaction.type === TransactionType.PAY) {
                  totalAmount -= transaction.amount;
                }

                return (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="center">
                      <b>{i + 1}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{transaction.clientUsername}</b>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {transaction.messageAmount}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {getCurrency(transaction.amount)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {convertFrontEndDateTime(transaction.createdDate)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b
                        style={{
                          color: getTransactionTypeColor(transaction.type),
                        }}
                      >
                        {getTransactionType(transaction.type)}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DeleteIcon />}
                        style={{ backgroundColor: "#c62828" }}
                        onClick={() => {
                          this.removeTransaction(transaction.id);
                        }}
                      >
                        Xóa giao dịch
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {listTransaction.length > 0 && (
              <TableRow>
                <TableCell colSpan={2} />
                <StyledTableCell align="left">
                  <b>Tổng kết</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>{getCurrency(totalAmount)}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DoneAllIcon />}
                      onClick={this.saveAllTransaction}
                      disabled={isLoading1}
                    >
                      Lưu tất cả
                    </Button>
                    {isLoading1 && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
}

const mapStateToProps = (state) => ({
  isLoading1: state.accountantReducer.ui.isLoading1,
  createAllTransaction: state.accountantReducer.createAllTransaction,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createAllTransactions,
      confirmCreateSuccess,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(CreateTransactionScreen);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0288d1",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
