import { Box, CircularProgress, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Component, default as React } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getStisticOfMonth } from "../../actions/sale/main-screen-action/actions";
import SelectMonthComponent from "../date-time/SelectMonthComponent";
import styles from "./styles";
import CircleChart from "./CircleChart";
import { getCurrency } from "../../utils/helpers";

class CountOrderCharByMonthComponent extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      byMonth: d.getMonth() + 1,
      byYear: d.getFullYear()
    };
  }

  changeMonth = (month, year) => {
    this.setState({
      byMonth: month,
      byYear: year
    });

    this.getData(month, year);
  };

  render() {
    let { isLoading1 } = this.props;
    let { byMonth, byYear } = this.state;

    return (
      <React.Fragment>
        <Box mt={1}>
          <Typography variant="h6">Thống kê số đơn hàng theo tháng</Typography>
        </Box>

        <Box m={2}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <SelectMonthComponent
                changeMonth={this.changeMonth}
                month={byMonth}
                year={byYear}
                btnIcon={<EqualizerIcon />}
                btnText={"Lấy dữ liệu"}
                isLoading={isLoading1}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderStaticOfMonth()}
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderChart()}
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }

  getData = (month, year) => {
    this.setState({
      byMonth: month,
      byYear: year
    });

    let { getStisticOfMonth } = this.props;
    getStisticOfMonth(month, year);
  };

  renderStaticOfMonth = () => {
    let { isLoading1, statisticOfMonth } = this.props;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (statisticOfMonth) {
      let {
        numberOfDesignOrder,
        numberOfProductionOrder,
        amountOfMonth,
        incomeOfMonth,
        payOfMonth
      } = statisticOfMonth;

      return (
        <Box mt={4} mb={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng thiết kế: `}
                <b>{`${numberOfDesignOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              {incomeOfMonth !== null && (
                <Typography variant="body1" component="p">
                  {`Tổng thu trong tháng: `}
                  <b>{`${getCurrency(incomeOfMonth ? incomeOfMonth : 0)}`}</b>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng sản xuất: `}
                <b>{`${numberOfProductionOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              {payOfMonth !== null && (
                <Typography variant="body1" component="p">
                  {`Tổng chi trong tháng: `}
                  <b>{`${getCurrency(payOfMonth ? payOfMonth : 0)}`}</b>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="body1" component="p">
                {`Tổng số đơn hàng trong tháng: `}
                <b>{`${numberOfDesignOrder + numberOfProductionOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography variant="body1" component="p">
                {`Tổng số tiền trong tháng: `}
                <b>{`${getCurrency(amountOfMonth ? amountOfMonth : 0)}`}</b>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return null;
  };

  renderChart = () => {
    let { isLoading1, statisticOfMonth } = this.props;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (statisticOfMonth) {
      let { numberOfDesignOrder, numberOfProductionOrder } = statisticOfMonth;

      const total = numberOfDesignOrder + numberOfProductionOrder;

      if (total === 0) {
        return null;
      }

      const tmpDesign = (numberOfDesignOrder / total) * 100;
      const tmpProduction = 100 - tmpDesign;

      let chartOption = {
        title: ".",
        data: [
          {
            name: "Thiết kế",
            y: tmpDesign,
            sliced: true,
            selected: true
          },
          {
            name: "Sản xuất",
            y: tmpProduction
          }
        ]
      };

      return (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Typography variant="h6" align="center">
              Biểu đồ đơn hàng
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <CircleChart chartOption={chartOption} />
          </Grid>
        </Grid>
      );
    }

    return null;
  };
}

const mapStateToProps = state => ({
  statisticOfMonth: state.saleReducer.statisticOfMonth,
  isLoading1: state.saleReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getStisticOfMonth }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(
  withMyStyle,
  connectRedux
)(CountOrderCharByMonthComponent);
