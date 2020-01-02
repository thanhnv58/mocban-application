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
import CircleChart from "./CircleChart";
import { getStisticOfMonth } from "./../../actions/sale/main-screen-action/actions";

class StatisticOfMonth extends Component {
  constructor(props) {
    super(props);

    let d = new Date();
    this.state = {
      txtMonth: d.getMonth() + 1,
      txtMonthError: false
    };
  }

  render() {
    let { classes, isLoading1 } = this.props;
    let { txtMonthError, txtMonth } = this.state;

    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box mt={1}>
            <Typography variant="h6">Thống kê theo tháng</Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={12} lg={8}>
              <TextField
                name="txtMonth"
                value={txtMonth}
                onChange={this.onChangeTextField}
                label="Tháng"
                type="number"
                variant="outlined"
                fullWidth
                margin="dense"
                error={txtMonthError}
                helperText={txtMonthError ? "Nhập tháng từ 1 đến 12" : null}
                required
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Box display="flex" justifyContent="center">
                <div className={classes.wrapper}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EqualizerIcon />}
                    disabled={txtMonthError || isLoading1}
                    onClick={this.getStatisticOfMonth}
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
              {this.renderStaticOfMonth()}
            </Grid>
            <Grid item xs={12} lg={12}>
              {this.renderStatisticChart()}
            </Grid>
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

    if (name === "txtMonth") {
      if (value <= 0 || value > 12) {
        this.setState({
          txtMonthError: true
        });
      } else {
        this.setState({
          txtMonthError: false
        });
      }
    }
  };

  getStatisticOfMonth = () => {
    let { txtMonth } = this.state;
    let { getStisticOfMonth } = this.props;
    getStisticOfMonth(txtMonth);
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
        amountOfMonth
      } = statisticOfMonth;

      return (
        <Box m={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={12}>
              <Typography variant="body1" component="p">
                {`Số đơn hàng trong tháng: `}
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

  renderStatisticChart = () => {
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
        title: "Biểu đồ đơn hàng",
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

      return <CircleChart chartOption={chartOption} />;
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

export default compose(withMyStyle, connectRedux)(StatisticOfMonth);
