import {
  Box,
  CssBaseline,
  Grid,
  List,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import OrderDetailItem from "../../../components/order/OrderDetailItem";
import SearchOrderForm from "../../../components/order/SearchOrderForm";
import { searchOrderByClientId } from "./../../../actions/sale/order-screen-action/actions";
import styles from "./styles";
import { NavLink } from "react-router-dom";

class SearchClientOrderScreen extends Component {
  constructor(props) {
    super(props);

    let { clientId } = this.props;

    this.state = {
      clientId
    };
  }

  componentDidMount() {
    let { clientId, searchOrderByClientId } = this.props;

    if (clientId) {
      searchOrderByClientId(clientId);
    }
  }

  render() {
    let { clientId, pageClientOrder, isLoading1 } = this.props;
    let { currentPage, orders, totalPage } = pageClientOrder;

    let initialValues = {
      txtClientId: clientId ? clientId : ""
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Box mt={4}></Box>
        <Grid container direction="row" spacing={2} justify="center">
          <Grid item xs={12} md={10} lg={8}>
            <SearchOrderForm
              initialValues={initialValues}
              searchOrderByClientId={this.searchOrderByClientId}
            />
          </Grid>

          {isLoading1 === true && (
            <Grid item xs={12} md={12} lg={8}>
              <Box display="flex" justifyContent="center" m={2}>
                <CircularProgress />;
              </Box>
            </Grid>
          )}

          {isLoading1 === false && currentPage === 0 && totalPage === 0 && (
            <Grid item xs={12} md={12} lg={8}>
              <Box display="flex" justifyContent="center" m={2}>
                <Typography component="h3" variant="h4" align="left">
                  Danh sách đơn hàng rỗng!
                </Typography>
                <Box ml={1}></Box>
                <NavLink
                  to={`/sale/orders/create?${
                    this.state.clientId
                      ? `clientId=${this.state.clientId}`
                      : null
                  }`}
                >
                  <Typography component="h3" variant="h4" align="left">
                    Tạo đơn hàng tại đây
                  </Typography>
                </NavLink>
              </Box>
            </Grid>
          )}

          {clientId && orders.length > 0 && (
            <Grid item xs={12} md={12} lg={8}>
              {this.renderListOrders()}
            </Grid>
          )}
        </Grid>
        <Box m={3}>
          <Copyright />
        </Box>
      </React.Fragment>
    );
  }

  searchOrderByClientId = clientId => {
    let { searchOrderByClientId } = this.props;

    if (clientId) {
      this.setState({
        clientId
      });
      searchOrderByClientId(clientId);
    }
  };

  renderListOrders = () => {
    let { classes, pageClientOrder } = this.props;
    let { orders } = pageClientOrder;

    return (
      <List className={classes.root}>
        {orders.map((orderDetail, i) => {
          return <OrderDetailItem orderDetail={orderDetail} key={i} />;
        })}
      </List>
    );
  };
}

const mapStateToProps = state => ({
  pageClientOrder: state.saleReducer.pageClientOrder,
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      searchOrderByClientId
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(SearchClientOrderScreen);
