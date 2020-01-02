import React, { Component } from "react";
import CreateProjectForm from "../../../../components/create-project-form/CreateProjectForm";

class ProjectCreateScreen extends Component {
  render() {
    let { history } = this.props;

    return <CreateProjectForm history={history} />;
  }
}

export default ProjectCreateScreen;
