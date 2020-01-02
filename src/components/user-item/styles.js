import { deepOrange, deepPurple } from "@material-ui/core/colors";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3)
    }
  },
  orange: {
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  button: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  buttonSuccess: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: "#00c853"
  },
  margin: {
    margin: theme.spacing(1)
  },
  padding: {
    padding: theme.spacing(0, 2)
  }
});

export default styles;
