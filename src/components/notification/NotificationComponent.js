import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import {
  getNotification,
  removeNotification
} from "../../actions/notification-action/actions";
import { getNotificationType } from "../../utils/helpers";
import { convertFrontEndDateTime2 } from "../../utils/timeUtils";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import styles from "./styles";

class NotificationComponent extends Component {
  componentDidMount() {
    let { getNotification, pageNotification } = this.props;
    let { currentPage, currentTotal } = pageNotification;

    if (currentPage < 0 && currentTotal < 0) {
      getNotification();
    }
  }

  refreshPage = () => {
    let { getNotification } = this.props;
    getNotification();
  };

  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6">Thông báo</Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <Box ml={2} mr={2}>
                {this.renderNotificationContent()}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }

  renderNotificationContent = () => {
    let { pageNotification, isLoading1, isLoading2, classes } = this.props;
    let { notifications } = pageNotification;

    return (
      <React.Fragment>
        {isLoading1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        )}

        {isLoading1 === false && notifications.length === 0 && (
          <Box display="flex" justifyContent="left" mt={1}>
            <Typography variant="body1">Danh sách thông báo trống!</Typography>
          </Box>
        )}

        {isLoading1 === false && notifications.length > 0 && (
          <Table aria-label="simple table">
            <TableBody>
              {notifications.map(notification => {
                let { content } = notification;

                let objContent = JSON.parse(content);

                return (
                  <TableRow key={notification.id}>
                    <TableCell component="th" scope="row" align="left">
                      <b>{getNotificationType(notification.type)}</b>
                    </TableCell>
                    <TableCell align="left">
                      Đơn hàng <b>{`${objContent.orderName}`}</b> đã được xác
                      nhận!
                    </TableCell>
                    <TableCell align="center">
                      {`${convertFrontEndDateTime2(notification.createdDate)}`}
                    </TableCell>
                    <TableCell align="center">
                      <NavLink
                        to={`/sale/order-detail/${objContent.orderId}`}
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
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.wrapper}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => {
                            this.removeNotification(notification.id);
                          }}
                          startIcon={<DeleteIcon />}
                          style={{ backgroundColor: "red" }}
                          disabled={isLoading2}
                        >
                          Xóa
                        </Button>
                        {isLoading2 && (
                          <CircularProgress
                            size={24}
                            className={classes.buttonProgress}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}

        {isLoading1 === false && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.refreshPage}
                startIcon={<RefreshIcon />}
                disabled={isLoading1}
              >
                Refresh thông báo
              </Button>
              {isLoading1 && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Box>
        )}
      </React.Fragment>
    );
  };

  removeNotification = id => {
    let { removeNotification } = this.props;

    removeNotification(id);
  };
}

const mapStateToProps = state => ({
  pageNotification: state.notificationReducer.pageNotification,
  isLoading1: state.notificationReducer.ui.isLoading1,
  isLoading2: state.notificationReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNotification, removeNotification }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(NotificationComponent);
