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
  TableContainer,
  Paper,
  Toolbar,
  Tooltip,
  IconButton,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import * as OrderType from "../../constants/OrderType";
import * as mui from "../../utils/mui";
import AddItemView from "./AddItemView";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import { createOrder } from "../../actions/sale/order-management/actions";

import { toastError } from "../../utils/ToastUtils";

class CreateOrderForm extends Component {
  constructor(props) {
    super(props);

    let { idParent } = this.props;

    this.state = {
      orderType: idParent ? OrderType.PRODUCT : OrderType.DESIGN,
      arrItems: [],
      selected: [],
    };
  }

  render() {
    let {
      handleSubmit,
      classes,
      pristine,
      invalid,
      isLoading1,
      idParent,
    } = this.props;
    let { orderType } = this.state;

    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(this.onSubmit)}
      >
        <Grid container spacing={2}>
          {!idParent && (
            <React.Fragment>
              <Grid item lg={4} xs={12}>
                <Field
                  name="txtContact"
                  component={mui.renderTextField}
                  label="Người liên hệ tại công trình"
                  required
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item lg={8} xs={12}>
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
            </React.Fragment>
          )}

          <Grid item lg={12} xs={12}>
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
          <Grid item lg={12} xs={12}>
            <RadioGroup
              aria-label="gender"
              name="orderType"
              value={orderType}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value={OrderType.DESIGN}
                control={<Radio />}
                label="Đơn hàng thiết kế"
                disabled={idParent ? true : false}
              />
              <FormControlLabel
                value={OrderType.PRODUCT}
                control={<Radio />}
                label="Đơn hàng sản xuất"
              />
            </RadioGroup>
          </Grid>

          {orderType === OrderType.PRODUCT && (
            <Grid item lg={12} ms={12} md={12}>
              <Field
                name="txtNumberOfDay"
                component={mui.renderTextField}
                label="Thời gian hoàn thành (ngày)"
                margin="dense"
                variant="outlined"
                type="number"
                fullWidth
              />
            </Grid>
          )}

          {orderType === OrderType.PRODUCT && (
            <Grid item lg={12} md={12}>
              {this.renderProductionItem()}
            </Grid>
          )}

          {!invalid && (
            <Grid item lg={12} md={12}>
              <div className={classes.wrapper} align="center">
                <Button
                  className="btn-green"
                  color="primary"
                  variant="contained"
                  type="submit"
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
            </Grid>
          )}
        </Grid>
      </form>
    );
  }

  renderProductionItem = () => {
    let { arrItems } = this.state;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" align="left">
          Thêm đồ
        </Typography>
        <Box m={1}>
          <AddItemView onAddItem={this.onAddItem} />
        </Box>

        {arrItems.length > 0 && (
          <Box ml={1} mr={2} mt={2}>
            {this.render_tableItems()}
          </Box>
        )}
      </React.Fragment>
    );
  };

  onSubmit = (formData) => {
    let { txtContact, txtLocation, txtNote, txtNumberOfDay } = formData;
    let { arrItems, orderType } = this.state;
    let { createOrder, idClient, idParent } = this.props;

    if (orderType === OrderType.DESIGN) {
      let requestDto = {
        contact: txtContact,
        location: txtLocation,
        note: txtNote,
      };

      createOrder(idClient, orderType, requestDto);
    } else {
      let requestDto = {
        contact: txtContact,
        location: txtLocation,
        note: txtNote,
        items: arrItems,
        numberOfDay: txtNumberOfDay,
        idDesignOrder: idParent ? idParent : null,
      };

      if (arrItems.length === 0) {
        toastError("Phải thêm đồ khi tạo đơn sản xuất");
      } else {
        createOrder(idClient, orderType, requestDto);
      }
    }
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onAddItem = (item) => {
    let { arrItems } = this.state;
    arrItems.push(item);

    this.setState({
      arrItems: [...arrItems],
    });
  };

  render_tableItems = () => {
    let { classes } = this.props;
    let { selected, arrItems } = this.state;

    return (
      <Paper className={classes.paper}>
        <Toolbar className={selected.length > 0 ? classes.highlight : ""}>
          {selected.length > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {selected.length} selected
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Danh sách đồ
            </Typography>
          )}

          {selected.length > 0 && (
            <Tooltip title="Delete">
              <IconButton aria-label="delete" onClick={this.removeAll}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>

        <TableContainer>
          <Table
            className="table-bordered"
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  className="table-header"
                  align="center"
                >
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < arrItems.length
                    }
                    checked={
                      arrItems.length > 0 && selected.length === arrItems.length
                    }
                    onChange={this.handleSelectAllClick}
                    inputProps={{ "aria-label": "select all desserts" }}
                  />
                </TableCell>
                <TableCell align="center" className="table-header">
                  STT
                </TableCell>
                <TableCell align="center" className="table-header">
                  Tên
                </TableCell>
                <TableCell align="center" className="table-header">
                  Mô tả
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {arrItems.map((row, index) => {
                const isItemSelected = this.isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => this.handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox" align="center">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell component="th" id={labelId} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  };

  removeAll = (e) => {
    let { arrItems, selected } = this.state;

    let newArr = arrItems.filter((item) => {
      return !selected.includes(item.id);
    });

    this.setState({
      arrItems: newArr,
      selected: [],
    });
  };

  handleSelectAllClick = (event) => {
    let { arrItems } = this.state;

    if (event.target.checked) {
      const newSelecteds = arrItems.map((n) => n.id);
      this.setState({
        selected: newSelecteds,
      });
      return;
    }

    this.setState({
      selected: [],
    });
  };

  isSelected = (id) => {
    let { selected } = this.state;
    return selected.indexOf(id) !== -1;
  };

  handleClick = (event, id) => {
    let { selected } = this.state;

    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
    });
  };
}

const withMyStyle = withStyles(styles);

export const validate = (values) => {
  const errors = {};
  const listField = [
    {
      field: "txtContact",
      message: "Nhập người liên hệ tại công trình!",
    },
    {
      field: "txtLocation",
      message: "Nhập ví trí của công trình!",
    },
    {
      field: "txtNumberOfDay",
      message: "Điền thời gian!",
    },
  ];

  listField.forEach((fieldElm) => {
    if (!values[fieldElm.field]) {
      errors[fieldElm.field] = fieldElm.message;
      return errors;
    }
  });

  return errors;
};

const mapStateToProps = (state) => ({
  isLoading1: state.saleReducer.ui.isLoading1,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      createOrder,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const userForm = reduxForm({
  form: "CREATE_ORDER_FORM",
  validate,
});

export default compose(withMyStyle, connectRedux, userForm)(CreateOrderForm);
