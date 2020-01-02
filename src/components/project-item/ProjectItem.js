import { CssBaseline, Divider, Grid, Paper, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import * as timeUtils from "./../../utils/timeUtils";
import styles from "./styles";
import { getPhase } from "./../../utils/helpers";

class ProjectItem extends Component {
  render() {
    let { classes, project } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography gutterBottom variant="h5" component="h2">
                {`${project.name}`}
              </Typography>
            </Grid>

            <Grid item xs={12} md={12}>
              <Divider />
            </Grid>

            <Grid item xs={12} md={12}>
              <Box ml={2} mr={2}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Đia chỉ công trình: `} <b>{`${project.location}`}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Ngày bắt đầu: `}
                      <b>{`${timeUtils.convertFrontEndDateTime(
                        project.startDate
                      )}`}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Ngày kết thúc: `}
                      <b>{`${timeUtils.convertFrontEndDateTime(
                        project.endDate
                      )}`}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Trạng thái: `}
                      <b style={{ color: "#039be5" }}>{`${getPhase(
                        project.phase
                      )}`}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item>
              <Box ml={2} mr={2}>
                <NavLink
                  to={`/dashboard/projects/detail/${project.id}`}
                  style={{ textDecoration: "none" }}
                  className={classes.button}
                >
                  <Button variant="contained" color="primary">
                    Thông tin dự án
                  </Button>
                </NavLink>

                <NavLink
                  to={`/dashboard/transactions/project/${project.id}`}
                  style={{ textDecoration: "none" }}
                  className={classes.button}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#f06292" }}
                  >
                    Thống kế thu chi
                  </Button>
                </NavLink>

                <NavLink
                  to={`/dashboard/transactions/project/${project.id}/create`}
                  style={{ textDecoration: "none" }}
                  className={classes.button}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#00e676" }}
                  >
                    Tạo thu chi
                  </Button>
                </NavLink>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   authState: state.auth
// });

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       logout
//     },
//     dispatch
//   );
// };

// const connectRedux = connect(null, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(ProjectItem);
