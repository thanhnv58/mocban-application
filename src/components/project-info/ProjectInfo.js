import {
  Box,
  Grid,
  Button,
  CircularProgress,
  CssBaseline,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExtensionIcon from "@material-ui/icons/Extension";
import ToysIcon from "@material-ui/icons/Toys";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import clsx from "clsx";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import Copyright from "../Copyright";
import { fetchProjectDetail } from "../../actions/project-screen-action/actions";
import * as ProjectPhase from "../../constants/ProjectPhase";
import DesignInfo from "./DesignInfo";
import OverviewInfo from "./OverviewInfo";
import ProductionInfo from "./ProductionInfo";
import styles from "./styles";
import * as ProjectStatus from "../../constants/ProjectStatus";
import * as ProjectDetailScreen from "../../constants/ProjectDetailScreen";

const steps = ["Thông tin tổng quan", "Thiết kế", "Thi công", "Hoàn thành"];

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundColor: "#0288d1"
    }
  },
  completed: {
    "& $line": {
      backgroundColor: "#0288d1"
    }
  },
  line: {
    height: 5,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundColor: "#0288d1",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundColor: "#0288d1"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AccountBalanceIcon />,
    2: <ToysIcon />,
    3: <ExtensionIcon />,
    4: <VerifiedUserIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

class ProjectInfo extends Component {
  constructor(props) {
    super(props);

    let { step } = this.props;

    this.state = {
      activeStep: step
    };
  }

  componentDidMount() {
    let { projectId, fetchProjectDetail, projectInfo } = this.props;

    if (projectInfo === null) {
      fetchProjectDetail(projectId);
    } else {
      if (projectInfo.id !== parseInt(projectId)) {
        fetchProjectDetail(projectId);
      }
    }
  }

  render() {
    let { projectInfo, isFetchProjectDetail } = this.props;

    // Show loading
    if (isFetchProjectDetail === true) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <CircularProgress />;
            </Box>
          </Grid>
        </Grid>
      );
    }

    // Show no content
    if (projectInfo === null) {
      return (
        <Typography component="h3" variant="h4" align="left">
          Dự án này không tồn tại!
        </Typography>
      );
    }

    // Show main screen
    if (projectInfo) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={8}>
              {this.renderStepControler()}
            </Grid>
          </Grid>
          <Box m={4}></Box>
          {this.getStepContent()}
          <Copyright />
        </React.Fragment>
      );
    }

    return null;
  }

  renderStepControler = () => {
    let { classes } = this.props;
    let { activeStep } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Giai đoạn hiện tại
          </Typography>
          {this.renderSteper()}
        </Paper>

        <div className={classes.buttons}>
          {activeStep !== 0 && (
            <Button
              variant="contained"
              onClick={this.handleBack}
              className={classes.button}
              style={{ backgroundColor: "#90a4ae" }}
              startIcon={<ArrowBackIosIcon />}
            >
              Quay lại
            </Button>
          )}
          {activeStep < 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              className={classes.button}
              endIcon={<ArrowForwardIosIcon />}
            >
              {"Xem tiếp"}
            </Button>
          )}
        </div>
      </React.Fragment>
    );
  };

  getStepContent = () => {
    let { projectInfo } = this.props;
    let { activeStep } = this.state;
    let initialValues = null;

    switch (activeStep) {
      case 0:
        initialValues = {
          txtCustomerRequest: projectInfo.customerRequest,
          txtNote: projectInfo.note,
          txtName: projectInfo.name,
          txtLocation: projectInfo.location
        };

        return (
          <OverviewInfo
            initialValues={initialValues}
            projectInfo={projectInfo}
          />
        );
      case 1:
        let initDesign = projectInfo.phase !== ProjectPhase.EXCHANGE;
        let dsScreen = null;
        let designDetail = projectInfo.projectDetails[0];
        if (initDesign) {
          let { status } = designDetail;

          if (status === ProjectStatus.UN_CONFIRM) {
            dsScreen = ProjectDetailScreen.UN_CONFIRM;
          } else {
            dsScreen = ProjectDetailScreen.CONFIRM;
            initialValues = {
              txtStatus: designDetail.status,
              txtProgress: designDetail.progress,
              txtNote: designDetail.note
            };
          }
        } else {
          dsScreen = ProjectDetailScreen.NOT_INIT;
        }

        return (
          <DesignInfo
            screen={dsScreen}
            initialValues={initialValues}
            designDetail={designDetail}
          />
        );
      case 2:
        let initProduction = projectInfo.projectDetails.length === 2;

        let prodScreen = null;
        let prodDetail = projectInfo.projectDetails[1];
        if (initProduction) {
          let { status } = prodDetail;

          if (status === ProjectStatus.UN_CONFIRM) {
            prodScreen = ProjectDetailScreen.UN_CONFIRM;
          } else {
            prodScreen = ProjectDetailScreen.CONFIRM;
            initialValues = {
              txtStatus: prodDetail.status,
              txtProgress: prodDetail.progress,
              txtNote: prodDetail.note
            };
          }
        } else {
          prodScreen = ProjectDetailScreen.NOT_INIT;
        }

        return (
          <ProductionInfo
            screen={prodScreen}
            initialValues={initialValues}
            prodDetail={prodDetail}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  renderSteper = () => {
    let { classes, projectInfo } = this.props;
    let { phase } = projectInfo;
    let step = 0;
    if (
      phase === ProjectPhase.EXCHANGE ||
      phase === ProjectPhase.REQUEST_DESIGN
    ) {
      step = 0;
    } else if (
      phase === ProjectPhase.DESIGN ||
      phase === ProjectPhase.REQUEST_PRODUCTION
    ) {
      step = 1;
    } else if (phase === ProjectPhase.PRODUCTION) {
      step = 2;
    } else if (phase === ProjectPhase.DONE) {
      step = 3;
    }

    let xhtml = (
      <React.Fragment>
        <Stepper
          alternativeLabel
          activeStep={step}
          connector={<ColorlibConnector />}
          className={classes.stepper}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </React.Fragment>
    );

    return xhtml;
  };

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };
}

const mapStateToProps = state => ({
  isFetchProjectDetail: state.ui.isFetchProjectDetail,
  projectInfo: state.projectInfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchProjectDetail
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(ProjectInfo);
