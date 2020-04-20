import { Box, Typography } from "@material-ui/core";
import React, { Component } from "react";
import Copyright from "../../../components/Copyright";
import CreateUserForm from "../../../components/user-form/CreateUserForm";

class CreateUserScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          Thêm mới người dùng
        </Typography>
        <Box mt={3} ml={3} mr={3} mb={5}>
          <CreateUserForm />
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }
}

export default CreateUserScreen;
