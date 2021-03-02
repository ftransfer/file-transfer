import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import HomeIcon from "@material-ui/icons/Home";

import Style from "./Style";

export default function ExplorerHeader(props) {
  const classes = Style();
  return (
    <Box display="flex" className={classes.root}>
      <Box className={classes.dir}>
        <Typography variant="h6" component="h2">
          Directory:
        </Typography>
      </Box>
      <Box flexGrow={1}>
        <Breadcrumbs>
          <Link
            color="textPrimary"
            variant="h6"
            className={classes.breads}
            onClick={() => {}}
          >
            ~
          </Link>

          <Link
            color="textPrimary"
            variant="h6"
            className={classes.breads}
            onClick={() => {}}
          >
            Documents
          </Link>
          <Link
            color="textPrimary"
            variant="h6"
            className={classes.breads}
            onClick={() => {}}
          >
            data
          </Link>
        </Breadcrumbs>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<CreateNewFolderIcon />}
        >
          Add Folder
        </Button>
      </Box>
    </Box>
  );
}
