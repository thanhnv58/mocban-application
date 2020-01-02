import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styles from "./styles";
import GetUserInfoForm from "./GetUserInfoForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Copyright from "../Copyright";
import Form from "./Form";
import { Divider } from "@material-ui/core";

class CreateProjectForm extends Component {
  componentDidUpdate() {
    let { project, history } = this.props;
    if (project) {
      history.push(`/dashboard/projects/detail/${project.id}`);
    }
  }

  render() {
    let { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Tạo dự án
            </Typography>
            <React.Fragment>
              <GetUserInfoForm />
              {this.renderForm()}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    );
  }

  renderForm = () => {
    let { client } = this.props;
    if (client === null) {
      return null;
    } else {
      return (
        <React.Fragment>
          <Box mt={2}>
            <Divider />
          </Box>
          <Form />
        </React.Fragment>
      );
    }
  };
}

const mapStateToProps = state => ({
  client: state.project.client,
  project: state.project.project
});

const connectRedux = connect(mapStateToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(CreateProjectForm);
