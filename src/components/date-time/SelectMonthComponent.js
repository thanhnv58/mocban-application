import {
  Grid,
  TextField,
  Button,
  Box,
  CircularProgress
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { compose } from "redux";
import styles from "./styles";

class SelectMonthComponent extends Component {
  constructor(props) {
    super(props);

    let { month, year } = this.props;

    this.state = {
      txtMonth: month,
      txtMonthError: false,
      txtYear: year,
      txtYearError: false
    };
  }

  render() {
    let { txtMonthError, txtMonth, txtYear, txtYearError } = this.state;
    let { btnText, btnIcon, isLoading, classes, btnColor } = this.props;

    return (
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={4} lg={4}>
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
            required
          />
        </Grid>
        <Grid item xs={8} lg={4}>
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
            required
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
                disabled={txtMonthError || txtYearError || isLoading}
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
    let { changeMonth } = this.props;
    let { txtMonth, txtYear } = this.state;
    changeMonth(parseInt(txtMonth), parseInt(txtYear));
  };

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
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(SelectMonthComponent);
