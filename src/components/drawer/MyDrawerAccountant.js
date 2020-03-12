import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import MyMenuItem from "./MyMenuItem";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import SecurityIcon from "@material-ui/icons/Security";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import styles from "./styles";

const listMenu1 = [
  {
    title: "Trang chủ",
    icon: <HomeIcon />,
    isLink: true,
    path: "/accountant/home"
  },
  {
    title: "Công việc",
    icon: <WorkOutlineIcon />,
    isNested: true,
    open: false,
    children: [
      {
        title: "Danh sách khách hàng",
        icon: <PermContactCalendarIcon />,
        path: "/accountant/list-client"
      },
      {
        title: "Xác thực giao dịch",
        icon: <SecurityIcon />,
        path: "/accountant/validate-transaction"
      }
    ]
  },
  {
    title: "Quản lý giao dịch",
    icon: <EuroSymbolIcon />,
    isNested: true,
    open: false,
    children: [
      {
        title: "Tạo giao dịch",
        icon: <LocalAtmIcon />,
        path: "/accountant/create-transaction"
      },
      {
        title: "Danh sách giao dịch",
        icon: <ListAltIcon />,
        path: "/accountant/list-transaction"
      }
    ]
  }
];

const listMenu2 = [
  {
    title: "Đăng xuất",
    icon: <ExitToAppIcon />,
    isLink: true,
    path: "/logout"
  }
];

class MyDrawerAccountant extends Component {
  render() {
    let { classes, mobileOpen, handleDrawerToggle } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Box m={1}>
          <Divider />
        </Box>
        <List>{this.renderListItemDrawer()}</List>
        <Box m={1}>
          <Divider />
        </Box>
        <List>{this.renderListItemDrawer2()}</List>
      </div>
    );

    return (
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }

  renderListItemDrawer = () => {
    return listMenu1.map((item, index) => {
      return <MyMenuItem key={index} item={item} />;
    });
  };

  renderListItemDrawer2 = () => {
    return listMenu2.map((item, index) => (
      <MyMenuItem item={item} key={index} />
    ));
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

const connectRedux = connect(null, mapDispatchToProps);

const withMyStyle = withStyles(styles);

export default compose(withMyStyle, connectRedux)(MyDrawerAccountant);
