import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Grid,
  TablePagination,
  Select,
  Paper,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { getAllOrder } from "../../../actions/sale/order-management/actions";
import ReplayIcon from "@material-ui/icons/Replay";
import Copyright from "../../../components/Copyright";
import { helpers_toStringOrderStatus } from "../../../utils/helpers";
import * as SearchOrderStatus from "../../../constants/SearchOrderStatus";

import {
  BorderLinearProgressRed,
  BorderLinearProgressGreen,
  BorderLinearProgressOrange,
  BorderLinearProgressBlue,
} from "../../../views/common-view/CommonView";

class OrderManagementScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      searchOrderStatus: SearchOrderStatus.NORMAL,
    };

    this.choiceStatus = this.choiceStatus.bind(this);
  }

  componentDidMount() {
    let { pageOrder, getAllOrder } = this.props;

    if (!pageOrder) {
      let { page, rowsPerPage } = this.state;
      getAllOrder(1, page, rowsPerPage);
    } else {
      let { page, size, status } = pageOrder;

      this.setState({
        page: page,
        rowsPerPage: size,
        searchOrderStatus: status,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-5">{this.render_filterView()}</div>

        <Button
          variant="contained"
          color="primary"
          className="btn-blue mb-3"
          startIcon={<ReplayIcon />}
          onClick={this.refreshListClient}
        >
          Làm mới danh sách
        </Button>

        {this.render_clientTable()}
        <Copyright />
      </React.Fragment>
    );
  }

  render_filterView = () => {
    let { searchOrderStatus } = this.state;

    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-end"
        spacing={2}
      >
        <Grid item xs={12} lg={3}>
          <Select
            native
            value={searchOrderStatus}
            fullWidth
            onChange={this.choiceStatus}
            inputProps={{
              name: "searchOrderStatus",
            }}
          >
            <option value={SearchOrderStatus.NORMAL}>Đơn hàng hiện tại</option>
            <option value={SearchOrderStatus.ALL}>Tất cả</option>
            <option value={SearchOrderStatus.INIT}>Mới khởi tạo</option>
            <option value={SearchOrderStatus.IN_PROGRESS}>Thợ đang làm</option>
            <option value={SearchOrderStatus.FINISH}>Đã hoàn thành</option>
            <option value={SearchOrderStatus.DESIGN}>Đơn hàng thiết kế</option>
            <option value={SearchOrderStatus.PRODUCT}>Đơn hàng sản xuất</option>
          </Select>
        </Grid>
      </Grid>
    );
  };

  render_clientTable = () => {
    let { isLoading1 } = this.props;

    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      let { pageOrder } = this.props;

      if (!pageOrder) {
        return null;
      } else {
        let { elements, totalElements } = pageOrder;
        let { isLoading2 } = this.props;
        let { page, rowsPerPage } = this.state;
        return (
          <React.Fragment>
            <TableContainer component={Paper}>
              <Table
                stickyHeader
                aria-label="sticky table"
                className="table-bordered"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="table-header">
                      STT
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Tên KH
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Mã KH
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Mã đơn hàng
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Loại
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Trạng thái
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Thời gian
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Tiến độ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elements.map((order, index) => {
                    let progressTime = null;
                    if (order.progressTime) {
                      if (order.color === "red") {
                        progressTime = (
                          <BorderLinearProgressRed
                            variant="determinate"
                            value={order.progressTime}
                          />
                        );
                      } else if (order.color === "orange") {
                        progressTime = (
                          <BorderLinearProgressOrange
                            variant="determinate"
                            value={order.progressTime}
                          />
                        );
                      } else {
                        progressTime = (
                          <BorderLinearProgressGreen
                            variant="determinate"
                            value={order.progressTime}
                          />
                        );
                      }
                    } else {
                      progressTime = "N/A";
                    }

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.idOrder}
                        align="center"
                      >
                        <TableCell align="center">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell align="center">{order.clientName}</TableCell>
                        <TableCell align="center">{order.clientCode}</TableCell>
                        <TableCell align="center">
                          <NavLink to={`/sale/order-detail/${order.idOrder}`}>
                            {order.code}
                          </NavLink>
                        </TableCell>
                        <TableCell align="center">{order.type}</TableCell>
                        <TableCell align="center">
                          <b>{helpers_toStringOrderStatus(order.status)}</b>
                        </TableCell>
                        <TableCell
                          className="ellipsis"
                          style={{ minWidth: 160 }}
                          align="center"
                        >
                          {progressTime}
                        </TableCell>

                        <TableCell
                          className="ellipsis"
                          style={{ minWidth: 160 }}
                          align="center"
                        >
                          {order.progress ? (
                            <BorderLinearProgressBlue
                              variant="determinate"
                              value={order.progress}
                            />
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {totalElements === 0 && (
                    <TableRow align="center">
                      <TableCell align="center" colSpan={8}>
                        Không có đơn hàng.....
                      </TableCell>
                    </TableRow>
                  )}
                  {isLoading2 && (
                    <TableRow align="center">
                      <TableCell align="center" colSpan={8}>
                        <CircularProgress size={30} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </React.Fragment>
        );
      }
    }
  };

  refreshListClient = (e) => {
    let { searchOrderStatus } = this.state;

    let { getAllOrder } = this.props;
    let { rowsPerPage } = this.state;
    this.setState({
      page: 0,
    });
    getAllOrder(1, 0, rowsPerPage, searchOrderStatus);
  };

  choiceStatus(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
      page: 0,
    });

    let { getAllOrder } = this.props;
    let { rowsPerPage } = this.state;
    getAllOrder(2, 0, rowsPerPage, event.target.value);
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });

    let { getAllOrder } = this.props;
    let { rowsPerPage, searchOrderStatus } = this.state;
    getAllOrder(2, newPage, rowsPerPage, searchOrderStatus);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });

    let { getAllOrder } = this.props;
    let { searchOrderStatus } = this.state;
    getAllOrder(2, 0, event.target.value, searchOrderStatus);
  };
}

const mapStateToProps = (state) => ({
  pageOrder: state.saleReducer.pageOrder,
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading2: state.saleReducer.ui.isLoading2,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllOrder,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(OrderManagementScreen);
