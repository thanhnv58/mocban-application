const styles = theme => ({
  root: {
    width: "100%"
  },
  card: {
    width: "100%"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
});

export default styles;
