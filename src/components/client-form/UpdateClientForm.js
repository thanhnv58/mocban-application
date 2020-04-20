import { Button, Grid, Select, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import * as ClientStatus from "../../constants/ClientStatus";
import { updateClient } from "../../actions/sale/client-management/actions";
import { helpers_toStringClientStatus } from "../../utils/helpers";

class UpdateClientForm extends Component {
  constructor(props) {
    super(props);

    let { clientStatus, note } = this.props;

    this.state = {
      clientStatus: clientStatus,
      txtNote: note ? note : "",
    };
  }

  render() {
    let { classes, isLoading2 } = this.props;
    let { clientStatus, txtNote } = this.state;
    return (
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="flex-end"
      >
        <Grid item lg={2} xs={12}>
          {clientStatus === ClientStatus.JUST_APPROACHED ||
          clientStatus === ClientStatus.HAVE_DEMAND ? (
            <Select
              native
              value={clientStatus}
              fullWidth
              onChange={this.handleChange}
              inputProps={{
                name: "clientStatus",
              }}
            >
              <option value={ClientStatus.JUST_APPROACHED}>Mới tiếp cận</option>
              <option value={ClientStatus.HAVE_DEMAND}>Đang có nhu cầu</option>
            </Select>
          ) : (
            <b className="color-blue">
              {helpers_toStringClientStatus(clientStatus)}
            </b>
          )}
        </Grid>
        <Grid item lg={8} xs={12}>
          <TextField
            name="txtNote"
            fullWidth
            label="Ghi chú"
            defaultValue={txtNote}
            onChange={this.handleChange}
          />
        </Grid>

        <Grid item lg={2} xs={12}>
          <div className={classes.wrapper}>
            <Button
              className="btn-orange"
              color="primary"
              variant="contained"
              disabled={isLoading2}
              onClick={this.updateClientDetail}
            >
              Cập nhật
            </Button>
            {isLoading2 && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Grid>
      </Grid>
    );
  }

  handleChange = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  };

  updateClientDetail = (e) => {
    let { clientStatus, txtNote } = this.state;

    let { updateClient, idClient } = this.props;
    updateClient(idClient, { status: clientStatus, note: txtNote });
  };
}

const withMyStyle = withStyles(styles);

const mapStateToProps = (state) => ({
  isLoading2: state.saleReducer.ui.isLoading2,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updateClient,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withMyStyle, connectRedux)(UpdateClientForm);
