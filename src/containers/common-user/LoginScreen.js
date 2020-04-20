import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import LoginForm from "../../components/login-form/LoginForm";
import * as UserRole from "../../constants/UserRole";
import styles from "./styles";
import ChoiceRoleDialog from "./ChoiceRoleDialog";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRole: null,
      open: true,
    };
  }

  render() {
    let { isAuthenticated, listRole } = this.props;

    // If not yet authenticate need show form to authenticate
    if (!isAuthenticated) {
      return <LoginForm />;
    }

    // System error, plz check back-end system
    if (!listRole || listRole.length === 0) {
      return <div>Bạn không tồn tại trong hệ thống!</div>;
    }

    // Show popup to choice role
    let choiceRole = null;
    if (listRole.length > 1) {
      let { selectedRole } = this.state;
      if (selectedRole === null) {
        let { open } = this.state;
        return (
          <div>
            <ChoiceRoleDialog
              selectedValue={1}
              open={open}
              onClose={this.handleClose}
              listRole={listRole}
            />
          </div>
        );
      } else {
        choiceRole = selectedRole;
      }
    } else {
      choiceRole = listRole[0];
    }

    switch (choiceRole) {
      case UserRole.SALE:
        return (
          <Redirect
            to={{
              pathname: "/sale",
            }}
          />
        );
      case UserRole.ADMIN:
        return (
          <Redirect
            to={{
              pathname: "/admin",
            }}
          />
        );
      case UserRole.ACCOUNTANT:
        return (
          <Redirect
            to={{
              pathname: "/accountant",
            }}
          />
        );
      case UserRole.DESIGN:
      case UserRole.PRODUCER:
        return (
          <Redirect
            to={{
              pathname: "/technician",
            }}
          />
        );
      default:
        return <div>Có lỗi hệ thống!!!!!!!!!</div>;
    }
  }

  handleClose = (role) => {
    this.setState({
      open: false,
      selectedRole: role,
    });
  };
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.commonUser.isAuthenticated,
  listRole: state.commonUser.listRole,
});

const connectRedux = connect(mapStateToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(LoginScreen);
