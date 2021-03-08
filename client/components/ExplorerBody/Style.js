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
    cursor: "default",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  backDrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default Style;
