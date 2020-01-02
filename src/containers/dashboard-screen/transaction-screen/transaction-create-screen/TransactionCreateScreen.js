import {
  Box,
  CircularProgress,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { fetchTransactionProject } from "./../../../../actions/transaction-action/actions";
import TransactionForm from "./../../../../components/transaction-form/TransactionForm";
import * as TransactionType from "./../../../../constants/TransactionType";
import styles from "./styles";
import { NavLink } from "react-router-dom";

class TransactionCreateScreen extends Component {
  componentDidMount() {
    let { projectId, fetchTransactionProject, transactionInfo } = this.props;

    if (transactionInfo) {
      if (transactionInfo.projectId !== projectId) {
        fetchTransactionProject(projectId);
      }
    } else {
      fetchTransactionProject(projectId);
    }
  }

  render() {
    let { isLoadTransactionProject, transactionInfo } = this.props;

    // Show loading
    if (isLoadTransactionProject) {
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

    if (transactionInfo) {
      return (
        <React.Fragment>
          <CssBaseline />
          <Box display="flex" flexDirection="row-reverse">
            <NavLink
              to={`/dashboard/transactions/project/${transactionInfo.projectId}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#f06292" }}
              >
                Thống kế thu chi
              </Button>
            </NavLink>
          </Box>
          <Typography component="h1" variant="h4" align="left">
            Tạo giao dịch
          </Typography>
          <Grid container spacing={2}>
            {this.renderTransactionInputForm(TransactionType.INCOME)}
            {this.renderTransactionInputForm(TransactionType.PAY)}
          </Grid>
        </React.Fragment>
      );
    }

    return null;
  }

  renderTransactionInputForm = transactionType => {
    let { classes } = this.props;
    let title = transactionType === TransactionType.INCOME ? `Thu` : `Chi`;

    return (
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left">
            {title}
          </Typography>

          <Box ml={2} mt={1}>
            <TransactionForm type={transactionType} />
          </Box>
        </Paper>
      </Grid>
    );
  };
}

const mapStateToProps = state => ({
  isLoadTransactionProject: state.ui.isLoadTransactionProject,
  transactionInfo: state.transactionInfo
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchTransactionProject }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(TransactionCreateScreen);
