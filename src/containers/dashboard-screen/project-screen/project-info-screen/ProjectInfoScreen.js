import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, useParams, Switch, useLocation } from "react-router-dom";
import { compose, bindActionCreators } from "redux";
import styles from "./styles";
import { createProjectClear } from "../../../../actions/project-screen-action/actions";
import ProjectInfo from "../../../../components/project-info/ProjectInfo";
import queryString from "query-string";

class ProjectInfoScreen extends Component {
  render() {
    return (
      <Switch>
        <Route path={"/dashboard/projects/detail/:projectId"}>
          <Detail />
        </Route>
      </Switch>
    );
  }
}

function Detail() {
  let { projectId } = useParams();
  let location = useLocation();

  const values = queryString.parse(location.search);
  let step = 0;
  switch (values.step) {
    case "design":
      step = 1;
      break;
    case "production":
      step = 2;
      break;
    default:
      step = 0;
      break;
  }

  return <ProjectInfo projectId={projectId} step={step} />;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createProjectClear
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(ProjectInfoScreen);
