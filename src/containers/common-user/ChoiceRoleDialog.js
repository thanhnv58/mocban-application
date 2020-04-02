import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import styles from "./styles";
import { compose } from "redux";
import { helpers_getUserRole } from "../../utils/helpers";

class ChoiceRoleDialog extends Component {
  render() {
    let { open, classes, listRole } = this.props;
    return (
      <Dialog aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Chọn chức năng</DialogTitle>
        <List>
          {listRole.map(role => (
            <ListItem
              button
              onClick={() => this.handleListItemClick(role)}
              key={role}
            >
              <ListItemAvatar>
                <Avatar className={classes.green}>
                  {role.substring(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={helpers_getUserRole(role)} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }

  handleListItemClick = value => {
    let { onClose } = this.props;
    onClose(value);
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(ChoiceRoleDialog);
