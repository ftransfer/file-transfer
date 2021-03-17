import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import HomeIcon from "@material-ui/icons/Home";

import { getApi } from "../../api/Api";

import Style from "./Style";

export default function ExplorerHeader(props) {
  const classes = Style();
  const [paths, setPaths] = useState([]);
  const [createDirOpen, setCreateDirOpen] = useState(false);
  const [newDirName, setNewDirName] = useState("");

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

  function closeCreateDir() {
    setCreateDirOpen(false);
    setNewDirName("");
  }

  function createDir() {
    if (newDirName) {
      getApi(window.location.origin)
        .post("dir/" + paths.join("/") + "/" + newDirName)
        .then((res, err) => {
          props.getFiles();
        });
    }
    closeCreateDir();
  }

  return (
    <Box
      display="flex"
      className={classes.root}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
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
            <Box display="flex" alignItems="center" justifyContent="center">
              <HomeIcon fontSize="small" />
            </Box>
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
          onClick={() => setCreateDirOpen(true)}
        >
          Add Folder
        </Button>
      </Box>
      <Dialog
        open={createDirOpen}
        onClose={closeCreateDir}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Directory Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            color="primary"
            type="text"
            fullWidth
            value={newDirName}
            onChange={(event) => {
              if (!event.target.value.startsWith(" "))
                setNewDirName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreateDir} color="secondary">
            Cancel
          </Button>
          <Button onClick={createDir} color="primary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
