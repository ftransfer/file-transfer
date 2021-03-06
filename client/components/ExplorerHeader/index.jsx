import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";

import Style from "./Style";

export default function ExplorerHeader(props) {
  const classes = Style();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    setPaths(props.pathFile.cutPath.split("\\"));
  }, [props.pathFile]);

  function changePath(indexAt) {
    const indexOf = props.pathFile.realPath.indexOf(props.pathFile.cutPath);
    const base = props.pathFile.realPath.substring(0, indexOf);
    const pa = [];
    for (let k = 0; k <= indexAt; k++) {
      pa.push(paths[k]);
    }
    props.changePath(base + pa.join("\\"));
  }

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
            onClick={() => {
              props.changePath("");
            }}
          >
            ~
          </Link>
          {paths.map((v, i) => {
            if (v.length > 0)
              return (
                <Link
                  key={v}
                  color="textPrimary"
                  variant="h6"
                  className={classes.breads}
                  onClick={() => {
                    changePath(i);
                  }}
                >
                  {v}
                </Link>
              );
            return null;
          })}
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
