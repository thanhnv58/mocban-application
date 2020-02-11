import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  searchTransaction,
  loadMoreSearchTransaction
} from "../../../actions/accountant/transaction-screen/actions";
import Copyright from "../../../components/Copyright";
import SelectDateComponent from "../../../components/date-time/SelectDateComponent";
import SelectMonthComponent from "../../../components/date-time/SelectMonthComponent";
import * as TransactionOwner from "../../../constants/TransactionOwner";
import * as TransactionType from "../../../constants/TransactionType";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {
  getCurrency,
  getTransactionType,
  getTransactionTypeColor,
  getTransactionOwnerColor
} from "../../../utils/helpers";
import {
  convertFrontEndDateTime,
  parseDateTime2
} from "../../../utils/timeUtils";
import styles from "./styles";

class SearchTransactionScreen extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      radioSearchByTime: 0,
      radioSearchByOwner: 0,
      radioSearchByType: 0,
      byMonth: d.getMonth() + 1,
      byYear: d.getFullYear(),
      startDate: d,
      endDate: d,
      showDialogDetail: false,
      filterText: null
    };
  }

  UNSAFE_componentWillMount() {
    let { searchTransactionOption } = this.props;
    if (searchTransactionOption) {
      this.setState({
        ...searchTransactionOption
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Box mt={0} mb={4}>
          <Typography variant="h6" align="left">
            <b>Danh sách giao dịch</b>
          </Typography>

          <Box ml={2} mt={2}>
            {this.renderTransactionMode()}
          </Box>

          <Box ml={2} mr={2} mt={3} mb={1}>
            {this.renderTransactionTable()}
          </Box>
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderTransactionMode = () => {
    return (
      <Grid container>
        <Grid item xs={12} lg={6}>
          {this.renderByClient()}
        </Grid>
        <Grid item xs={12} lg={6}>
          {this.renderByTime()}
        </Grid>
      </Grid>
    );
  };

  renderByTime = () => {
    let { isLoading1 } = this.props;
    let { radioSearchByTime, byMonth, byYear, startDate, endDate } = this.state;

    return (
      <React.Fragment>
        <FormControl component="fieldset">
          <FormLabel component="legend">Thời gian</FormLabel>
          <RadioGroup
            aria-label="position"
            name="radioSearchByTime"
            value={radioSearchByTime}
            onChange={this.handleChange}
            row
          >
            <FormControlLabel
              value={0}
              control={<Radio color="primary" />}
              label="Theo tháng"
              labelPlacement="end"
            />
            <FormControlLabel
              value={1}
              control={<Radio color="primary" />}
              label="Theo ngày"
              labelPlacement="end"
            />
          </RadioGroup>

          {radioSearchByTime === 0 && (
            <SelectMonthComponent
              changeMonth={this.changeMonth}
              month={byMonth}
              year={byYear}
              btnIcon={<SearchIcon />}
              btnText={"Tìm kiếm"}
              btnColor="#ff3d00"
              isLoading={isLoading1}
            />
          )}
          {radioSearchByTime === 1 && (
            <SelectDateComponent
              changeDate={this.changeDate}
              startDate={startDate}
              endDate={endDate}
              btnIcon={<SearchIcon />}
              btnText={"Tìm kiếm"}
              btnColor="#ff3d00"
              isLoading={isLoading1}
            />
          )}
        </FormControl>
      </React.Fragment>
    );
  };

  changeMonth = (month, year) => {
    this.setState({
      byMonth: month,
      byYear: year
    });

    let { startDate, endDate } = this.state;

    this.searchTransaction(month, year, startDate, endDate);
  };

  changeDate = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });

    let { byMonth, byYear } = this.state;

    this.searchTransaction(byMonth, byYear, startDate, endDate);
  };

  renderByClient = () => {
    let { radioSearchByOwner, radioSearchByType } = this.state;

    return (
      <React.Fragment>
        <FormControl component="fieldset">
          <FormLabel component="legend">Giao dịch</FormLabel>
          <RadioGroup
            name="radioSearchByOwner"
            value={radioSearchByOwner}
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
              label="Của công ty"
              labelPlacement="end"
            />
            <FormControlLabel
              value={2}
              control={<Radio color="primary" />}
              label="Của khách hàng"
              labelPlacement="end"
            />
          </RadioGroup>

          <RadioGroup
            name="radioSearchByType"
            value={radioSearchByType}
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
      </React.Fragment>
    );
  };

  handleChange = e => {
    let { target } = e;
    let { name, value } = target;

    this.setState({
      [name]: parseInt(value)
    });
  };

  searchTransaction = (month, year, startDate, endDate) => {
    let {
      radioSearchByTime,
      radioSearchByOwner,
      radioSearchByType
    } = this.state;

    let owner =
      radioSearchByOwner === 0
        ? TransactionOwner.ALL
        : radioSearchByOwner === 1
        ? TransactionOwner.COMPANY
        : TransactionOwner.CLIENT;

    let type =
      radioSearchByType === 0
        ? null
        : radioSearchByType === 1
        ? TransactionType.INCOME
        : TransactionType.PAY;

    let requestDto = {
      owner,
      type,
      startDate: radioSearchByTime === 1 ? parseDateTime2(startDate) : null,
      endDate: radioSearchByTime === 1 ? parseDateTime2(endDate) : null,
      month: radioSearchByTime === 0 ? `${month}-${year}` : null
    };

    let { searchTransaction } = this.props;
    searchTransaction(requestDto, {
      radioSearchByTime,
      radioSearchByOwner,
      radioSearchByType,
      byMonth: month,
      byYear: year,
      startDate,
      endDate
    });
  };

  renderTransactionTable = () => {
    let { classes, isLoading1, isLoading2, pageSearchTransaction } = this.props;
    let {
      currentPage,
      transactions,
      totalPage,
      totalElements
    } = pageSearchTransaction;

    let totalAmount = 0;

    if (currentPage === -1) {
      return null;
    }

    let { filterText } = this.state;

    let tempFilterText = filterText ? filterText : null;

    const filtedTransactions =
      filterText === null
        ? transactions
        : transactions.filter(t => {
            return t.client
              ? t.client.username.includes(tempFilterText)
              : false;
          });

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
              <StyledTableCell align="center">Mục đích</StyledTableCell>
              <StyledTableCell align="center">Mã khách hàng</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Nhập mã khách hàng"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    type="search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={this.addFilter}
                  />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading1 && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  <Box display="flex" justifyContent="center" mt={3} mb={3}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {isLoading1 === false && filtedTransactions.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={9}
                >
                  <Typography variant="body1" gutterBottom>
                    Danh sách giao dịch rỗng!
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

                let { client } = transaction;

                return (
                  <StyledTableRow key={transaction.id}>
                    <StyledTableCell align="center">{i + 1}</StyledTableCell>
                    <StyledTableCell align="left">
                      <b>{transaction.messageAmount}</b>
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
                      <b
                        style={{
                          color: getTransactionOwnerColor(transaction.owner)
                        }}
                      >
                        {transaction.owner}
                      </b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <b>{client ? client.username : "N/A"}</b>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {client ? client.fullName : "N/A"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {client ? client.phoneNumber : "N/A"}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            {filtedTransactions.length > 0 && (
              <TableRow>
                <TableCell colSpan={1} />
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

  addFilter = e => {
    let { value } = e.target;

    let filterText = value ? value : null;

    this.setState({
      filterText
    });
  };

  loadMore = () => {
    let { loadMoreSearchTransaction } = this.props;
    loadMoreSearchTransaction();
  };
}

const mapStateToProps = state => ({
  isLoading1: state.accountantReducer.ui.isLoading1,
  isLoading2: state.accountantReducer.ui.isLoading2,
  searchTransactionOption: state.accountantReducer.ui.searchTransactionOption,
  pageSearchTransaction: state.accountantReducer.pageSearchTransaction
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchTransaction,
      loadMoreSearchTransaction
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(SearchTransactionScreen);

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
