import {
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  Typography
} from "@material-ui/core";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../../../../components/Copyright";
import ProjectItem from "../../../../components/project-item/ProjectItem";
import {
  fetchListProject,
  fetchListProjectOfUser
} from "../../../../actions/project-screen-action/actions";
import styles from "./styles";

class ProjectListScreen extends Component {
  constructor(props) {
    super(props);

    let { userId } = this.props;

    this.state = {
      userId
    };
  }

  componentDidMount() {
    let { fetchListProject, pageProject, fetchListProjectOfUser } = this.props;
    let { currentPage } = pageProject;

    let { userId } = this.state;

    if (userId) {
      if (userId !== pageProject.userId) {
        fetchListProjectOfUser(userId);
      }
    } else {
      if (pageProject.userId) {
        fetchListProject();
      } else {
        if (currentPage === -1) {
          fetchListProject();
        }
      }
    }
  }

  render() {
    let xhtml = (
      <React.Fragment>
        <CssBaseline />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} md={8}>
            {this.renderListProject()}
          </Grid>
        </Grid>
        <Copyright />
      </React.Fragment>
    );

    return xhtml;
  }

  renderListProject = () => {
    let { pageProject, isLoadListProject } = this.props;
    let { currentPage, currentTotal, projects, totalElements } = pageProject;

    if (isLoadListProject) {
      return (
        <Box display="flex" justifyContent="center" m={5}>
          <CircularProgress />
        </Box>
      );
    }

    if (currentPage === 0 && currentTotal === 0) {
      return (
        <Typography variant="h6" gutterBottom>
          Danh sách dự án rỗng!
        </Typography>
      );
    }

    return (
      <React.Fragment>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box>
            <Typography variant="h6" gutterBottom>
              {`Tổng số dự án: ${currentTotal}/${totalElements}`}
            </Typography>
          </Box>
        </Box>
        <List>
          {projects.map(project => {
            return <ProjectItem project={project} key={project.id} />;
          })}
        </List>
      </React.Fragment>
    );
  };

  loadDataDone = () => {
    this.setState({
      needLoad: false
    });
  };
}

const mapStateToProps = state => ({
  pageProject: state.pageProject,
  isLoadListProject: state.ui.isLoadListProject
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { fetchListProject, fetchListProjectOfUser },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(ProjectListScreen);
