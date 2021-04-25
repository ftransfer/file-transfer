import { makeStyles } from "@material-ui/core/styles";
const Style = makeStyles((theme) => ({
  root: { padding: theme.spacing(2) },
  drop: {
    borderStyle: "dashed",
    borderWidth: "3px",
    borderColor: theme.palette.text.primary,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },

  files: {
    marginTop: theme.spacing(2),
  },

  accordinSummary: {
    width: "100%",
  },

  fileIcon: {
    fontSize: 16,
    marginRight: theme.spacing(1),
  },

  fileSummaryTitle: {
    marginRight: theme.spacing(2),
  },
  removeButton: {
    color: theme.palette.error.main,
  },
  textPercent: {
    fontSize: 8,
  },
}));

export default Style;
