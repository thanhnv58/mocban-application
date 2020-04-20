const styles = (theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export default styles;
