import { green } from "@material-ui/core/colors";
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
});

export default styles;
