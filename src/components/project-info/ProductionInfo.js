import { Box, Paper, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import * as ProjectDetailScreen from "../../constants/ProjectDetailScreen";
import ConfirmWorkForm2 from "../confirm-work-form/ConfirmWorkForm2";
import UpdateProjectDetailForm2 from "../update-project-detail-form/UpdateProjectDetailForm2";
import styles from "./styles";
import ProjectDetail from "../project-detail/ProjectDetail";

class ProductionInfo extends Component {
  render() {
    let { screen } = this.props;

    let xhtml = null;

    switch (screen) {
      case ProjectDetailScreen.UN_CONFIRM:
        xhtml = this.renderConfirmWorkForm();
        break;
      case ProjectDetailScreen.CONFIRM:
        xhtml = this.renderUpdateProdStatus();
        break;
      default:
        xhtml = this.renderNotInit();
        break;
    }

    return (
      <React.Fragment>
        <Grid container justify="center" spacing={2}>
          <Grid
            item
            xs={12}
            md={screen === ProjectDetailScreen.NOT_INIT ? 8 : 12}
          >
            <Typography variant="h1" component="h2" gutterBottom align="left">
              Sản xuất
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={screen === ProjectDetailScreen.NOT_INIT ? 8 : 6}
          >
            {xhtml}
          </Grid>

          <Grid item xs={12} md={6}>
            {this.renderDesignDetailInfo()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  renderDesignDetailInfo = () => {
    let { classes, prodDetail } = this.props;

    if (!prodDetail) {
      return;
    }

    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Thông tin chi tiết
        </Typography>
        <Box mt={3} mb={3}>
          <ProjectDetail data={prodDetail} />
        </Box>
      </Paper>
    );

    return xhtml;
  };

  renderNotInit = () => {
    let { classes } = this.props;

    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Tiến trình sản xuất chưa được khởi tạo!
        </Typography>
        <Typography component="h3" variant="h4" align="center">
          Quay lại phía trước để khởi tạo việc sản xuất!
        </Typography>
      </Paper>
    );

    return xhtml;
  };

  renderConfirmWorkForm = () => {
    let { classes, prodDetail } = this.props;

    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Xác nhận công việc
        </Typography>
        <Box mt={2}>
          <ConfirmWorkForm2 projectDetailId={prodDetail.id} />
        </Box>
      </Paper>
    );

    return xhtml;
  };

  renderUpdateProdStatus = () => {
    let { classes, initialValues, prodDetail } = this.props;

    let xhtml = (
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Cập nhật công việc
        </Typography>

        <Box mt={2} ml={2} mr={2}>
          <UpdateProjectDetailForm2
            initialValues={initialValues}
            projectDetailId={prodDetail.id}
          />
        </Box>
      </Paper>
    );

    return xhtml;
  };
}

const mapStateToProps = state => ({
  isUpdateProjectInfo: state.ui.isUpdateProjectInfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);
export default compose(withMyStyle, connectRedux)(ProductionInfo);
