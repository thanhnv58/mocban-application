import { Button, Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as mui from "../../utils/mui";
import styles from "./styles";

class SearchOrderForm extends Component {
  render() {
    let { handleSubmit, classes, invalid, isLoading1 } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item lg={4} md={8} xs={12}>
            <Field
              name="txtClientId"
              fullWidth
              label="Mã khách hàng"
              margin="dense"
              required
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item>
            <div className={classes.wrapper}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                endIcon={<SearchIcon />}
                disabled={invalid || isLoading1}
              >
                Search
              </Button>
              {isLoading1 && (
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

  onSubmit = formData => {
    let { txtClientId } = formData;

    let { searchOrderByClientId } = this.props;
    searchOrderByClientId(txtClientId);
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = state => ({
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export const validate = values => {
  const errors = {};

  let { txtClientId } = values;

  if (!txtClientId) {
    errors.txtClientId = "Nhập mã khách hàng!";
  }

  return errors;
};

const form = reduxForm({
  form: "SEARCH_ORDER_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, form)(SearchOrderForm);
