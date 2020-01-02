import {
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { fetchListClient } from "./../../../actions/sale/client-screen-action/actions";
import Copyright from "./../../../components/Copyright";
import * as stringUtils from "./../../../utils/stringUtils";
import styles from "./styles";

class ListClientScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: null
    };
  }

  componentDidMount() {
    let { pageClient, fetchListClient } = this.props;
    let { currentPage } = pageClient;

    if (currentPage < 0) {
      fetchListClient();
    }
  }

  render() {
    let { pageClient, isLoading1 } = this.props;
    let { currentPage, clients, totalPage } = pageClient;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    // Show no content
    if (currentPage === 0 && totalPage === 0) {
      return (
        <Typography variant="h6" gutterBottom>
          Danh sách người dùng rỗng!
        </Typography>
      );
    }

    if (!clients || clients.length <= 0) {
      return null;
    }

    return (
      <React.Fragment>
        <Box mt={3} mb={4}>
          {this.renderListUser()}
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderLoadMore = () => {
    let { pageClient, classes, isLoadMoreUser } = this.props;
    let { totalPage, currentPage } = pageClient;

    let xhtml = null;
    if (currentPage !== -1 && currentPage < totalPage - 1) {
      xhtml = (
        <Box display="flex" justifyContent="center">
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.loadMoreUser}
              disabled={isLoadMoreUser}
            >
              Load more
            </Button>
            {isLoadMoreUser && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Box>
      );
    }

    return xhtml;
  };

  loadMoreUser = () => {
    let { fetchUser, pageClient } = this.props;
    fetchUser(pageClient.currentPage + 1);
  };

  renderListUser = () => {
    let { pageClient, classes } = this.props;
    let { clients } = pageClient;
    let { currentTotal } = pageClient;
    let { filterText } = this.state;

    let tempFilterText = filterText
      ? stringUtils.removeAccents(filterText.toLocaleLowerCase())
      : null;

    const listFiltedClients = !filterText
      ? clients
      : clients.filter(user => {
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
      <Box display="flex" justifyContent="center">
        <Paper>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">STT</StyledTableCell>
                <StyledTableCell align="left">
                  Mã khách hàng ({`${currentTotal}`} người)
                </StyledTableCell>
                <StyledTableCell align="center">Họ tên</StyledTableCell>
                <StyledTableCell align="left">Số điện thoại</StyledTableCell>
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
                      inputProps={{ "aria-label": "search" }}
                      onChange={this.addFilter}
                    />
                  </div>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listFiltedClients.length === 0 && (
                <StyledTableRow key="1">
                  <StyledTableCell
                    component="th"
                    scope="row"
                    align="center"
                    colSpan={8}
                  >
                    <Typography variant="body1" gutterBottom>
                      No clients to display
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {listFiltedClients.map((client, i) => (
                <StyledTableRow key={client.username}>
                  <StyledTableCell align="center">
                    <b>{i + 1}</b>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <b>{client.username}</b>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {client.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {client.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">{client.email}</StyledTableCell>
                  <StyledTableCell align="left">
                    {client.address}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <NavLink
                      to={`/sale/orders/search?clientId=${client.username}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DragIndicatorIcon />}
                      >
                        Đơn hàng của khách
                      </Button>
                    </NavLink>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <NavLink
                      to={`/sale/orders/create?clientId=${client.username}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalPharmacyIcon />}
                        style={{ backgroundColor: "#ff5722" }}
                      >
                        Tạo Orders
                      </Button>
                    </NavLink>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    );

    return xhtml;
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
  pageClient: state.saleReducer.pageClient,
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchListClient
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ListClientScreen);

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
