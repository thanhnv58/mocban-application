import {
  Box,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Component, default as React } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getCurrency } from "../../utils/helpers";
import styles from "./styles";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { getStisticOfYear } from "./../../actions/sale/main-screen-action/actions";

class StatisticOfYear extends Component {
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
    let { txtYear, txtYearError } = this.state;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box mt={1}>
            <Typography variant="h6">Thống kê theo năm</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} lg={8}>
              <TextField
                name="txtYear"
                value={txtYear}
                onChange={this.onChangeTextField}
                label="Năm"
                type="number"
                variant="outlined"
                fullWidth
                margin="dense"
                error={txtYearError}
                helperText={
                  txtYearError ? "Nhập năm từ 2019 đến hiện tại" : null
                }
                required
              />
            </Grid>
            <Grid item xs={12} lg={2}>
              <Box display="flex" justifyContent="center">
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EqualizerIcon />}
                    disabled={txtYearError || isLoading2}
                    onClick={this.getStatisticOfYear}
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
              {this.renderStaticOfYear()}
            </Grid>

            {this.renderStatisticChart()}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

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

  getStatisticOfYear = () => {
    let { txtYear } = this.state;
    let { getStisticOfYear } = this.props;

    getStisticOfYear(txtYear);
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
        title: "Biểu đồ đơn hàng",
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
        title: "Biểu đồ khoản thu",
        yTitle: "VND",
        series: [
          {
            name: "Khoản thu",
            data: amounts
          }
        ]
      };

      return (
        <React.Fragment>
          <Grid item xs={12} lg={12}>
            <BarChart chartOption={chartOption1} />
          </Grid>
          <Grid item xs={12} lg={12}>
            <LineChart chartOption={chartOption2} />
          </Grid>
        </React.Fragment>
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
        amountOfYear
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
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" component="p">
                {`Tổng số tiền trong năm: `}
                <b>{`${getCurrency(amountOfYear ? amountOfYear : 0)}`}</b>
              </Typography>
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

export default compose(withMyStyle, connectRedux)(StatisticOfYear);
