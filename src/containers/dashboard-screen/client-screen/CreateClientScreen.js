import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";
import {
  Grid,
  Paper,
  CssBaseline,
  Typography,
  Divider,
  Box
} from "@material-ui/core";
import CreateClientForm from "../../../components/user-form/CreateClientForm";
import Copyright from "../../../components/Copyright";

class CreateClientScreen extends Component {
  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="left">
                Thêm mới khách hàng
              </Typography>
              <Box m={2}>
                <Divider />
              </Box>

              <Box ml={2} mr={2} mb={2}>
                <CreateClientForm />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Copyright />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(CreateClientScreen);
