import { Box, CssBaseline, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { compose } from "redux";
import Copyright from "../../../components/Copyright";
import CreateClientForm from "../../../components/user-form/CreateClientForm";
import { getClientId } from "./../../../utils/helpers";
import styles from "./styles";

class CreateClientScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultUsername: getClientId()
    };
  }

  render() {
    let initialValues = {
      txtUsername: this.state.defaultUsername
    };

    return (
      <React.Fragment>
        <CssBaseline />
        <Typography variant="h6" align="left">
          Thêm mới khách hàng
        </Typography>
        <Box mt={3} ml={3} mr={3} mb={1}>
          <CreateClientForm
            initialValues={initialValues}
            resetUsername={this.resetCreateClientForm}
          />
        </Box>
        <Box mt={4}></Box>

        <Copyright />
      </React.Fragment>
    );
  }

  resetCreateClientForm = () => {
    this.setState({
      defaultUsername: getClientId()
    });
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(CreateClientScreen);
