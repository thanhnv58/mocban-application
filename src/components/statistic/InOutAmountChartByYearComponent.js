import { Box, CircularProgress, Grid, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Component, default as React } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { getInOutAmountOfYear } from "../../actions/statistic-action/actions";
import styles from "./styles";
import BarChart2 from "./BarChart2";

class InOutAmountChartByYearComponent extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      txtYear: d.getFullYear(),
      txtYearError: false
    };
  }

  render() {
    let { classes, isLoading1 } = this.props;
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
                    disabled={txtYearError || isLoading1}
                    onClick={this.getData}
                  >
                    Lấy dữ liệu
                  </Button>
                  {isLoading1 && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderChart()}
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
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

  getData = () => {
    let { getInOutAmountOfYear, inOutAmountOfYear } = this.props;
    let { txtYear } = this.state;
    if (
      inOutAmountOfYear === null ||
      parseInt(txtYear) !== inOutAmountOfYear.year
    ) {
      getInOutAmountOfYear(parseInt(txtYear));
    }
  };

  renderChart = () => {
    let { isLoading1, inOutAmountOfYear } = this.props;

    // Show loading...
    if (isLoading1) {
      return (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      );
    }

    if (inOutAmountOfYear) {
      let { incomes, pays } = inOutAmountOfYear;

      let chartOption = {
        yTitle: "VNĐ",
        series: [
          {
            name: "Thu",
            data: incomes
          },
          {
            name: "Chi",
            data: pays
          }
        ]
      };
      return (
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Typography variant="h6" align="center">
              Biểu đồ giao dịch
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <BarChart2 chartOption={chartOption} />
          </Grid>
        </Grid>
      );
    }

    return null;
  };
}

const mapStateToProps = state => ({
  inOutAmountOfYear: state.statisticReducer.inOutAmountOfYear,
  isLoading1: state.statisticReducer.ui.isLoading1
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getInOutAmountOfYear }, dispatch);
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(
  withMyStyle,
  connectRedux
)(InOutAmountChartByYearComponent);
