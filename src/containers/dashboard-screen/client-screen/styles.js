import { green } from "@material-ui/core/colors";
const styles = theme => ({
  root: {
    width: "100%"
  },
  searchInput: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    width: "100%"
  },
  button: {
    marginBottom: theme.spacing(2)
  },
  wrapper: {
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3)
    }
  }
});

export default styles;
