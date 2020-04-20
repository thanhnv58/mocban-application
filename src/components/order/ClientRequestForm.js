import { Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import { updateClientRequest } from "../../actions/sale/order-management/actions";
import * as mui from "../../utils/mui";
import styles from "./styles";

class ClientRequestForm extends Component {
  render() {
    let { handleSubmit, classes, pristine, isLoading4 } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12}>
            <Field
              name="txtClientRequest"
              multiline
              fullWidth
              rows="6"
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item>
            <div className={classes.wrapper}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LocalGroceryStoreIcon />}
                disabled={isLoading4 || pristine}
              >
                Cập nhật yêu cầu khách hàng
              </Button>
              {isLoading4 && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }

  onSubmit = (formData) => {
    let { txtClientRequest } = formData;

    let { updateClientRequest, orderId } = this.props;

    updateClientRequest({
      orderId: orderId,
      clientRequest: txtClientRequest,
    });
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = (state) => ({
  isLoading4: state.saleReducer.ui.isLoading4,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateClientRequest,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const clientRequestForm = reduxForm({
  form: "CLIENT_REQUEST_FORM",
  enableReinitialize: true,
});

export default compose(
  withMyStyle,
  connectRedux,
  clientRequestForm
)(ClientRequestForm);
