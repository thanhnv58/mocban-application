import {
  Grid,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import {
  fetchListOrder,
  getOrderOfClient,
  loadMoreListOrder
} from "./../../../actions/sale/order-screen-action/actions";
import Copyright from "./../../../components/Copyright";
import {
  getOrderStatus,
  getStatusColor,
  getOrderType
} from "./../../../utils/helpers";
import * as stringUtils from "./../../../utils/stringUtils";
import { convertFrontEndDateTime2 } from "./../../../utils/timeUtils";
import styles from "./styles";

class ListOrderScreen extends Component {
  constructor(props) {
    super(props);

    let { clientUsername } = this.props;

    this.state = {
      filterText: null,
      txtClientUsername: clientUsername ? clientUsername : ""
    };
  }

  componentDidMount() {
    let {
      pageOrder,
      fetchListOrder,
      clientUsername,
      getOrderOfClient
    } = this.props;

    let { currentPage } = pageOrder;
    if (currentPage < 0) {
      if (clientUsername) {
        getOrderOfClient(clientUsername);
      } else {
        fetchListOrder();
      }
    } else {
      if (clientUsername && pageOrder.clientUsername !== clientUsername) {
        getOrderOfClient(clientUsername);
      }

      if (!clientUsername && pageOrder.clientUsername !== null) {
        fetchListOrder();
      }
    }
  }

  render() {
    let { classes } = this.props;
    let { txtClientUsername } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          <b>Danh sách đơn hàng</b>
        </Typography>

        <Grid container direction="row" justify="center">
          <Grid item xs={12} lg={3}>
            <Grid
              container
              component={Paper}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={9} lg={9}>
                <InputBase
                  className={classes.inputSearch}
                  placeholder="Tìm kiếm theo mã khách hàng"
                  type="search"
                  fullWidth
                  name="txtClientUsername"
                  value={txtClientUsername}
                  onChange={this.onChangeField}
                />
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.iconButtonSearch}
                  aria-label="search"
                  onClick={this.searchByClientUsername}
                >
                  <SearchIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box mt={3} mb={3} ml={2} mr={2}>
          {this.renderListOrder()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  onChangeField = e => {
    let { target } = e;
    let { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  renderListOrder = () => {
    let { pageOrder, classes, isLoading1, isLoading2 } = this.props;
    let {
      orders,
      currentTotal,
      totalElements,
      currentPage,
      totalPage
    } = pageOrder;
    let { filterText } = this.state;

    let tempFilterText = filterText
      ? stringUtils.removeAccents(filterText.toLocaleLowerCase())
      : null;

    const listFiltedOrders = !filterText
      ? orders
      : orders.filter(order => {
          return (
            stringUtils
              .removeAccents(order.orderName.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(order.client.username.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(getOrderStatus(order.status).toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(getOrderType(order.orderType).toLocaleLowerCase())
              .includes(tempFilterText)
          );
        });

    // Show list client
    let xhtml = (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">
                Mã đơn hàng ({`${currentTotal}/${totalElements}`})
              </StyledTableCell>
              <StyledTableCell align="center">Thể loại</StyledTableCell>
              <StyledTableCell align="center">Trạng thái</StyledTableCell>
              <StyledTableCell align="center">Ngày tạo</StyledTableCell>
              <StyledTableCell align="center">Thời gian cần</StyledTableCell>
              <StyledTableCell align="center">Mã khách hàng</StyledTableCell>
              <StyledTableCell align="center" colSpan={2}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Bộ lọc"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    type="search"
                    inputProps={{ "aria-label": "search" }}
                    onChange={this.addFilter}
                  />
                </div>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading1 && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  <Box display="flex" justifyContent="center" mt={3} mb={3}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {isLoading1 === false && listFiltedOrders.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={9}
                >
                  <Typography variant="body1" gutterBottom>
                    Danh sách đơn hàng rỗng!
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {listFiltedOrders.map((order, i) => {
              let { client } = order;
              return (
                <StyledTableRow key={order.id}>
                  <StyledTableCell align="center">
                    <b>{i + 1}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>{order.orderName}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {getOrderType(order.orderType)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b style={{ color: getStatusColor(order.status) }}>
                      {getOrderStatus(order.status)}
                    </b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {convertFrontEndDateTime2(order.createdDate)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`${order.estimateDay ? order.estimateDay : 0} ngày`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>{client.username}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {client.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <NavLink
                      to={`/sale/order-detail/${order.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DragIndicatorIcon />}
                      >
                        Chi tiết
                      </Button>
                    </NavLink>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}

            {isLoading1 === false && currentPage < totalPage - 1 && (
              <TableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <div className={classes.wrapper}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isLoading2}
                      startIcon={<CloudDownloadIcon />}
                      onClick={this.loadMore}
                    >
                      Tải thêm
                    </Button>
                    {isLoading2 && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );

    return xhtml;
  };

  searchByClientUsername = () => {
    let { txtClientUsername } = this.state;

    let { getOrderOfClient } = this.props;

    getOrderOfClient(txtClientUsername);
  };

  loadMore = () => {
    let { loadMoreListOrder } = this.props;
    loadMoreListOrder();
  };

  addFilter = e => {
    let { value } = e.target;

    let filterText = value ? value : null;

    this.setState({
      filterText
    });
  };
}

const mapStateToProps = state => ({
  pageOrder: state.saleReducer.pageOrder,
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading2: state.saleReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchListOrder,
      loadMoreListOrder,
      getOrderOfClient
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ListOrderScreen);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#0288d1",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);
