import { makeStyles, createStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    dirInfo: {
      marginLeft: theme.spacing(1),
    },
    buttonChange: {
      marginTop: theme.spacing(1),
    },
    opt: {
      marginTop: theme.spacing(2),

      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
    },
    optItem: {
      marginTop: theme.spacing(1),
    },
    optTitle: {
      fontWeight: 700,
    },
    optDesc: {
      opacity: 0.6,
      fontWeight: 200,
    },
  })
);

export default Style;
