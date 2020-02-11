import { Grid, Button, CircularProgress, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import React, { Component } from "react";
import { compose } from "redux";
import styles from "./styles";

class SelectDateComponent extends Component {
  constructor(props) {
    super(props);

    let { startDate, endDate } = this.props;

    this.state = {
      startDate: startDate,
      endDate: endDate
    };
  }

  render() {
    let { startDate, endDate } = this.state;
    let { btnText, btnIcon, isLoading, classes, btnColor } = this.props;

    return (
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} lg={4}>
          <DatePicker
            label="Từ ngày"
            fullWidth
            format="dd/MM/yyyy"
            value={startDate}
            onChange={date => {
              this.handleDateChange("startDate", date);
            }}
            animateYearScrolling
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DatePicker
            label="Đến ngày"
            fullWidth
            format="dd/MM/yyyy"
            value={endDate}
            onChange={date => {
              this.handleDateChange("endDate", date);
            }}
            animateYearScrolling
          />
        </Grid>
        <Grid item xs={8} lg={4}>
          <Box display="flex" justifyContent="center">
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                startIcon={btnIcon}
                onClick={this.doAction}
                disabled={isLoading}
                style={{ backgroundColor: btnColor }}
              >
                {btnText}
              </Button>
              {isLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Box>
        </Grid>
      </Grid>
    );
  }

  doAction = () => {
    let { changeDate } = this.props;
    let { startDate, endDate } = this.state;
    changeDate(startDate, endDate);
  };

  handleDateChange = (name, date) => {
    this.setState({
      [name]: date
    });
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(SelectDateComponent);
