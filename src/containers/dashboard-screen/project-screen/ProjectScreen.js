import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useHistory
} from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { fetchUser } from "../../../actions/user-screen-action/actions";
import ProjectMainScreen from "./project-main-screen/ProjectMainScreen";
import ProjectInfoScreen from "./project-info-screen/ProjectInfoScreen";
import ProjectCreateScreen from "./project-create-screen/ProjectCreateScreen";
import styles from "./styles";

class ProjectScreen extends Component {
  render() {
    let { userId } = this.props;

    return (
      <Switch>
        <Route exact path={"/dashboard/projects"}>
          <ProjectMainScreen userId={userId ? userId : null} />
        </Route>
        <Route path={"/dashboard/projects/:screen"}>
          <Screen />
        </Route>
        {/* 404 Not found */}
        <Route path={"/dashboard/projects/*"}>
          <Redirect to="/dashboard/projects" />
        </Route>
      </Switch>
    );
  }
}

function Screen() {
  let { screen } = useParams();
  let history = useHistory();

  let xhtml = null;

  switch (screen) {
    case "detail":
      xhtml = <ProjectInfoScreen />;
      break;
    case "create":
      xhtml = <ProjectCreateScreen history={history} />;
      break;
    default:
      xhtml = <Redirect to="/dashboard/projects" />;
      break;
  }

  return xhtml;
}

const mapStateToProps = state => ({
  pageUser: state.users
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchUser
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(ProjectScreen);
