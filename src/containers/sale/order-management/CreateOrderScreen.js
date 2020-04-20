import { Box, CssBaseline, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import Copyright from "../../../components/Copyright";
import CreateOrderForm from "../../../components/order/CreateOrderForm";

class CreateOrderScreen extends Component {
  render() {
    let { newOrder } = this.props;

    if (newOrder) {
      return (
        <Redirect
          to={{
            pathname: `/sale/order-detail/${newOrder.idOrder}`,
            search: `?newOrder=true`,
          }}
        />
      );
    } else {
      let { clientDetail, idClient, idParent, orderDetail } = this.props;

      let clientCode = idParent
        ? orderDetail.clientInfo.code
        : clientDetail.clientInfo.code;

      return (
        <React.Fragment>
          <CssBaseline />
          <Typography variant="h6" align="left">
            Tạo đơn hàng
          </Typography>

          <Box mt={3} ml={3} mr={3} mb={0}>
            Mã khách hàng: <b>{clientCode}</b>
          </Box>
          {idParent && (
            <React.Fragment>
              <Box mt={1} ml={3} mr={3} mb={0}>
                Liên lạc tại công trình: <b>{orderDetail.order.contact}</b>
              </Box>
              <Box mt={1} ml={3} mr={3} mb={2}>
                Địa chỉ công trình: <b>{orderDetail.order.location}</b>
              </Box>
            </React.Fragment>
          )}

          <Box mt={3} ml={3} mr={3} mb={5}>
            <CreateOrderForm idClient={idClient} idParent={idParent} />
          </Box>

          <Copyright />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  newOrder: state.saleReducer.newOrder,
  clientDetail: state.saleReducer.clientDetail,
  orderDetail: state.saleReducer.orderDetail,
});

const connectRedux = connect(mapStateToProps);

export default compose(connectRedux)(CreateOrderScreen);
