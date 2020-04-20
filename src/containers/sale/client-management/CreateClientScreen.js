import { Box, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Copyright from "../../../components/Copyright";
import CreateClientForm from "../../../components/client-form/CreateClientForm";

class CreateClientScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          Thêm mới khách hàng
        </Typography>
        <Box mt={3} ml={3} mr={3} mb={5}>
          <CreateClientForm />
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }
}

export default CreateClientScreen;
