const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "96%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  table: {
    width: "100%"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonProgress: {
    color: theme.colorProgress,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

export default styles;
