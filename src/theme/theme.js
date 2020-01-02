import { createMuiTheme } from "@material-ui/core/styles";
import palette from "./palette";
// import typography from "./typography";
import overrides from "./overrides";
import { green, deepOrange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette,
  // typography,
  overrides,
  colorProgress: green[500],
  drawerWidth: 280,
  avatarColor: deepOrange[500],
  textContentColor: "#1565c0"
});

export default theme;
