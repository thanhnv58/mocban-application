import { CssBaseline, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
// import { connect } from "react-redux";
import { compose } from "redux";
import StatisticOfMonth from "./StatisticOfMonth";
import StatisticOfYear from "./StatisticOfYear";
import styles from "./styles";

class Statistic extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <StatisticOfMonth />
        <StatisticOfYear />
        <Box m={4}></Box>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({});

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({}, dispatch);
// };

// const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(Statistic);
