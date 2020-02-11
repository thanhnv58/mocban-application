import {
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import {
  getAllUser,
  loadMoreUser
} from "./../../../actions/manager/user-screen-action/actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getUserRole } from "./../../../utils/helpers";
import Copyright from "./../../../components/Copyright";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import * as stringUtils from "./../../../utils/stringUtils";
import styles from "./styles";

class ListUserScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: null
    };
  }

  componentDidMount() {
    let { pageUser, getAllUser } = this.props;
    let { currentPage } = pageUser;

    if (currentPage < 0) {
      getAllUser();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          Danh sách khách hàng
        </Typography>

        <Box mt={2} mb={4} ml={2} mr={2}>
          {this.renderListUser()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  renderListUser = () => {
    let { pageUser, classes, isLoading1, isLoading2 } = this.props;
    let {
      users,
      currentTotal,
      totalElements,
      currentPage,
      totalPage
    } = pageUser;
    let { filterText } = this.state;

    let tempFilterText = filterText
      ? stringUtils.removeAccents(filterText.toLocaleLowerCase())
      : null;

    const listFiltedUser = !filterText
      ? users
      : users.filter(user => {
          return (
            stringUtils
              .removeAccents(user.username.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(user.fullName.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(user.phoneNumber.toLocaleLowerCase())
              .includes(tempFilterText) ||
            stringUtils
              .removeAccents(user.address.toLocaleLowerCase())
              .includes(tempFilterText)
          );
        });

    // Show list client
    let xhtml = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="left">
                Tên đăng nhập ({`${currentTotal}/${totalElements}`})
              </StyledTableCell>
              <StyledTableCell align="center">Họ tên</StyledTableCell>
              <StyledTableCell align="center">Số điện thoại</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Địa chỉ</StyledTableCell>
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

            {isLoading1 === false && listFiltedUser.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={9}
                >
                  <Typography variant="body1" gutterBottom>
                    Danh sách người dùng rỗng!
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}

            {listFiltedUser.map((user, i) => (
              <StyledTableRow key={user.username}>
                <StyledTableCell align="center">
                  <b>{i + 1}</b>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <b>{user.username}</b>
                </StyledTableCell>
                <StyledTableCell align="left">{user.fullName}</StyledTableCell>
                <StyledTableCell align="left">
                  {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="left">{user.email}</StyledTableCell>
                <StyledTableCell align="left">{user.address}</StyledTableCell>
                <StyledTableCell align="left">
                  <b>{getUserRole(user.role)}</b>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <NavLink
                    to={`/manager/detail-user/${user.username}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<MoreVertIcon />}
                      style={{ backgroundColor: "#0288d1" }}
                    >
                      Chi tiết
                    </Button>
                  </NavLink>
                </StyledTableCell>
              </StyledTableRow>
            ))}

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

  loadMore = () => {
    let { loadMoreUser } = this.props;
    loadMoreUser();
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
  pageUser: state.managerReducer.pageUser,
  isLoading1: state.managerReducer.ui.isLoading1,
  isLoading2: state.managerReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAllUser,
      loadMoreUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ListUserScreen);

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
