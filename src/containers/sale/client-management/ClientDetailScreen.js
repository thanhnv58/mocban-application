import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../components/Copyright";
import { getClientDetail } from "../../../actions/sale/client-management/actions";
import { timeUtils_parseDateTime2 } from "../../../utils/timeUtils";
import { helpers_toStringClientStatus } from "../../../utils/helpers";
import UpdateClientForm from "../../../components/client-form/UpdateClientForm";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {
  BorderLinearProgressRed,
  BorderLinearProgressGreen,
  BorderLinearProgressOrange,
  BorderLinearProgressBlue,
} from "../../../views/common-view/CommonView";
import { helpers_toStringOrderStatus } from "../../../utils/helpers";

class ClientDetailScreen extends Component {
  componentDidMount() {
    let { getClientDetail, idClient, clientDetail } = this.props;

    if (
      !clientDetail ||
      parseInt(clientDetail.clientInfo.idClient) !== parseInt(idClient)
    ) {
      getClientDetail(idClient);
    }
  }

  render() {
    let { clientDetail } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          Chi tiết khách hàng
        </Typography>

        {clientDetail && (
          <Box mt={3} ml={3} mr={3} mb={2}>
            <NavLink
              to={`/sale/${clientDetail.clientInfo.idClient}/create-order`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button
                variant="contained"
                color="primary"
                className="btn-green mb-3"
                startIcon={<AddIcon />}
              >
                Tạo đơn hàng
              </Button>
            </NavLink>
          </Box>
        )}

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_getClientDetail()}
        </Box>

        <Box mt={3} ml={3} mr={3} mb={2}>
          {this.render_updateClientDetail()}
        </Box>

        <Box mt={3} ml={3} mr={3} mb={5}>
          {this.render_orderList()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  render_getClientDetail = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      let { clientDetail } = this.props;

      if (!clientDetail) {
        return null;
      } else {
        let { clientInfo } = clientDetail;
        return (
          <React.Fragment>
            <b>Thông tin cá nhân</b>
            <Box ml={2} mt={1}>
              <Grid container spacing={1}>
                <Grid item xs={6} lg={2}>
                  Họ tên:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.fullName}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Số ĐT:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.phoneNumber}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Địa chỉ:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.address}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Email:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.email}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Trạng thái:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b className="color-blue">
                    {helpers_toStringClientStatus(clientInfo.status)}
                  </b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Mã KH:
                </Grid>
                <Grid item xs={6} lg={4}>
                  <b>{clientInfo.code}</b>
                </Grid>

                <Grid item xs={6} lg={2}>
                  Ghi chú:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {clientInfo.note}
                </Grid>

                <Grid item xs={6} lg={2}>
                  Ngày tạo:
                </Grid>
                <Grid item xs={6} lg={4}>
                  {timeUtils_parseDateTime2(clientInfo.createdDate)}
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_updateClientDetail = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { clientDetail } = this.props;

      if (!clientDetail) {
        return null;
      } else {
        let { clientInfo } = clientDetail;
        let { idClient } = this.props;
        return (
          <React.Fragment>
            <b>Cập nhật thông tin khách hàng</b>
            <Box ml={2} mt={1}>
              <UpdateClientForm
                idClient={idClient}
                clientStatus={clientInfo.status}
                note={clientInfo.note}
              />
            </Box>
          </React.Fragment>
        );
      }
    }
  };

  render_orderList = () => {
    let { isLoading1 } = this.props;
    if (isLoading1) {
      return null;
    } else {
      let { clientDetail } = this.props;

      if (!clientDetail) {
        return null;
      } else {
        let { orders } = clientDetail;
        return (
          <React.Fragment>
            <b>Danh sách đơn hàng</b>
            <Box ml={2} mt={1}>
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
                    {orders.map((order, index) => {
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
                          <TableCell align="center">{index + 1}</TableCell>
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

                    {orders.length === 0 && (
                      <TableRow align="center">
                        <TableCell align="center" colSpan={8}>
                          Không có đơn hàng.....
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </React.Fragment>
        );
      }
    }
  };
}

const mapStateToProps = (state) => ({
  isLoading1: state.saleReducer.ui.isLoading1,
  clientDetail: state.saleReducer.clientDetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getClientDetail,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(ClientDetailScreen);
