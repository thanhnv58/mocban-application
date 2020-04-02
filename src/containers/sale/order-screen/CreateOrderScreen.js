import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import CreateOrderForm from "../../../components/order/CreateOrderForm";
import { confirmCreateOrderSuccess } from "./../../../actions/sale/order-screen-action/actions";
import styles from "./styles";

class CreateOrderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToOrderList: false
    };
  }

  render() {
    let { clientUsername, needConfirm1 } = this.props;

    let initialValues = {
      txtUsername: clientUsername ? clientUsername : ""
    };

    if (this.state.redirectToOrderList === true) {
      return (
        <Redirect
          to={{
            pathname: `/sale/list-order/${clientUsername}`
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {needConfirm1 && this.renderDialogConfirm()}
        <CssBaseline />
        <Typography variant="h6" align="left">
          Tạo đơn hàng
        </Typography>

        <Box mt={3} ml={3} mr={3} mb={1}>
          <CreateOrderForm initialValues={initialValues} />
        </Box>
        <Box mt={4}></Box>

        <Copyright />
      </React.Fragment>
    );
  }

  renderDialogConfirm = () => {
    let { needConfirm1, newOrder } = this.props;

    if (newOrder === null) {
      return null;
    }

    return (
      <Dialog
        open={needConfirm1}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận tạo đơn hàng"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <Typography>
                <b style={{ color: "green" }}>
                  Bạn đã tạo đơn hàng thành công!
                </b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography>
                Mã KH: <b>{newOrder.client.username}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography>
                Mã ĐH: <b>{newOrder.orderName}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" justifyContent="center" m={1}>
                <ThumbUpAltIcon style={{ color: "#1565c0", fontSize: 60 }} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Ở lại đây
          </Button>

          <Button
            onClick={this.goToListOrder}
            variant="contained"
            color="primary"
          >
            Tới Danh sách đơn hàng
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  handleClose = () => {
    let { confirmCreateOrderSuccess } = this.props;
    confirmCreateOrderSuccess();
  };

  goToListOrder = () => {
    let { confirmCreateOrderSuccess } = this.props;
    confirmCreateOrderSuccess();

    this.setState({
      redirectToOrderList: true
    });
  };
}

const mapStateToProps = state => ({
  needConfirm1: state.saleReducer.ui.needConfirm1,
  newOrder: state.saleReducer.newOrder
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ confirmCreateOrderSuccess }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(CreateOrderScreen);
