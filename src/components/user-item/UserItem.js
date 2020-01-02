import { Box, CssBaseline, Grid, Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { createProjectForUser } from "./../../actions/user-screen-action/actions";
import { getUserRole } from "./../../utils/helpers";
import styles from "./styles";

class UserItem extends Component {
  render() {
    let { classes, user, index } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item>
                <Avatar
                  className={index % 2 === 1 ? classes.orange : classes.purple}
                >
                  {user.fullName.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>

              <Grid item xs={12} md={11}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${user.fullName}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <Typography gutterBottom variant="h5" component="h2">
                        {`${getUserRole(user.role)}`}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box mb={2} mt={1}>
                  <Divider />
                </Box>

                <Grid container>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Tên truy cập: `} <b>{`${user.username}`}</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Số điện thoại: `}
                      <b>{`${user.phoneNumber}`}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Email: `} <b>{`${user.email}`}</b>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {`Địa chỉ nhà: `}
                      <b>{`${user.address}`}</b>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <NavLink
                  key={index}
                  to={`/dashboard/projects?user=${user.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<DirectionsBoatIcon />}
                  >
                    Dự án của tôi
                  </Button>
                </NavLink>
              </Grid>

              <Grid item>
                <MyButonLink
                  variant="contained"
                  color="primary"
                  className={classes.buttonSuccess}
                  startIcon={<DirectionsBoatIcon />}
                  label={"Tạo dự án"}
                  onClick={this.goToCreateProjectForUser}
                />
              </Grid>
            </Grid>
          </Paper>
        </main>
      </React.Fragment>
    );
  }

  goToCreateProjectForUser = history => {
    let { createProjectForUser, user } = this.props;
    createProjectForUser(user);

    history.push("/dashboard/projects/create");
  };
}

function MyButonLink(props) {
  let history = useHistory();

  function handleClick() {
    props.onClick(history);
  }

  return (
    <Button
      variant={props.variant}
      color={props.color}
      startIcon={props.startIcon}
      className={props.className}
      onClick={handleClick}
    >
      {props.label}
    </Button>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createProjectForUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(UserItem);
