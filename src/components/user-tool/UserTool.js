import { Box, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import UserForm from "../user-form/UserForm";
import {
  closeForm,
  openForm
} from "./../../actions/user-screen-action/actions";
import styles from "./styles";

class UserTool extends Component {
  render() {
    return <React.Fragment>{this.renderUserTool()}</React.Fragment>;
  }

  renderUserTool = () => {
    let { isOpenForm } = this.props;

    return isOpenForm === true
      ? this.renderCreateUserForm()
      : this.renderButtonCreateForm();
  };

  renderCreateUserForm = () => {
    const formInfo = {
      title: "Thêm mới người dùng",
      btnSubmit: "Thêm mới"
    };

    return (
      <Box mb={2}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8}>
            <UserForm formInfo={formInfo} />
          </Grid>
        </Grid>
      </Box>
    );
  };

  renderButtonCreateForm = () => {
    let { classes, openForm } = this.props;

    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<PersonAddIcon />}
            onClick={() => {
              openForm();
            }}
          >
            Tạo người dùng
          </Button>
        </Grid>
      </Grid>
    );
  };
}

const mapStateToProps = state => ({
  isOpenForm: state.ui.isShowCreateUserForm
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      openForm,
      closeForm
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(UserTool);
