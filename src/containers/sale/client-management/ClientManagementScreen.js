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
  TextField,
  Paper,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { getAllClient } from "../../../actions/sale/client-management/actions";
import ReplayIcon from "@material-ui/icons/Replay";
import Copyright from "../../../components/Copyright";
import { helpers_toStringClientStatus } from "../../../utils/helpers";
import AddIcon from "@material-ui/icons/Add";
import * as ClientStatus from "../../../constants/ClientStatus";

class ClientManagementScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      clientStatus: ClientStatus.HAVE_ORDER,
      txtSearch: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.choiceStatus = this.choiceStatus.bind(this);
  }

  componentDidMount() {
    let { pageClient, getAllClient } = this.props;
    if (!pageClient) {
      let { page, rowsPerPage } = this.state;
      getAllClient(1, page, rowsPerPage);
    } else {
      let { page, size, search, status } = pageClient;

      this.setState({
        page: page,
        rowsPerPage: size,
        clientStatus: status,
        txtSearch: search,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-5">{this.render_filterView()}</div>
        <NavLink
          to={`/sale/create-client`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            variant="contained"
            color="primary"
            className="btn-green mb-3"
            startIcon={<AddIcon />}
          >
            Tạo khách hàng
          </Button>
        </NavLink>

        <Button
          variant="contained"
          color="primary"
          className="btn-blue ml-3 mb-3"
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
    let { clientStatus, txtSearch } = this.state;

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
            value={clientStatus}
            fullWidth
            onChange={this.choiceStatus}
            inputProps={{
              name: "clientStatus",
            }}
          >
            <option value="ALL">Tất cả</option>
            <option value={ClientStatus.JUST_APPROACHED}>Mới tiếp cận</option>
            <option value={ClientStatus.HAVE_DEMAND}>Đang có nhu cầu</option>
            <option value={ClientStatus.HAVE_ORDER}>Đang có đơn hàng</option>
            <option value={ClientStatus.AFTER_SERVICE}>Khách hàng cũ</option>
          </Select>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label="Tìm kiếm theo mã KH hoặc tên"
            name="txtSearch"
            value={txtSearch}
            onChange={this.handleChange}
            type="search"
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <Button
            variant="contained"
            color="primary"
            className="btn-blue"
            onClick={this.applyFilter}
          >
            Tìm kiếm
          </Button>
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
      let { pageClient } = this.props;

      if (!pageClient) {
        return null;
      } else {
        let { elements, totalElements } = pageClient;
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
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell align="center" className="table-header">
                      STT
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Tên đầy đủ
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Mã khách hàng
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Số điện thoại
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Trạng thái
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Ghi chú
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elements.map((client, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={client.idClient}
                        align="center"
                      >
                        <TableCell align="center">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell align="center">
                          <NavLink
                            to={`/sale/client-detail/${client.idClient}`}
                          >
                            {client.fullName}
                          </NavLink>
                        </TableCell>
                        <TableCell align="center">{client.code}</TableCell>
                        <TableCell align="center">
                          {client.phoneNumber}
                        </TableCell>
                        <TableCell align="center">
                          <b>{helpers_toStringClientStatus(client.status)}</b>
                        </TableCell>
                        <TableCell
                          className="ellipsis"
                          style={{ minWidth: 160 }}
                          align="left"
                        >
                          {client.note}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {totalElements === 0 && (
                    <TableRow align="center">
                      <TableCell align="center" colSpan={6}>
                        Không có khách hàng.....
                      </TableCell>
                    </TableRow>
                  )}
                  {isLoading2 && (
                    <TableRow align="center">
                      <TableCell align="center" colSpan={6}>
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

  applyFilter = (e) => {
    let { txtSearch, clientStatus } = this.state;

    let { getAllClient } = this.props;
    let { rowsPerPage } = this.state;
    this.setState({
      page: 0,
    });
    getAllClient(2, 0, rowsPerPage, txtSearch, clientStatus);
  };

  refreshListClient = (e) => {
    let { txtSearch, clientStatus } = this.state;

    let { getAllClient } = this.props;
    let { rowsPerPage } = this.state;
    this.setState({
      page: 0,
    });
    getAllClient(1, 0, rowsPerPage, txtSearch, clientStatus);
  };

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  choiceStatus(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
      page: 0,
      txtSearch: "",
    });

    let { getAllClient } = this.props;
    let { rowsPerPage } = this.state;

    getAllClient(2, 0, rowsPerPage, "", event.target.value);
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });

    let { getAllClient } = this.props;
    let { rowsPerPage, txtSearch, clientStatus } = this.state;
    getAllClient(2, newPage, rowsPerPage, txtSearch, clientStatus);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });

    let { getAllClient } = this.props;
    let { txtSearch, clientStatus } = this.state;
    getAllClient(2, 0, event.target.value, txtSearch, clientStatus);
  };
}

const mapStateToProps = (state) => ({
  pageClient: state.saleReducer.pageClient,
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading2: state.saleReducer.ui.isLoading2,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllClient,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(ClientManagementScreen);
