import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";
import { CssBaseline, Typography, Box } from "@material-ui/core";
import { createUser } from "./../../../actions/manager/user-screen-action/actions";
import CreateUserForm from "../../../components/user-form/CreateUserForm";
import Copyright from "../../../components/Copyright";

class CreateUserScreen extends Component {
  render() {
    let { createUser, isLoading1 } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Typography variant="h6" align="left">
          Thêm mới khách hàng
        </Typography>

        <Box mt={2} ml={2} mr={2} mb={2}>
          <CreateUserForm createUser={createUser} isLoading={isLoading1} />
        </Box>
        <Copyright />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLoading1: state.managerReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(CreateUserScreen);
