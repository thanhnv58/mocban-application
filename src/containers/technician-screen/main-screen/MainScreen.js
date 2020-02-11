import {
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  CircularProgress,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Copyright from "../../../components/Copyright";
import { getNotificationOfTechnician } from "../../../actions/technician/main-screen-action/actions";
import styles from "./styles";
import { NavLink } from "react-router-dom";

class MainScreen extends Component {
  componentDidMount() {
    let { getNotificationOfTechnician, notificationTechnician } = this.props;

    if (notificationTechnician === null) {
      getNotificationOfTechnician();
    }
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container justify="center">
          <Grid item xs={12} lg={12}>
            {this.renderNotification()}
          </Grid>
        </Grid>

        <Copyright />
      </React.Fragment>
    );
  }

  renderNotification = () => {
    let { classes, notificationTechnician, isLoading1 } = this.props;

    return (
      <Box mr={2}>
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
                {isLoading1 && (
                  <Box display="flex" justifyContent="center" mt={3}>
                    <CircularProgress />
                  </Box>
                )}

                {notificationTechnician && (
                  <React.Fragment>
                    {notificationTechnician.numberOfOrderNeedDo > 0 && (
                      <React.Fragment>
                        <Typography variant="body1">
                          Bạn có{" "}
                          <b>{`${notificationTechnician.numberOfOrderNeedDo} `}</b>
                          dự án mới cần làm!
                        </Typography>
                        <Box mt={1} display="flex" justifyContent="center">
                          <NavLink
                            to={`/technician/task-list`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AssignmentIcon />}
                            >
                              Tới danh sách công việc
                            </Button>
                          </NavLink>
                        </Box>
                      </React.Fragment>
                    )}

                    {notificationTechnician.numberOfOrderNeedDo === 0 && (
                      <React.Fragment>
                        <Typography variant="body1">
                          Bạn <b>{`0`}</b> có dự án mới nào cần thực hiện!
                        </Typography>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  };
}

const mapStateToProps = state => ({
  isLoading1: state.technicianReducer.ui.isLoading1,
  notificationTechnician: state.technicianReducer.notificationTechnician
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNotificationOfTechnician }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(MainScreen);
