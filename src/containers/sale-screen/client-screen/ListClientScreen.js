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
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import {
  fetchListClient,
  loadMoreClient
} from "./../../../actions/sale/client-screen-action/actions";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          <b>Danh sách khách hàng</b>
        </Typography>
        <Box mt={3} mb={4} ml={2} mr={2}>
          {this.renderListUser()}
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }

  renderListUser = () => {
    let { pageClient, classes, isLoading1, isLoading2 } = this.props;
    let {
      clients,
      currentTotal,
      totalElements,
      currentPage,
      totalPage
    } = pageClient;
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="left">
                Mã khách hàng ({`${currentTotal}/${totalElements}`})
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
            {isLoading1 === false && listFiltedClients.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={9}
                >
                  <Typography variant="body1" gutterBottom>
                    Danh sách khách hàng rỗng!
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
                <StyledTableCell align="left">{client.address}</StyledTableCell>
                <StyledTableCell align="left">
                  <NavLink
                    to={`/sale/list-order/${client.username}`}
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
                    to={`/sale/create-order?clientId=${client.username}`}
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
    let { loadMoreClient } = this.props;
    loadMoreClient();
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
  isLoading1: state.saleReducer.ui.isLoading1,
  isLoading2: state.saleReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchListClient,
      loadMoreClient
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
