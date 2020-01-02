import {
  AppBar,
  Dialog,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import OrderDetailItem from "../../../components/order/OrderDetailItem";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  fetchListOrder,
  getOrderDetail
} from "./../../../actions/sale/order-screen-action/actions";
import Copyright from "./../../../components/Copyright";
import {
  getCurrency,
  getOrderStatus,
  getStatusColor
} from "./../../../utils/helpers";
import * as stringUtils from "./../../../utils/stringUtils";
import { convertFrontEndDateTime2 } from "./../../../utils/timeUtils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./styles";
import OrderTransactionForm from "../../../components/order/OrderTransactionForm";
import { getTransactionIncome } from "./../../../actions/sale/order-screen-action/actions";

class ListOrderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: null,
      openDialog: false
    };
  }

  componentDidMount() {
    let { pageOrder, fetchListOrder } = this.props;
    let { currentPage } = pageOrder;

    if (currentPage < 0) {
      fetchListOrder();
    }
  }

  render() {
    let { pageOrder, isLoading1 } = this.props;
    let { currentPage, orders, totalPage } = pageOrder;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    // Show no content
    if (currentPage === 0 && totalPage === 0) {
      return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Danh sách người dùng rỗng!
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={this.reloadPageOrder}
              startIcon={<RefreshIcon />}
            >
              Reload
            </Button>
          </Box>
        </React.Fragment>
      );
    }

    if (!orders || orders.length <= 0) {
      return null;
    }

    return (
      <React.Fragment>
        {this.renderDialog()}
        <Box mt={3} mb={4}>
          {this.renderListOrder()}
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  reloadPageOrder = () => {
    let { fetchListOrder } = this.props;
    fetchListOrder();
  };

  renderDialog = () => {
    let { openDialog } = this.state;

    let { isLoading2, orderDetail, classes, isLoading3 } = this.props;

    return (
      <Dialog
        fullScreen
        open={openDialog}
        onClose={this.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              style={{ color: "white" }}
            >
              Chi tiết yêu cầu
            </Typography>
          </Toolbar>
        </AppBar>
        {isLoading2 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}

        {orderDetail && (
          <Grid container justify="center">
            <Grid item xs={12} lg={8} md={8}>
              <Box m={10}></Box>
              <OrderDetailItem orderDetail={orderDetail} />

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" align="left">
                    <b>Thanh toán</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <OrderTransactionForm
                    orderId={orderDetail.orderId}
                    id={orderDetail.id}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>

              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography variant="h6" align="left">
                    <b>Chi tiết các khoản thu</b>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid container>
                    <Grid item xs={12} lg={12}>
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EqualizerIcon />}
                          disabled={isLoading3}
                          onClick={e => {
                            this.showListTransactionIncomeOfOrder(orderDetail);
                          }}
                        >
                          Lấy dữ liệu
                        </Button>
                        {isLoading3 && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      {this.renderTableTransaction()}
                    </Grid>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        )}
      </Dialog>
    );
  };

  renderTableTransaction = () => {
    let {
      orderDetail,
      pageTransactionIncomeDetail,
      isLoading3,
      classes
    } = this.props;
    let {
      currentPage,
      transactions,
      totalPage,
      orderId
    } = pageTransactionIncomeDetail;

    if (orderDetail.id !== orderId) {
      return null;
    }

    // Show loading...
    if (isLoading3) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    // Show no content
    if (currentPage === 0 && totalPage === 0) {
      return (
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Danh sách thu rỗng!
          </Typography>
        </Box>
      );
    }

    if (!transactions || transactions.length <= 0) {
      return null;
    }

    let totalAmount = 0;

    return (
      <Table aria-label="spanning table" className={classes.tableTransactions}>
        <TableHead>
          <TableRow>
            <TableCell align="left">STT</TableCell>
            <TableCell align="left">Tin nhắn chuyển tiền</TableCell>
            <TableCell align="right">Lượng tiền</TableCell>
            <TableCell align="center">Ngày giao dịch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row, i) => {
            totalAmount += parseInt(row.amount);
            return (
              <TableRow key={i}>
                <TableCell align="left">
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell align="left">{row.messageAmount}</TableCell>
                <TableCell align="right">
                  {`${getCurrency(row.amount)}`}
                </TableCell>
                <TableCell align="center">
                  {convertFrontEndDateTime2(row.createdDate)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Tổng thu</TableCell>
            <TableCell align="right">{`${getCurrency(totalAmount)}`}</TableCell>
          </TableRow>
        </TableHead>
      </Table>
    );
  };

  showListTransactionIncomeOfOrder = orderDetail => {
    let { getTransactionIncome } = this.props;
    getTransactionIncome(orderDetail.id);
  };

  handleClose = () => {
    this.setState({
      openDialog: false
    });
  };

  renderLoadMore = () => {
    let { pageClient, classes, isLoadMoreUser } = this.props;
    let { totalPage, currentPage } = pageClient;

    let xhtml = null;
    if (currentPage !== -1 && currentPage < totalPage - 1) {
      xhtml = (
        <Box display="flex" justifyContent="center">
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.loadMoreUser}
              disabled={isLoadMoreUser}
            >
              Load more
            </Button>
            {isLoadMoreUser && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Box>
      );
    }

    return xhtml;
  };

  loadMoreUser = () => {
    let { fetchUser, pageClient } = this.props;
    fetchUser(pageClient.currentPage + 1);
  };

  renderListOrder = () => {
    let { pageOrder, classes, isLoading2 } = this.props;
    let { orders, currentTotal } = pageOrder;
    let { filterText } = this.state;

    let tempFilterText = filterText
      ? stringUtils.removeAccents(filterText.toLocaleLowerCase())
      : null;

    const listFiltedOrders = !filterText
      ? orders
      : orders.filter(order => {
          return (
            stringUtils
              .removeAccents(order.orderId.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(order.clientUsername.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(order.firstAmount.toString().toLocaleLowerCase())
              .includes(tempFilterText)
          );
        });

    // Show list client
    let xhtml = (
      <Box display="flex" justifyContent="center">
        <Paper>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">STT</StyledTableCell>
                <StyledTableCell align="left">
                  Mã hóa đơn ({`${currentTotal}`} người)
                </StyledTableCell>
                <StyledTableCell align="center">Mã khách hàng</StyledTableCell>
                <StyledTableCell align="left">Số tiền khởi tạo</StyledTableCell>
                <StyledTableCell align="center">Trạng thái</StyledTableCell>
                <StyledTableCell align="center">Ngày tạo</StyledTableCell>
                <StyledTableCell align="center">
                  Thời gian ước lượng
                </StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Bộ lọc"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                      inputProps={{ "aria-label": "search" }}
                      onChange={this.addFilter}
                    />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listFiltedOrders.length === 0 && (
                <StyledTableRow key="1">
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={8}
                  >
                    <Typography variant="body1" gutterBottom>
                      No orders to display
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {listFiltedOrders.map((order, i) => (
                <StyledTableRow key={order.orderId}>
                  <StyledTableCell align="center">
                    <b>{i + 1}</b>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <b>{order.orderId}</b>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {order.clientUsername}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {getCurrency(order.firstAmount)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <span style={{ color: getStatusColor(order.status) }}>
                      {getOrderStatus(order.status)}
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {convertFrontEndDateTime2(order.createdDate)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`${order.estimateDay ? order.estimateDay : 0} ngày`}
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    <div className={classes.wrapper}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DragIndicatorIcon />}
                        onClick={e => {
                          this.showOrderDetail(order);
                        }}
                        disabled={isLoading2}
                      >
                        Chi tiết
                      </Button>
                      {isLoading2 && (
                        <CircularProgress
                          size={24}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    );

    return xhtml;
  };

  showOrderDetail = order => {
    this.setState({
      openDialog: true,
      orderDialog: order
    });

    let { getOrderDetail, orderDetail } = this.props;

    if (!orderDetail || orderDetail.id !== parseInt(order.id)) {
      getOrderDetail(order.id);
    }
  };

  addFilter = e => {
    let { value } = e.target;

    let filterText = value ? value : null;

    this.setState({
      filterText
    });
  };
}

const mapStateToProps = state => ({
  pageOrder: state.saleReducer.pageOrder,
  orderDetail: state.saleReducer.orderDetail,
  pageTransactionIncomeDetail: state.saleReducer.pageTransactionIncomeDetail,
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading2: state.saleReducer.ui.isLoading2,
  isLoading3: state.saleReducer.ui.isLoading3
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchListOrder,
      getOrderDetail,
      getTransactionIncome
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ListOrderScreen);

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
