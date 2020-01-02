import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { compose } from "redux";
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
import { getClientId } from "./../../../utils/helpers";

class CreateClientScreen extends Component {
  render() {
    let { classes } = this.props;

    let initialValues = {
      txtUsername: getClientId()
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={7}>
            <Paper className={classes.paperForm}>
              <Typography variant="h6" align="left">
                Thêm mới khách hàng
              </Typography>
              <Box m={3}>
                <Divider />
              </Box>

              <Box mt={3} ml={3} mr={3} mb={1}>
                <CreateClientForm initialValues={initialValues} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={4}></Box>

        <Copyright />
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({}, dispatch);
// };

// const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(CreateClientScreen);
