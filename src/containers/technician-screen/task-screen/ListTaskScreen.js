import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles, lighten } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import {
  getListTask,
  loadMoreListTask
} from "../../../actions/technician/task-screen-action/actions";
import Copyright from "../../../components/Copyright";
import { getTaskColor, getTaskStatus } from "../../../utils/helpers";
import { convertFrontEndDateTime } from "../../../utils/timeUtils";
import * as OrderStatus from "./../../../constants/OrderStatus";
import BuildIcon from "@material-ui/icons/Build";
import styles from "./styles";

class ListTaskScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radioStatus: 0
    };
  }

  componentDidMount() {
    let { getListTask, pageTask } = this.props;
    let { currentPage } = pageTask;

    if (currentPage === -1) {
      getListTask();
    }
  }

  render() {
    let { radioStatus } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" align="left">
          <b>Danh sách công việc</b>
        </Typography>

        <Box mt={3} mb={3} ml={2} mr={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Bộ lọc</FormLabel>
            <RadioGroup
              name="radioStatus"
              value={radioStatus}
              onChange={this.handleChange}
              row
            >
              <FormControlLabel
                value={0}
                control={<Radio color="primary" />}
                label="Tất cả"
                labelPlacement="end"
              />
              <FormControlLabel
                value={1}
                control={<Radio color="primary" />}
                label="Chưa làm"
                labelPlacement="end"
              />
              <FormControlLabel
                value={2}
                control={<Radio color="primary" />}
                label="Đang làm"
                labelPlacement="end"
              />
              <FormControlLabel
                value={3}
                control={<Radio color="primary" />}
                label="Hoàn thành"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box mt={3} mb={3} ml={2} mr={2}>
          {this.renderListOrder()}
        </Box>

        <Copyright />
      </React.Fragment>
    );
  }

  handleChange = e => {
    let { target } = e;
    let { name, value } = target;
    this.setState({
      [name]: parseInt(value)
    });
  };

  renderListOrder = () => {
    let { pageTask, classes, isLoading1, isLoading2 } = this.props;
    let { tasks, currentPage, totalPage } = pageTask;

    let { radioStatus } = this.state;

    let fStatus =
      radioStatus === 1
        ? OrderStatus.VALIDATE_TRUE
        : radioStatus === 2
        ? OrderStatus.IN_PROGRESS
        : OrderStatus.DONE;

    const listFiltedTask =
      radioStatus === 0
        ? tasks
        : tasks.filter(order => {
            return order.status === fStatus;
          });

    // Show list client
    let xhtml = (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell align="center">Tên khách hàng</StyledTableCell>
              <StyledTableCell align="center">
                Trạng thái công việc
              </StyledTableCell>
              <StyledTableCell align="center">
                Tiến độ công việc
              </StyledTableCell>
              <StyledTableCell align="center">Ngày bắt đầu làm</StyledTableCell>
              <StyledTableCell align="center">Ngày hoàn thành</StyledTableCell>
              <StyledTableCell align="center">
                Thời gian ước lượng
              </StyledTableCell>
              <StyledTableCell align="center">Hoạt động</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading1 && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  <Box display="flex" justifyContent="center" mt={3} mb={3}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {isLoading1 === false && listFiltedTask.length === 0 && (
              <StyledTableRow key="1">
                <StyledTableCell
                  component="th"
                  scope="row"
                  align="center"
                  colSpan={9}
                >
                  <Typography variant="body1" gutterBottom>
                    Danh sách công việc rỗng!
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
            {listFiltedTask.map((order, i) => {
              let { client } = order;
              return (
                <StyledTableRow key={order.id}>
                  <StyledTableCell align="center">
                    <b>{i + 1}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>{client.fullName}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <b>
                      <span style={{ color: getTaskColor(order.status) }}>
                        {getTaskStatus(order.status)}
                      </span>
                    </b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <BorderLinearProgress
                      className={classes.margin}
                      variant="determinate"
                      color="secondary"
                      value={order.progress ? order.progress : 0}
                    />
                    <b>{order.progress ? order.progress : 0}%</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {convertFrontEndDateTime(order.startDate)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {convertFrontEndDateTime(order.endDate)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {`${order.estimateDay ? order.estimateDay : 0} ngày`}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <NavLink
                      to={`/technician/task-detail/${order.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<BuildIcon />}
                      >
                        Cập nhật công việc
                      </Button>
                    </NavLink>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}

            {isLoading1 === false && currentPage < totalPage - 1 && (
              <TableRow>
                <StyledTableCell align="center" colSpan={9}>
                  <div className={classes.wrapper}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={isLoading2}
                      startIcon={<CloudDownloadIcon />}
                      onClick={this.loadMore}
                    >
                      Tải thêm
                    </Button>
                    {isLoading2 && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );

    return xhtml;
  };

  loadMore = () => {
    let { loadMoreListTask } = this.props;
    loadMoreListTask();
  };
}

const mapStateToProps = state => ({
  pageTask: state.technicianReducer.pageTask,
  isLoading1: state.technicianReducer.ui.isLoading1,
  isLoading2: state.technicianReducer.ui.isLoading2
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getListTask,
      loadMoreListTask
    },
    dispatch
  );
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(ListTaskScreen);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#0288d1",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#304ffe", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#304ffe"
  }
})(LinearProgress);
