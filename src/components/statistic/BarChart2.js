import { withStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";

class BarChart2 extends Component {
  render() {
    let { chartOption } = this.props;
    let { yTitle, series } = chartOption;

    let options = {
      data: {
        table: "datatable"
      },
      chart: {
        type: "column"
      },
      title: {
        text: "."
      },
      xAxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ]
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: yTitle
        }
      },
      series: series,
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}"
      }
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(BarChart2);
