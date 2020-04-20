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
import { getAllUser } from "../../../actions/admin/user-management/actions";
import ReplayIcon from "@material-ui/icons/Replay";
import Copyright from "../../../components/Copyright";
import AddIcon from "@material-ui/icons/Add";
import * as UserRole from "../../../constants/UserRole";

class UserManagementScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10,
      userRole: "",
      txtSearch: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.choiceRole = this.choiceRole.bind(this);
  }

  componentDidMount() {
    let { pageUser, getAllUser } = this.props;
    if (!pageUser) {
      let { page, rowsPerPage } = this.state;
      getAllUser(1, page, rowsPerPage);
    } else {
      let { page, size, search, role } = pageUser;

      this.setState({
        page: page,
        rowsPerPage: size,
        userRole: role,
        txtSearch: search,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="mb-5">{this.render_filterView()}</div>
        <NavLink
          to={`/admin/create-user`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Button
            variant="contained"
            color="primary"
            className="btn-green mb-3"
            startIcon={<AddIcon />}
          >
            Tạo user
          </Button>
        </NavLink>

        <Button
          variant="contained"
          color="primary"
          className="btn-blue ml-3 mb-3"
          startIcon={<ReplayIcon />}
          onClick={this.refreshListUser}
        >
          Refresh
        </Button>

        {this.render_userTable()}
        <Copyright />
      </React.Fragment>
    );
  }

  render_filterView = () => {
    let { userRole, txtSearch } = this.state;

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
            value={userRole}
            fullWidth
            onChange={this.choiceRole}
            inputProps={{
              name: "userRole",
            }}
          >
            <option value="">ALL</option>
            <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
            <option value={UserRole.MANAGER}>{UserRole.MANAGER}</option>
            <option value={UserRole.SALE}>{UserRole.SALE}</option>
            <option value={UserRole.WORKER}>{UserRole.WORKER}</option>
            <option value={UserRole.ACCOUNTANT}>{UserRole.ACCOUNTANT}</option>
            <option value={UserRole.COMPLETER}>{UserRole.COMPLETER}</option>
          </Select>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            label="Tìm kiếm theo username"
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

  render_userTable = () => {
    let { isLoading1 } = this.props;

    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress />
        </Box>
      );
    } else {
      let { pageUser } = this.props;

      if (!pageUser) {
        return null;
      } else {
        let { elements, totalElements } = pageUser;
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
                      Username
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Chức năng
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Số điện thoại
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Email
                    </TableCell>
                    <TableCell align="center" className="table-header">
                      Địa chỉ
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {elements.map((user, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user.idUser + user.role}
                        align="center"
                      >
                        <TableCell align="center">
                          {page * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell align="center">
                          <NavLink to={`/admin/user-detail/${user.idUser}`}>
                            {user.fullName}
                          </NavLink>
                        </TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.role}</TableCell>
                        <TableCell align="center">{user.phoneNumber}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.address}</TableCell>
                      </TableRow>
                    );
                  })}

                  {totalElements === 0 && (
                    <TableRow align="center">
                      <TableCell align="center" colSpan={6}>
                        Không có người dùng.....
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
    let { txtSearch, userRole } = this.state;

    let { getAllUser } = this.props;
    let { rowsPerPage } = this.state;
    this.setState({
      page: 0,
    });
    getAllUser(2, 0, rowsPerPage, txtSearch, userRole);
  };

  refreshListUser = (e) => {
    let { txtSearch, userRole } = this.state;

    let { getAllUser } = this.props;
    let { rowsPerPage } = this.state;
    this.setState({
      page: 0,
    });
    getAllUser(1, 0, rowsPerPage, txtSearch, userRole);
  };

  handleChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  choiceRole(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value,
      page: 0,
      txtSearch: "",
    });

    let { getAllUser } = this.props;
    let { rowsPerPage } = this.state;

    getAllUser(2, 0, rowsPerPage, "", event.target.value);
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });

    let { getAllUser } = this.props;
    let { rowsPerPage, txtSearch, userRole } = this.state;
    getAllUser(2, newPage, rowsPerPage, txtSearch, userRole);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value,
    });

    let { getAllUser } = this.props;
    let { txtSearch, userRole } = this.state;
    getAllUser(2, 0, event.target.value, txtSearch, userRole);
  };
}

const mapStateToProps = (state) => ({
  pageUser: state.adminReducer.pageUser,
  isLoading1: state.adminReducer.ui.isLoading1,
  isLoading2: state.adminReducer.ui.isLoading2,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllUser,
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectRedux)(UserManagementScreen);
