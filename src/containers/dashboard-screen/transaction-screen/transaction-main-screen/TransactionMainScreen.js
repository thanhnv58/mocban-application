import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";

class TransactionMainScreen extends Component {
  render() {
    return <div>Main screen of fund</div>;
  }
}

const mapStateToProps = state => ({
  pageUser: state.users
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(TransactionMainScreen);
