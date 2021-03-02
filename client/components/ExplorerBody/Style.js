import { makeStyles } from "@material-ui/core/styles";
const Style = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  content: {
    padding: theme.spacing(2),
  },
  itemHeader: {
    padding: theme.spacing(1),
  },
  fileName: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

export default Style;
