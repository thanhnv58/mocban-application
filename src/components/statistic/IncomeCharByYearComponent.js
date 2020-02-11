import {
  Box,
  CircularProgress,
  Grid,
  TextField,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Component, default as React } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getStisticOfYear } from "../../actions/sale/main-screen-action/actions";
import styles from "./styles";
import { getCurrency } from "../../utils/helpers";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

class IncomeCharByYearComponent extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      txtYear: d.getFullYear(),
      txtYearError: false
    };
  }

  render() {
    let { classes, isLoading2 } = this.props;
    let { txtYearError, txtYear } = this.state;

    return (
      <React.Fragment>
        <Box mt={1}>
          <Typography variant="h6">Thống kê thu nhập theo năm</Typography>
        </Box>

        <Box m={2}>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <TextField
                name="txtYear"
                value={txtYear}
                onChange={this.onChangeTextField}
                label="Năm"
                type="number"
                variant="outlined"
                margin="dense"
                error={txtYearError}
                helperText={
                  txtYearError ? "Nhập năm từ 2019 đến hiện tại" : null
                }
                required
              />
            </Grid>
            <Grid item>
              <Box display="flex" justifyContent="center">
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EqualizerIcon />}
                    disabled={txtYearError || isLoading2}
                    onClick={this.getData}
                  >
                    Lấy dữ liệu
                  </Button>
                  {isLoading2 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderStatisticChart()}
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderStaticOfYear()}
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }

  getData = (month, year) => {
    let { txtYear } = this.state;
    let { getStisticOfYear } = this.props;

    getStisticOfYear(txtYear);
  };

  onChangeTextField = e => {
    let { target } = e;
    let { name, value } = target;
    this.setState({
      [name]: value
    });

    let d = new Date();
    if (name === "txtYear") {
      if (value < 2019 || value > d.getFullYear()) {
        this.setState({
          txtYearError: true
        });
      } else {
        this.setState({
          txtYearError: false
        });
      }
    }
  };

  renderStaticOfYear = () => {
    let { isLoading2, statisticOfYear } = this.props;

    // Show loading...
    if (isLoading2) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (statisticOfYear) {
      let { designOrders, productionOrders, amounts } = statisticOfYear;

      let chartOption1 = {
        title: ".",
        yTitle: "Đơn hàng (đơn)",
        series: [
          {
            name: "Thiết kế",
            data: designOrders
          },
          {
            name: "Sản xuất",
            data: productionOrders
          }
        ]
      };

      let chartOption2 = {
        title: ".",
        yTitle: "VND",
        series: [
          {
            name: "Khoản thu",
            data: amounts
          }
        ]
      };

      return (
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <Box m={4}></Box>
            <Typography variant="h6" align="center">
              Biểu đồ đơn hàng theo năm
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <BarChart chartOption={chartOption1} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <Box m={4}></Box>
            <Typography variant="h6" align="center">
              Biểu đồ lợi nhuận theo năm
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <LineChart chartOption={chartOption2} />
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  renderStatisticChart = () => {
    let { isLoading2, statisticOfYear } = this.props;

    // Show loading...
    if (isLoading2) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (statisticOfYear) {
      let {
        numberOfDesignOrder,
        numberOfProductionOrder,
        amountOfYear,
        incomeOfYear,
        payOfYear
      } = statisticOfYear;

      return (
        <Box m={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng trong năm: `}
                <b>{`${numberOfDesignOrder + numberOfProductionOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng thiết kế: `}
                <b>{`${numberOfDesignOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng sản xuất: `}
                <b>{`${numberOfProductionOrder} đơn`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography variant="body1" component="p">
                {`Tổng lợi nhuận trong năm: `}
                <b>{`${getCurrency(amountOfYear ? amountOfYear : 0)}`}</b>
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              {incomeOfYear !== null && (
                <Typography variant="body1" component="p">
                  {`Tổng số thu trong năm: `}
                  <b>{`${getCurrency(incomeOfYear ? incomeOfYear : 0)}`}</b>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} lg={4}>
              {payOfYear !== null && (
                <Typography variant="body1" component="p">
                  {`Tổng số chi trong năm: `}
                  <b>{`${getCurrency(payOfYear ? payOfYear : 0)}`}</b>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      );
    }

    return null;
  };
}

const mapStateToProps = state => ({
  statisticOfYear: state.saleReducer.statisticOfYear,
  isLoading2: state.saleReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getStisticOfYear }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(IncomeCharByYearComponent);
