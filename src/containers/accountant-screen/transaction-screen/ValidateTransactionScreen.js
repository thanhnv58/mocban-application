import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  getTransactionNeedValidate,
  loadMoreTransactionNeedValidate,
  validateTransactionOk
} from "../../../actions/accountant/transaction-screen/actions";
import Copyright from "../../../components/Copyright";
import * as TransactionType from "../../../constants/TransactionType";
import {
  getCurrency,
  getTransactionType,
  getTransactionTypeColor
} from "../../../utils/helpers";
import { convertFrontEndDateTime } from "../../../utils/timeUtils";
import RefreshIcon from "@material-ui/icons/Refresh";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import styles from "./styles";

class ValidateTransactionScreen extends Component {
  componentDidMount() {
    let {
      pageTransactionNeedValidate,
      getTransactionNeedValidate
    } = this.props;
    let { currentPage } = pageTransactionNeedValidate;

    if (currentPage < 0) {
      getTransactionNeedValidate();
    }
  }

  reloadPage = () => {
    let { getTransactionNeedValidate } = this.props;
    getTransactionNeedValidate();
  };

  render() {
    return (
      <React.Fragment>
        <Box mt={0} mb={4}>
          <Typography variant="h6" align="left">
            <b>Xác thực giao dịch thu</b>
          </Typography>

          <Box ml={2} mr={2} mt={3} mb={1}>
            {this.renderTransactionTable()}
          </Box>
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderTransactionTable = () => {
    let {
      classes,
      isLoading1,
      isLoading2,
      isLoading3,
      pageTransactionNeedValidate
    } = this.props;
    let {
      currentPage,
      transactions,
      totalPage,
      totalElements
    } = pageTransactionNeedValidate;

    let totalAmount = 0;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      if (currentPage === -1) {
        return null;
      }
    }

    // Show no content
    if (currentPage === 0 && totalPage === 0) {
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom align="center">
            Danh sách rỗng!
          </Typography>
          <Box display="flex" justifyContent="center">
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.reloadPage}
                startIcon={<RefreshIcon />}
                disabled={isLoading1}
              >
                Refresh page
              </Button>
              {isLoading1 && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Box>
        </React.Fragment>
      );
    }

    // Show list client
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">
                Nội dung giao dịch ({`${transactions.length}/${totalElements}`})
              </StyledTableCell>
              <StyledTableCell align="center">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
              <StyledTableCell align="center">Loại</StyledTableCell>
              <StyledTableCell align="center">Mã khách hàng</StyledTableCell>
              <StyledTableCell align="center">Khách hàng</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Hoạt động</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.length > 0 &&
              transactions.map((transaction, i) => {
                if (transaction.type === TransactionType.INCOME) {
                  totalAmount += transaction.amount;
                } else if (transaction.type === TransactionType.PAY) {
                  totalAmount -= transaction.amount;
                }

                let { client } = transaction;

                return (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="center">
                      <b>{i + 1}</b>
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
                          color: getTransactionTypeColor(transaction.type)
                        }}
                      >
                        {getTransactionType(transaction.type)}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{client ? client.username : "N/A"}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{client ? client.fullName : "N/A"}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{client ? client.phoneNumber : "N/A"}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className={classes.wrapper}>
                        <Button
                          color="primary"
                          variant="contained"
                          disabled={isLoading3}
                          startIcon={<VerifiedUserIcon />}
                          onClick={e => {
                            this.validateOk(transaction.id);
                          }}
                          style={{ backgroundColor: "#00c853" }}
                        >
                          Xác nhận OK
                        </Button>
                        {isLoading3 && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {transactions.length > 0 && (
              <TableRow>
                <TableCell colSpan={1} />
                <StyledTableCell align="left">
                  <b>Tổng kết</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>{getCurrency(totalAmount)}</b>
                </StyledTableCell>
                {currentPage < totalPage - 1 && (
                  <StyledTableCell align="center" colSpan={3}>
                    <div className={classes.wrapper}>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={isLoading2}
                        startIcon={<CloudDownloadIcon />}
                        onClick={this.loadMore}
                      >
                        Tải thêm
                      </Button>
                      {isLoading2 && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </StyledTableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  validateOk = transactionId => {
    let { validateTransactionOk } = this.props;

    validateTransactionOk(transactionId);
  };

  loadMore = () => {
    let { loadMoreTransactionNeedValidate } = this.props;
    loadMoreTransactionNeedValidate();
  };
}

const mapStateToProps = state => ({
  isLoading1: state.accountantReducer.ui.isLoading1,
  isLoading2: state.accountantReducer.ui.isLoading2,
  isLoading3: state.accountantReducer.ui.isLoading3,
  pageTransactionNeedValidate:
    state.accountantReducer.pageTransactionNeedValidate
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTransactionNeedValidate,
      loadMoreTransactionNeedValidate,
      validateTransactionOk
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ValidateTransactionScreen);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#0288d1",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
