import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Paper
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import EqualizerIcon from "@material-ui/icons/Equalizer";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  getOrderDetail,
  getTransactionIncome
} from "../../../actions/sale/order-screen-action/actions";
import Copyright from "../../../components/Copyright";
import OrderDetailItem from "../../../components/order/OrderDetailItem";
import OrderTransactionForm from "../../../components/order/OrderTransactionForm";
import { getCurrency } from "../../../utils/helpers";
import { convertFrontEndDateTime2 } from "../../../utils/timeUtils";
import styles from "./styles";
import ClientRequestForm from "../../../components/order/ClientRequestForm";

class OrderDetailScreen extends Component {
  componentDidMount() {
    let { getOrderDetail, orderDetail, orderId } = this.props;

    if (!orderDetail || orderDetail.id !== parseInt(orderId)) {
      getOrderDetail(parseInt(orderId));
    }
  }

  render() {
    let { isLoading1, orderDetail } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6">Chi tiết đơn hàng</Typography>

        {isLoading1 && (
          <Box display="flex" justifyContent="center" mt={3} mb={4}>
            <CircularProgress />
          </Box>
        )}

        {isLoading1 === false && orderDetail && (
          <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={4}
            ml={3}
            mr={3}
          >
            {this.renderOrderDetail()}
          </Box>
        )}
        <Copyright />
      </React.Fragment>
    );
  }

  renderOrderDetail = () => {
    let {
      orderId,
      orderDetail,
      classes,
      isLoading3,
      pageTransactionIncomeDetail
    } = this.props;

    let initialValues = {
      txtClientRequest: orderDetail.note
    };

    return (
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12} lg={12}>
          <OrderDetailItem orderDetail={orderDetail} />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.container}
          >
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" align="left">
                <b>Yêu cầu khách hàng</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Box mb={2} mr={2} ml={2}>
                <ClientRequestForm
                  orderId={orderId}
                  initialValues={initialValues}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.container}
          >
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" align="left">
                <b>Thanh toán</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <OrderTransactionForm id={orderDetail.id} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={12}>
          <Grid
            container
            spacing={1}
            component={Paper}
            className={classes.container}
          >
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" align="left">
                <b>Danh sách các khoản thu</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box mt={1} mb={1}>
                <Divider />
              </Box>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Grid
                container
                alignItems="center"
                direction="row"
                justify="center"
              >
                {(pageTransactionIncomeDetail.orderId === -1 ||
                  orderId !== pageTransactionIncomeDetail.orderId) && (
                  <Grid item>
                    <div className={classes.wrapper}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EqualizerIcon />}
                        disabled={isLoading3}
                        onClick={e => {
                          this.showListTransactionIncomeOfOrder();
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
                )}

                {pageTransactionIncomeDetail.orderId !== -1 &&
                  pageTransactionIncomeDetail.orderId === orderId && (
                    <Grid item xs={12} lg={12}>
                      <Box ml={3} mr={3}>
                        {this.renderTableTransaction()}
                      </Box>
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  updateClientRequest = () => {};

  renderTableTransaction = () => {
    let { pageTransactionIncomeDetail } = this.props;
    let {
      transactions,
      currentTotal,
      totalElements
    } = pageTransactionIncomeDetail;

    let totalAmount = 0;

    return (
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell align="center">{`Tin nhắn chuyển tiền(${currentTotal}/${totalElements})`}</TableCell>
            <TableCell align="center">Lượng tiền</TableCell>
            <TableCell align="center">Ngày giao dịch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentTotal === 0 && (
            <TableRow key="1">
              <TableCell component="th" scope="row" align="center" colSpan={8}>
                <Typography variant="body1" gutterBottom>
                  No transaction to display
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {transactions.map((row, i) => {
            totalAmount += parseInt(row.amount);
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell align="left">
                  <b>{row.messageAmount}</b>
                </TableCell>
                <TableCell align="right">
                  {`${getCurrency(row.amount)}`}
                </TableCell>
                <TableCell align="center">
                  {convertFrontEndDateTime2(row.createdDate)}
                </TableCell>
              </TableRow>
            );
          })}
          {transactions.length > 0 && (
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">
                <b>Tổng thu</b>
              </TableCell>
              <TableCell align="right">{`${getCurrency(
                totalAmount
              )}`}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  };

  showListTransactionIncomeOfOrder = () => {
    let { getTransactionIncome, orderId } = this.props;
    getTransactionIncome(parseInt(orderId));
  };
}

const mapStateToProps = state => ({
  orderDetail: state.saleReducer.orderDetail,
  pageTransactionIncomeDetail: state.saleReducer.pageTransactionIncomeDetail,
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading3: state.saleReducer.ui.isLoading3
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOrderDetail,
      getTransactionIncome
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(OrderDetailScreen);
