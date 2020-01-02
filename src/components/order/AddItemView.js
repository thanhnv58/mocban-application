import { Button, Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { compose } from "redux";
import styles from "./styles";
import { generateId } from "./../../utils/helpers";

class AddItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      txtName: "",
      txtNote: ""
    };
  }

  render() {
    let { txtName, txtNote } = this.state;

    return (
      <Grid container spacing={1} display="flex" alignItems="center">
        <Grid item xs={12} md={3}>
          <TextField
            name="txtName"
            required
            label="Tên đồ"
            margin="dense"
            variant="outlined"
            fullWidth
            value={txtName}
            onChange={this.onFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField
            name="txtNote"
            required
            label="Mô tả"
            margin="dense"
            variant="outlined"
            fullWidth
            value={txtNote}
            onChange={this.onFieldChange}
          />
        </Grid>
        <Grid item xs={12} md={1}>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={this.onAddItem}
          >
            Thêm
          </Button>
        </Grid>
      </Grid>
    );
  }

  onFieldChange = e => {
    let { target } = e;
    let { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  onAddItem = () => {
    let { txtName, txtNote } = this.state;
    let { onAddItem } = this.props;

    onAddItem({
      id: generateId(),
      name: txtName,
      description: txtNote
    });

    this.setState({
      txtName: "",
      txtNote: ""
    });
  };
}

const withMyStyle = withStyles(styles);

export default compose(withMyStyle)(AddItemView);
