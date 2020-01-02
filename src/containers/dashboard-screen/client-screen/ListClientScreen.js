import {
  CssBaseline,
  Grid,
  InputAdornment,
  TextField
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PoolIcon from "@material-ui/icons/Pool";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "./../../../components/Copyright";
import ClientItem from "./../../../components/user-item/ClientItem";
import * as StringUtils from "./../../../utils/stringUtils";
import { fetchListClient } from "./../../../actions/sale/client-screen-action/actions";
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

    if (currentPage <= 0) {
      fetchListClient();
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8}>
            {this.renderListUser()}
            {this.renderLoadMore()}
          </Grid>
        </Grid>
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
    let { pageClient, classes, isFetchListClient } = this.props;
    let { currentPage, clients, totalPage } = pageClient;
    let { currentTotal, totalElements } = pageClient;

    // Show loading...
    if (isFetchListClient) {
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

    if (clients && clients.length <= 0) {
      return null;
    }

    // Show list client
    let { filterText } = this.state;

    let tempFilterText = filterText
      ? StringUtils.removeAccents(filterText.toLocaleLowerCase())
      : null;

    const listUserFilter = !filterText
      ? clients
      : clients.filter(user => {
          return (
            StringUtils.removeAccents(
              user.fullName.toLocaleLowerCase()
            ).includes(tempFilterText) ||
            StringUtils.removeAccents(
              user.phoneNumber.toLocaleLowerCase()
            ).includes(tempFilterText) ||
            StringUtils.removeAccents(
              user.address.toLocaleLowerCase()
            ).includes(tempFilterText)
          );
        });

    let xhtml = (
      <React.Fragment>
        <TextField
          className={classes.textField}
          label="Bộ lọc theo: Tên - SĐT - Địa chỉ"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PoolIcon />
              </InputAdornment>
            )
          }}
          onChange={this.filterUser}
          autoComplete="off"
        />

        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {`Tổng số người: ${currentTotal}/${totalElements}`}
            </Typography>
          </Box>
        </Box>

        <List className={classes.root}>
          {listUserFilter.map((user, i) => {
            return <ClientItem user={user} index={i} key={user.id} />;
          })}
        </List>
      </React.Fragment>
    );

    return xhtml;
  };

  filterUser = e => {
    let { value } = e.target;

    let filterText = value ? value : null;

    this.setState({
      filterText
    });
  };
}

const mapStateToProps = state => ({
  pageClient: state.saleReducer.pageClient,
  isFetchListClient: state.ui.isFetchListClient
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

export default compose(withMyStyle, connectRedux)(ListClientScreen);
