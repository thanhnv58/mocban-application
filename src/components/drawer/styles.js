const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.drawerWidth,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: theme.drawerWidth
  },
  nested: {
    paddingLeft: theme.spacing(5)
  }
});

export default styles;
