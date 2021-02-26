import { makeStyles, createStyles } from "@material-ui/core/styles";

const Style = makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    dirInfo: {
      marginLeft: theme.spacing(1),
    },
    desc: {
      marginTop: theme.spacing(2),
    },
    buttonChange: {
      marginTop: theme.spacing(1),
    },
  })
);

export default Style;
