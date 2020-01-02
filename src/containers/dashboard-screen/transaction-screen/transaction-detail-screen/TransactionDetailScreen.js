import {
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { fetchTransactionProject } from "./../../../../actions/transaction-action/actions";
import * as TransactionType from "./../../../../constants/TransactionType";
import { getCurrency } from "./../../../../utils/helpers";
import { convertFrontEndDateTime } from "./../../../../utils/timeUtils";
import styles from "./styles";
import { NavLink } from "react-router-dom";

class TransactionDetailScreen extends Component {
  componentDidMount() {
    let { projectId, fetchTransactionProject, transactionInfo } = this.props;

    if (transactionInfo) {
      if (transactionInfo.projectId !== projectId) {
        fetchTransactionProject(projectId);
      }
    } else {
      fetchTransactionProject(projectId);
    }
  }

  render() {
    let { isLoadTransactionProject, transactionInfo } = this.props;

    // Show loading
    if (isLoadTransactionProject) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />;
            </Box>
          </Grid>
        </Grid>
      );
    }

    if (transactionInfo) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Box display="flex" flexDirection="row-reverse">
            <NavLink
              to={`/dashboard/transactions/project/${transactionInfo.projectId}/create`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#00e676" }}
              >
                Tạo thu chi
              </Button>
            </NavLink>
          </Box>
          <Typography component="h1" variant="h4" align="left">
            Thống kê
          </Typography>
          <Grid container spacing={2}>
            {this.renderTransactions(TransactionType.INCOME)}
            {this.renderTransactions(TransactionType.PAY)}
          </Grid>
          <Typography component="h1" variant="h4" align="left">
            Tổng kết
          </Typography>
          {this.renderTransactionTotal()}
        </React.Fragment>
      );
    }

    return null;
  }

  renderTransactions = transactionType => {
    let { classes, transactionInfo } = this.props;
    let totalAmount = 0;
    let listTransaction = [];
    let titleTotal = null;
    if (transactionType === TransactionType.INCOME) {
      listTransaction = transactionInfo.incomeTransactions;
      titleTotal = "Tổng thu";
    } else {
      listTransaction = transactionInfo.payTransactions;
      titleTotal = "Tổng chi";
    }

    return (
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Table aria-label="spanning table" className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tên giao dịch</TableCell>
                <TableCell align="right">Lượng tiền</TableCell>
                <TableCell align="right">Ngày giao dịch</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listTransaction.map((row, i) => {
                totalAmount += parseInt(row.amount);
                return (
                  <TableRow key={i}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="right">
                      {`${getCurrency(row.amount)}`}
                    </TableCell>
                    <TableCell align="right">
                      {convertFrontEndDateTime(row.createdDate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell>{titleTotal}</TableCell>
                <TableCell align="right">{`${getCurrency(
                  totalAmount
                )}`}</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      </Grid>
    );
  };

  renderTransactionTotal = () => {
    let { classes, transactionInfo } = this.props;

    if (!transactionInfo) {
      return null;
    }

    let { totalIncome, totalPay, profit } = transactionInfo;

    return (
      <Paper className={classes.paper}>
        <Table aria-label="spanning table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Thể loại</TableCell>
              <TableCell align="right">Lượng tiền</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>Tổng thu</TableCell>
              <TableCell align="right">{`${getCurrency(
                totalIncome
              )}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tổng chi</TableCell>
              <TableCell align="right">{`- ${getCurrency(
                totalPay
              )}`}</TableCell>
            </TableRow>
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell>Lợi nhuận</TableCell>
              <TableCell align="right">{`${getCurrency(profit)}`}</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Paper>
    );
  };
}

const mapStateToProps = state => ({
  isLoadTransactionProject: state.ui.isLoadTransactionProject,
  transactionInfo: state.transactionInfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchTransactionProject }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(TransactionDetailScreen);
