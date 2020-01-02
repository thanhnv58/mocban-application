import { withStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import styles from "./styles";

class BarChart extends Component {
  render() {
    let { chartOption } = this.props;
    let { title, yTitle, series } = chartOption;

    let options = {
      chart: {
        type: "column"
      },
      title: {
        text: title
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
        title: {
          text: yTitle
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: "bold",
            color:
              // theme
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "gray"
          }
        }
      },
      legend: {
        align: "right",
        x: -30,
        verticalAlign: "top",
        y: 25,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "white",
        borderColor: "#CCC",
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        headerFormat: "<b>{point.x}</b><br/>",
        pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
      },
      plotOptions: {
        column: {
          stacking: "normal",
          dataLabels: {
            enabled: true
          }
        }
      },
      series: series
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

export default compose(withMyStyle, connectRedux)(BarChart);
