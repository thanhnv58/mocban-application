import { Box, Grid, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { createProjectForUser } from "../../actions/user-screen-action/actions";
import { getUserRole } from "../../utils/helpers";
import styles from "./styles";

class ClientItem extends Component {
  render() {
    let { classes, user, index } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Typography gutterBottom variant="h5" component="h2">
              {`${user.fullName}`}
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box ml={2}>
              <Grid container>
                <Grid item xs={12} md={9}>
                  <Grid container spacing={1}>
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

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`Email: `} <b>{`${user.email}`}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {`Vai trò: `} <b>{`${getUserRole(user.role)}`}</b>
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
                <Grid item xs={12} md={3}>
                  <Box display="flex" justifyContent="flex-end">
                    <NavLink
                      key={index}
                      to={`/dashboard/projects?user=${user.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ChromeReaderModeIcon />}
                      >
                        Dự án của tôi
                      </Button>
                    </NavLink>
                  </Box>
                  <Box display="flex" justifyContent="flex-end">
                    <MyButonLink
                      variant="contained"
                      color="primary"
                      className={classes.buttonSuccess}
                      startIcon={<LocalPharmacyIcon />}
                      label={"Tạo dự án"}
                      onClick={this.goToCreateProjectForUser}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
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

export default compose(withMyStyle, connectRedux)(ClientItem);
