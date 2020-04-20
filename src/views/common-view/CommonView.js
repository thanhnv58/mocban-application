import { LinearProgress } from "@material-ui/core";
import { lighten, withStyles } from "@material-ui/core/styles";

export const BorderLinearProgressRed = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#039be5", 0.9),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "red",
  },
})(LinearProgress);

export const BorderLinearProgressOrange = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#039be5", 0.9),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "orange",
  },
})(LinearProgress);

export const BorderLinearProgressGreen = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#039be5", 0.9),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#00c853",
  },
})(LinearProgress);

export const BorderLinearProgressBlue = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#039be5", 0.9),
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#2962ff",
  },
})(LinearProgress);
