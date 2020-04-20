import { green } from "@material-ui/core/colors";
import { lighten } from "@material-ui/core/styles";
const styles = (theme) => ({
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  // formControl: {
  //   minWidth: 120,
  //   width: "100%"
  // },
  // selectEmpty: {
  //   marginTop: theme.spacing(2)
  // },

  // table: {
  //   minWidth: 700
  // },
  // paper: {
  //   marginBottom: theme.spacing(3),
  //   marginTop: theme.spacing(3),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
  //     marginBottom: theme.spacing(1),
  //     padding: theme.spacing(3)
  //   }
  // },
  // textContentColor: {
  //   color: theme.textContentColor
  // },
  // heading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   fontWeight: theme.typography.fontWeightRegular
  // },
  // formTransaction: {
  //   width: "100%",
  //   marginLeft: theme.spacing(3),
  //   marginRight: theme.spacing(3)
  // },
  // container: {
  //   padding: theme.spacing(3)
  // }
});

export default styles;
