const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  rootSearch: {
    padding: "2px 4px",
    alignItems: "center",
    width: "100%"
  },
  inputSearch: {
    marginLeft: theme.spacing(1),
    paddingLeft: 10,
    width: "100%"
  },
  iconButtonSearch: {
    padding: 10
  }
});

export default styles;
