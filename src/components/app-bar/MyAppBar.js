import { Box, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { default as AccountCircleIcon } from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import * as UserRole from "./../../constants/UserRole";
import styles from "./styles";

class MyAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null
    };
  }

  render() {
    let { classes, handleDrawerToggle, role } = this.props;

    let homeLink = "/";

    switch (role) {
      case UserRole.MANAGER:
        homeLink = "/";
        break;
      case UserRole.SALE:
        homeLink = "/sale";
        break;
      default:
        break;
    }

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <NavLink
              to={homeLink}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography className={classes.title} variant="h6">
                Mộc Bản
              </Typography>
            </NavLink>

            <div className={classes.grow} />

            {this.renderDesktopAppBar()}
            {this.renderMobileAppBar()}
          </Toolbar>
        </AppBar>
        {this.renderMobileMenu()}
        {this.renderMenu()}
      </div>
    );
  }

  renderMobileAppBar = () => {
    let { classes } = this.props;
    return (
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls="primary-search-account-menu-mobile"
          aria-haspopup="true"
          onClick={this.handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>
    );
  };

  renderMobileMenu = () => {
    let { mobileMoreAnchorEl } = this.state;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    return (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu-mobile"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        {/* <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem> */}
      </Menu>
    );
  };

  renderDesktopAppBar = () => {
    let { classes, username } = this.props;
    return (
      <div className={classes.sectionDesktop}>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>

        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}

        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircleIcon fontSize="inherit" />
          <Box ml={1}>
            <Typography variant="body1" style={{ color: "white" }}>
              {username}
            </Typography>
          </Box>
        </IconButton>
        <Box mr={4}></Box>
      </div>
    );
  };

  renderMenu = () => {
    let { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <NavLink
          to="/login"
          style={{ textDecoration: "none", color: "black" }}
          activeStyle={{
            fontWeight: "bold",
            color: "#03a9f4"
          }}
        >
          <MenuItem onClick={this.handleMenuClose}>Trang chủ</MenuItem>
        </NavLink>

        <NavLink
          to="/change-password"
          style={{ textDecoration: "none", color: "black" }}
          activeStyle={{
            fontWeight: "bold",
            color: "#03a9f4"
          }}
        >
          <MenuItem onClick={this.handleMenuClose}>Đổi mật khẩu</MenuItem>
        </NavLink>

        <NavLink
          to="/logout"
          style={{ textDecoration: "none", color: "black" }}
          activeStyle={{
            fontWeight: "bold",
            color: "#03a9f4"
          }}
        >
          <MenuItem onClick={this.handleMenuClose}>Đăng xuất</MenuItem>
        </NavLink>
      </Menu>
    );
  };

  handleProfileMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null
    });
    this.handleMobileMenuClose();
  };
}

const mapStateToProps = state => ({
  username: state.auth.username,
  role: state.auth.role
});

const connectRedux = connect(mapStateToProps);

const withMyStyle = withStyles(styles);

export default compose(connectRedux, withMyStyle)(MyAppBar);
