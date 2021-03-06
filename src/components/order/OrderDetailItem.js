import { Box, Grid, Paper } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import OrderSteperView from "./OrderSteperView";
import styles from "./styles";

class OrderDetailItem extends Component {
  render() {
    let { orderDetail, classes } = this.props;

    return (
      <Grid
        container
        spacing={1}
        component={Paper}
        className={classes.container}
      >
        <Grid item xs={12} lg={12}>
          <Typography variant="body1" align="left">
            Mã đơn hàng: <b>{orderDetail.orderName}</b>
          </Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box mt={1} mb={1}>
            <Divider />
          </Box>
        </Grid>

        <Grid item xs={12} lg={12}>
          {this.renderClientInfo()}
        </Grid>

        <Grid item xs={12} lg={12}>
          <OrderSteperView orderDetail={orderDetail} />
        </Grid>
      </Grid>
    );
  }

  renderClientInfo = () => {
    let { orderDetail, classes } = this.props;
    let { client } = orderDetail;

    return (
      <Box ml={2}>
        <Grid container spacing={1}>
          <Grid item ms={12} md={12} lg={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Mã khách hàng: `}
              <b className={classes.textContentColor}>{`${client.username}`}</b>
            </Typography>
          </Grid>
          <Grid item ms={12} md={12} lg={6}>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Họ và tên: `}
              <b className={classes.textContentColor}>{`${client.fullName}`}</b>
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
              <b className={classes.textContentColor}>{`${client.address}`}</b>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(OrderDetailItem);
