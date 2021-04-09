import { makeStyles, createStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      marginTop: theme.spacing(3),
    },
    paper: {
      borderRadius: 8,
    },
    dirInfo: {
      marginLeft: theme.spacing(1),
    },
    buttonChange: {
      marginTop: theme.spacing(1),
    },
    opt: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    optItem: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    optTitle: {
      fontWeight: 700,
    },
    optDesc: {
      opacity: 0.6,
      fontWeight: 200,
    },
    sourceContainer: {
      width: "100%",
    },
  })
);

export default Style;
