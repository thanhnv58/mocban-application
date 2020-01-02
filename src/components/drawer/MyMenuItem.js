import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { compose } from "redux";
import styles from "./styles";

class MyMenuItem extends Component {
  constructor(props) {
    super(props);

    let { open } = this.props;

    this.state = {
      open
    };
  }

  render() {
    let { item, classes, onClick } = this.props;
    let { path, icon, title, isNested, isLink, children } = item;
    let { open } = this.state;

    if (isNested) {
      return (
        <React.Fragment>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((child, i) => {
                let { path, icon, title } = child;
                return (
                  <NavLink
                    key={i}
                    to={path}
                    style={{ textDecoration: "none", color: "black" }}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#03a9f4"
                    }}
                  >
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={title} />
                    </ListItem>
                  </NavLink>
                );
              })}
            </List>
          </Collapse>
        </React.Fragment>
      );
    } else if (isLink) {
      return (
        <NavLink
          to={path}
          style={{ textDecoration: "none", color: "black" }}
          activeStyle={{
            fontWeight: "bold",
            color: "#03a9f4"
          }}
        >
          <ListItem button>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        </NavLink>
      );
    } else {
      return (
        <ListItem button onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      );
    }
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(MyMenuItem);
