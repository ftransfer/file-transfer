import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#4caf50",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#303030",
    },
  },
  typography: {
    fontFamily: ["'Nunito'", "sans-serif"].join(","),
  },
});
