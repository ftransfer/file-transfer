import { useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import FolderIcon from "@material-ui/icons/Folder";
import SettingsIcon from "@material-ui/icons/Settings";

import MiddleEllipsis from "react-middle-ellipsis";

import Style from "./style";

function DeirectoryInfo(props) {
  const classes = Style();

  const [path, setPath] = useState(props.state);
  const [pathRerendering, setPathRerendering] = useState(false);

  useEffect(() => {
    // manualy handling MiddleEllipsis not rerender
    setPathRerendering(true);
    setTimeout(() => {
      setPathRerendering(false);
    }, 100);

    setPath(props.path);
  }, [props.path]);

  function changeOpts(opt) {
    const newOpts = { ...props.opts };
    newOpts[opt] = !newOpts[opt];
    props.changeOpts(newOpts);
  }

  return (
    <Grid item xs={11} sm={10} md={8} lg={7}>
      <Paper className={classes.root}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center">
            <Box>
              <FolderIcon style={{ fontSize: 36 }} />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              flexGrow={1}
              className={classes.dirInfo}
              style={{ overflow: "hidden" }}
            >
              <Box>
                <Typography component="h4" variant="h6">
                  {props.title}
                </Typography>
              </Box>
              <Tooltip title={path || " "} arrow placement="bottom">
                <Box
                  style={{
                    whiteSpace: "nowrap",
                    cursor: "help",
                  }}
                >
                  {pathRerendering ? (
                    <Typography variant="subtitle2" component="span">
                      ...
                    </Typography>
                  ) : (
                    <MiddleEllipsis>
                      <Typography variant="subtitle2" component="span">
                        {path}
                      </Typography>
                    </MiddleEllipsis>
                  )}
                </Box>
              </Tooltip>
              <Typography variant="body2" className={classes.optDesc}>
                {props.desc}
              </Typography>
            </Box>
            <Box>
              <Button
                disabled={!props.canChange}
                variant="outlined"
                startIcon={<SettingsIcon />}
                onClick={() => {
                  props.openDir(props.target);
                }}
              >
                Change
              </Button>
            </Box>
          </Box>

          <Box display="flex" className={classes.opt} flexDirection="column">
            <Box display="flex" flexGrow={1} alignItems="center">
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box>
                  <Typography fontSize={14} className={classes.optTitle}>
                    Reveice Files
                  </Typography>
                </Box>
                <Box className={classes.optDesc}>
                  Client can upload file to the Source Directory or sub
                  directory
                </Box>
              </Box>
              <Box
                flexGrow={1}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Switch
                  color="primary"
                  checked={props.opts.receiveFile}
                  onClick={() => changeOpts("receiveFile")}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexGrow={1}
              alignItems="center"
              className={classes.optItem}
            >
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box>
                  <Typography fontSize={14} className={classes.optTitle}>
                    Modify Files
                  </Typography>
                </Box>
                <Box className={classes.optDesc}>
                  Client can rename files or directories
                </Box>
              </Box>
              <Box
                flexGrow={1}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Switch
                  color="primary"
                  checked={props.opts.modifyFiles}
                  onClick={() => changeOpts("modifyFiles")}
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flexGrow={1}
              alignItems="center"
              className={classes.optItem}
            >
              <Box display="flex" flexDirection="column" flexGrow={1}>
                <Box>
                  <Typography fontSize={14} className={classes.optTitle}>
                    Delete Files
                  </Typography>
                </Box>
                <Box className={classes.optDesc}>
                  Client can delete files or directories
                </Box>
              </Box>
              <Box
                flexGrow={1}
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Switch
                  color="primary"
                  checked={props.opts.deleteFiles}
                  onClick={() => changeOpts("deleteFiles")}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

export default DeirectoryInfo;
