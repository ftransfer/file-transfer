import { makeStyles, createStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
    },
    paper: {
      width: theme.spacing(90),
      height: theme.spacing(50),
      padding: theme.spacing(2),
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    startButton: {
      background: theme.palette.primary.main,
      color: "#fff",
    },
    endButton: {
      background: theme.palette.error.main,
      color: "#fff",
    },
    startButtonContainer: {
      marginTop: theme.spacing(5),
    },
    warningInfo: {
      marginTop: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      background: theme.palette.warning.main,
    },

    serverInfoContainer: {
      marginTop: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    portContainer: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  })
);

export default Style;
