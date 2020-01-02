import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalPharmacyIcon from "@material-ui/icons/LocalPharmacy";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import MyMenuItem from "./MyMenuItem";
import styles from "./styles";

const listMenu1 = [
  {
    title: "Quản lý người dùng",
    icon: <SupervisorAccountIcon />,
    isNested: true,
    open: false,
    children: [
      {
        title: "Tạo khách hàng",
        icon: <PersonAddIcon />,
        path: "/dashboard/clients/create"
      },
      {
        title: "Danh sách khách hàng",
        icon: <PermContactCalendarIcon />,
        path: "/dashboard/clients"
      }
    ]
  },
  {
    title: "Quản lý dự án",
    icon: <ChromeReaderModeIcon />,
    isNested: true,
    open: false,
    children: [
      {
        title: "Tạo dự án",
        icon: <LocalPharmacyIcon />,
        path: "/dashboard/projects/create"
      },
      {
        title: "Danh sách dự án",
        icon: <LibraryBooksIcon />,
        path: "/dashboard/projects"
      }
    ]
  },
  {
    title: "Quản lý giao dịch",
    icon: <AttachMoneyIcon />,
    isNested: true,
    open: false,
    children: [
      {
        title: "Thống kê giao dịch",
        icon: <EqualizerIcon />,
        path: "/dashboard/transactions"
      }
    ]
  }
];

const listMenu2 = [
  {
    title: "Log out",
    icon: <ExitToAppIcon />,
    isLink: true,
    path: "/logout"
  }
];

class MyDrawer extends Component {
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

export default compose(withMyStyle, connectRedux)(MyDrawer);
