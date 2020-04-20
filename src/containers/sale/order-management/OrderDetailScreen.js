import { Grid, Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import {
  getOrderDetail,
  removeNewOrder,
} from "../../../actions/sale/order-management/actions";
import Copyright from "../../../components/Copyright";
import OrderDetailItem from "../../../components/order/OrderDetailItem";

import OrderPaymentForm from "../../../components/order/OrderPaymentForm";
import * as OrderType from "../../../constants/OrderType";
import * as OrderStatus from "../../../constants/OrderStatus";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);

    let { newOrder, idOrder, orderDetail } = this.props;

    this.state = {
      newOrder,
      idOrder,
      order: orderDetail ? orderDetail.order : null,
    };
  }

  componentDidMount() {
    let { newOrder, idOrder } = this.state;
    if (newOrder) {
      let { removeNewOrder } = this.props;
      removeNewOrder();

      this.setState({
        newOrder: false,
      });
    }

    let { getOrderDetail, orderDetail } = this.props;
    if (
      !orderDetail ||
      parseInt(orderDetail.order.idOrder) !== parseInt(idOrder)
    ) {
      getOrderDetail(idOrder);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.orderDetail) {
      this.setState({
        order: nextProps.orderDetail.order,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6">Chi tiết đơn hàng</Typography>

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_clientInfo()}
        </Box>

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_orderDetail()}
        </Box>

        <Box mt={3} ml={3} mr={3} mb={5}>
          {this.render_paymentOrder()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  render_clientInfo = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      let { orderDetail } = this.props;

      if (!orderDetail) {
        return null;
      } else {
        let { clientInfo } = orderDetail;
        return (
          <React.Fragment>
            <b>Thông tin khách hàng</b>
            <Box ml={2} mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={2}>
                  Họ tên:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.fullName}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Số ĐT:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.phoneNumber}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Địa chỉ:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.address}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Email:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.email}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Mã KH:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.code}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Ghi chú:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.note}
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_orderDetail = () => {
    let { isLoading1 } = this.props;

    if (isLoading1) {
      return null;
    } else {
      let { orderDetail } = this.props;
      let { order } = this.state;

      if (!orderDetail || !order) {
        return null;
      } else {
        let { clientInfo } = orderDetail;

        return (
          <React.Fragment>
            <b>Thông tin đơn hàng</b>
            <Box ml={2} mt={1}>
              <OrderDetailItem order={order} />
            </Box>

            {order.type === OrderType.DESIGN &&
              this.canCreateOrderProduct(order.status) && (
                <Box mt={3} mb={2}>
                  <b>Tạo đơn hàng sản xuất</b>
                  <Box ml={2} mt={1}>
                    <NavLink
                      to={`/sale/${clientInfo.idClient}/create-order?idParent=${order.idOrder}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className="btn-green"
                        startIcon={<AddIcon />}
                      >
                        Tạo đơn hàng
                      </Button>
                    </NavLink>
                  </Box>
                </Box>
              )}
          </React.Fragment>
        );
      }
    }
  };

  canCreateOrderProduct = (status) => {
    if (
      status === OrderStatus.DESIGN_DONE ||
      status === OrderStatus.PAYMENT_2_OK ||
      status === OrderStatus.FINISH ||
      status === OrderStatus.TO_PRODUCE
    ) {
      return true;
    } else {
      return false;
    }
  };

  render_paymentOrder = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { orderDetail } = this.props;
      let { order } = this.state;

      if (!orderDetail || !order) {
        return null;
      } else {
        let { idOrder } = this.state;
        return (
          <React.Fragment>
            <b>Thanh toán hóa đơn</b>
            <Box ml={2} mt={1}>
              <OrderPaymentForm idOrder={idOrder} type={order.type} />
            </Box>
          </React.Fragment>
        );
      }
    }
  };
}

const mapStateToProps = (state) => ({
  orderDetail: state.saleReducer.orderDetail,
  isLoading1: state.saleReducer.ui.isLoading1,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      removeNewOrder,
      getOrderDetail,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(OrderDetailScreen);
