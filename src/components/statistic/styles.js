const styles = theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3)
    }
  },
  button: {
    marginRight: theme.spacing(1)
  },
  wrapper: {
    position: "relative"
  },
  buttonProgress: {
    color: "#1565c0",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

export default styles;
