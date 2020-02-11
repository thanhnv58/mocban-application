import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  getTransactionOfClient,
  loadMoreClientTransactionList
} from "../../../actions/accountant/transaction-screen/actions";
import Copyright from "../../../components/Copyright";
import * as TransactionType from "../../../constants/TransactionType";
import {
  getCurrency,
  getTransactionType,
  getTransactionTypeColor
} from "../../../utils/helpers";
import { convertFrontEndDateTime2 } from "../../../utils/timeUtils";
import styles from "./styles";

class ClientTransactionListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioTransactionType: 0
    };
  }

  componentDidMount() {
    let {
      transactionOfClient,
      clientUsername,
      getTransactionOfClient
    } = this.props;
    let { client } = transactionOfClient;
    if (!client || client.username !== clientUsername) {
      getTransactionOfClient(clientUsername, null);
    }
  }

  render() {
    let { transactionOfClient, isLoading1 } = this.props;
    let { client } = transactionOfClient;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (!client) {
      return null;
    }

    return (
      <React.Fragment>
        <Box mt={3} mb={4}>
          {this.renderClientInfo()}

          <Box>
            <Typography variant="h6" align="left">
              <b>Thông tin giao dịch</b>
            </Typography>

            <Box mt={1} mb={1} ml={2}>
              {this.renderTransactionMonitor()}
            </Box>
            <Box ml={2} mr={2}>
              {this.renderTransactions()}
            </Box>
          </Box>
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderTransactionMonitor = () => {
    let { radioTransactionType } = this.state;

    return (
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="position"
          name="radioTransactionType"
          value={radioTransactionType}
          onChange={this.handleChange}
          row
        >
          <FormControlLabel
            value={0}
            control={<Radio color="primary" />}
            label="Tất cả"
            labelPlacement="end"
          />
          <FormControlLabel
            value={1}
            control={<Radio color="primary" />}
            label="Thu"
            labelPlacement="end"
          />
          <FormControlLabel
            value={2}
            control={<Radio color="primary" />}
            label="Chi"
            labelPlacement="end"
          />
        </RadioGroup>
      </FormControl>
    );
  };

  handleChange = e => {
    let { target } = e;
    let { name, value } = target;

    this.setState({
      [name]: parseInt(value)
    });
  };

  renderClientInfo = () => {
    let { transactionOfClient, classes } = this.props;
    let { client } = transactionOfClient;

    return (
      <Paper className={classes.paper}>
        <Typography variant="body1" align="left">
          <b>Thông tin khách hàng</b>
        </Typography>
        <Box mt={2} ml={1} mb={2}>
          <Divider />
        </Box>
        <Box ml={2} mr={2}>
          <Grid container spacing={1}>
            <Grid item ms={12} md={12} lg={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Mã khách hàng: `}
                <b
                  className={classes.textContentColor}
                >{`${client.username}`}</b>
              </Typography>
            </Grid>
            <Grid item ms={12} md={12} lg={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Họ và tên: `}
                <b
                  className={classes.textContentColor}
                >{`${client.fullName}`}</b>
              </Typography>
            </Grid>
            <Grid item ms={12} md={12} lg={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Số điện thoại: `}
                <b
                  className={classes.textContentColor}
                >{`${client.phoneNumber}`}</b>
              </Typography>
            </Grid>
            <Grid item ms={12} md={12} lg={6}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Email: `}
                <b className={classes.textContentColor}>{`${client.email}`}</b>
              </Typography>
            </Grid>
            <Grid item ms={12} md={12} lg={12}>
              <Typography variant="body2" color="textSecondary" component="p">
                {`Địa chỉ nhà: `}
                <b
                  className={classes.textContentColor}
                >{`${client.address}`}</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
  };

  renderTransactions = () => {
    let { transactionOfClient, classes, isLoading2 } = this.props;
    let { transactions } = transactionOfClient;
    let { currentPage, totalPage, totalElements, elements } = transactions;
    let { radioTransactionType } = this.state;

    let filtedTransactions;
    let totalAmount = 0;

    if (radioTransactionType === 0) {
      filtedTransactions = elements;
    } else if (radioTransactionType === 1) {
      filtedTransactions = elements.filter(transaction => {
        return transaction.type === TransactionType.INCOME;
      });
    } else {
      filtedTransactions = elements.filter(transaction => {
        return transaction.type === TransactionType.PAY;
      });
    }

    // Show list client
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="left">
                Nội dung giao dịch ({`${elements.length}/${totalElements}`})
              </StyledTableCell>
              <StyledTableCell align="center">Số tiền</StyledTableCell>
              <StyledTableCell align="center">Thời gian</StyledTableCell>
              <StyledTableCell align="center">Loại</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtedTransactions.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={8}
                >
                  <Typography variant="body1" gutterBottom>
                    No transaction to display
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {filtedTransactions.length > 0 &&
              filtedTransactions.map((transaction, i) => {
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
                    <StyledTableCell align="left">
                      <b>{transaction.messageAmount}</b>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {getCurrency(transaction.amount)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {convertFrontEndDateTime2(transaction.createdDate)}
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
                  </StyledTableRow>
                );
              })}
            {filtedTransactions.length > 0 && (
              <TableRow>
                <StyledTableCell rowSpan={1}></StyledTableCell>
                <StyledTableCell align="left">
                  <b>Tổng kết</b>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <b>{getCurrency(totalAmount)}</b>
                </StyledTableCell>
                {currentPage < totalPage - 1 && (
                  <StyledTableCell align="center">
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

  loadMore = () => {
    let { loadMoreClientTransactionList } = this.props;
    loadMoreClientTransactionList();
  };
}

const mapStateToProps = state => ({
  transactionOfClient: state.accountantReducer.transactionOfClient,
  isLoading1: state.accountantReducer.ui.isLoading1,
  isLoading2: state.accountantReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getTransactionOfClient,
      loadMoreClientTransactionList
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ClientTransactionListScreen);

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
