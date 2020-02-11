import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  InputAdornment,
  TableContainer,
  Paper
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as OrderType from "../../constants/OrderType";
import * as mui from "../../utils/mui";
import AddItemView from "./AddItemView";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import * as arrayUtils from "./../../utils/arrayUtils";
import normalizeCurrency from "../../views/normalizeCurrency";
import { getCurrencyValue } from "./../../utils/helpers";
import { createOrder } from "./../../actions/sale/order-screen-action/actions";

class CreateOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: null,
      arrItems: []
    };
  }

  render() {
    let { handleSubmit, classes, pristine, invalid, isLoading1 } = this.props;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item lg={6} md={12} xs={12}>
            <Field
              name="txtUsername"
              fullWidth
              label="Mã khách hàng"
              margin="dense"
              variant="outlined"
              component={mui.renderTextField}
            />
          </Grid>

          <Grid item lg={6} md={12} xs={12}>
            <Field
              name="txtClientContact"
              component={mui.renderTextField}
              label="SĐT người liên hệ tại công trình"
              required
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} md={12} xs={12}>
            <Field
              name="txtAmount"
              component={mui.renderTextField}
              label="Tiền ứng cho yêu cầu"
              margin="dense"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                )
              }}
              normalize={normalizeCurrency}
            />
          </Grid>

          <Grid item lg={6} md={12} xs={12}>
            <Field
              name="txtAmountNote"
              component={mui.renderTextField}
              label="Tin nhắn chuyển tiền"
              required
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <Field
              name="txtLocation"
              component={mui.renderTextField}
              label="Địa chỉ công trình"
              margin="dense"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <Field
              name="txtOrderType"
              component={mui.radioOrderType}
              onChange={this.onFieldChange}
            />
          </Grid>

          <Grid item lg={12} md={12} xs={12}>
            <Field
              name="txtNote"
              component={mui.renderTextField}
              label="Ghi chú"
              multiline
              margin="dense"
              variant="outlined"
              fullWidth
              rows="5"
              rowsMax="10"
            />
          </Grid>

          <Grid item lg={12} ms={12} md={12}>
            {this.renderProductionItem()}
          </Grid>

          <Grid item lg={12} xs={12} md={12}>
            <Box display="flex" flexDirection="row">
              <Box mr={1}>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    endIcon={<AddIcon />}
                    disabled={pristine || invalid || isLoading1}
                  >
                    Tạo đơn hàng
                  </Button>
                  {isLoading1 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
              <Box>
                <div className={classes.wrapper}>
                  <Button
                    color="primary"
                    variant="contained"
                    endIcon={<RotateLeftIcon />}
                    onClick={this.onReset}
                    style={{ backgroundColor: "#ff8f00" }}
                  >
                    Reset
                  </Button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  renderProductionItem = () => {
    let { classes } = this.props;
    let { orderType, arrItems } = this.state;

    if (orderType !== OrderType.PRODUCTION) return null;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" align="left">
          Liệt kê đồ đạc cần sản xuất
        </Typography>
        <Box m={1}>
          <AddItemView onAddItem={this.onAddItem} />
        </Box>

        {arrItems.length > 0 && (
          <Box m={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">STT</StyledTableCell>
                    <StyledTableCell align="center">Tên</StyledTableCell>
                    <StyledTableCell align="center">Mô tả</StyledTableCell>
                    <StyledTableCell align="center">Hành động</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrItems.map((item, i) => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row" align="left">
                        <b>{i + 1}</b>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={() => {
                            this.onRemoveItem(item);
                          }}
                          startIcon={<DeleteIcon />}
                          style={{
                            backgroundColor: "#f44336"
                          }}
                        >
                          Xóa
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </React.Fragment>
    );
  };

  onSubmit = formData => {
    let {
      txtUsername,
      txtClientContact,
      txtLocation,
      txtAmount,
      txtAmountNote,
      txtOrderType,
      txtNote
    } = formData;

    let { arrItems } = this.state;

    let requestDto = {
      clientUsername: txtUsername,
      clientContact: txtClientContact,
      location: txtLocation,
      orderType: txtOrderType,
      note: txtNote,
      firstAmount: getCurrencyValue(txtAmount),
      messageAmount: txtAmountNote,
      items: arrItems
    };

    let { createOrder } = this.props;
    createOrder(requestDto);
  };

  onReset = () => {
    let { reset } = this.props;

    this.setState({
      orderType: null,
      arrItems: []
    });
    reset();
  };

  onFieldChange = e => {
    let { target } = e;
    let { name, value } = target;

    if (name === "txtOrderType") {
      this.setState({
        orderType: value
      });
    }
  };

  onAddItem = item => {
    let { arrItems } = this.state;
    arrItems.push(item);

    this.setState({
      arrItems: [...arrItems]
    });
  };

  onRemoveItem = item => {
    let { arrItems } = this.state;

    let index = arrayUtils.findIndexOfElementInArray(arrItems, i => {
      return item.id === i.id;
    });

    if (index !== -1) {
      arrItems.splice(index, 1);

      this.setState({
        arrItems: [...arrItems]
      });
    }
  };
}

const withMyStyle = withStyles(styles);

export const validate = values => {
  const errors = {};

  let {
    txtUsername,
    txtClientContact,
    txtLocation,
    txtOrderType,
    txtAmount,
    txtAmountNote
  } = values;

  if (
    !txtUsername &&
    !txtClientContact &&
    !txtLocation &&
    !txtOrderType &&
    !txtAmount &&
    !txtAmountNote
  ) {
    return errors;
  }

  const listField = [
    {
      field: "txtUsername",
      message: "Nhập mã khách hàng!"
    },
    {
      field: "txtClientContact",
      message: "Nhập SĐT liên hệ tại công trình!"
    },
    {
      field: "txtLocation",
      message: "Nhập ví trí của công trình!"
    },
    {
      field: "txtOrderType",
      message: "Chọn loại Order!"
    },
    {
      field: "txtAmount",
      message: "Nhập tiền tạm ứng của order!"
    },
    {
      field: "txtAmountNote",
      message: "Nhập tin nhắn chuyển tiền để kế toán kiểm tra!"
    }
  ];

  listField.forEach(fieldElm => {
    if (!values[fieldElm.field]) {
      errors[fieldElm.field] = fieldElm.message;
      return errors;
    }
  });

  if (txtUsername && txtUsername.includes(" ")) {
    errors.txtUsername = "Tên đăng nhập không được chứa khoảng trắng!";
    return errors;
  }

  return errors;
};

const mapStateToProps = state => ({
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createOrder
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "CREATE_ORDER_FORM",
  validate
});

export default compose(withMyStyle, connectRedux, userForm)(CreateOrderForm);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#0288d1",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);
