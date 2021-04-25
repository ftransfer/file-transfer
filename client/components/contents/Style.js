import { makeStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) => ({
  root: {
    width: "80vw",
    height: "80vh",
    padding: theme.spacing(2),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  close: {
    background: theme.palette.error.main,
    color: theme.palette.text.primary,
    marginLeft: theme.spacing(2),
  },
}));

export default Style;
