import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import CreateOrderForm from "../../../components/order/CreateOrderForm";
import { confirmCreateOrderSuccess } from "./../../../actions/sale/order-screen-action/actions";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import styles from "./styles";
import { Redirect } from "react-router-dom";

class CreateOrderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToOrderList: false
    };
  }

  render() {
    let { classes, clientId, needConfirm1 } = this.props;

    let initialValues = {
      txtUsername: clientId ? clientId : ""
    };

    if (this.state.redirectToOrderList === true) {
      return (
        <Redirect
          to={{
            pathname: "/sale/orders/list"
          }}
        />
      );
    }

    return (
      <React.Fragment>
        {needConfirm1 && this.renderDialogConfirm()}
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={7}>
            <Paper className={classes.paperForm}>
              <Typography variant="h6" align="left">
                Tạo đơn hàng
              </Typography>
              <Box m={2}>
                <Divider />
              </Box>
              <Box mt={3} ml={3} mr={3} mb={1}>
                <CreateOrderForm initialValues={initialValues} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
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
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Typography>Bạn đã tạo đơn hàng thành công!</Typography>
              <Typography>
                Mã KH: <b>{newOrder.clientUsername}</b>
              </Typography>
              <Typography>
                Mã đơn hàng: <b>{newOrder.orderId}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Box display="flex" justifyContent="center" m={1}>
                <DoneRoundedIcon style={{ color: "#1b5e20", fontSize: 60 }} />
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
