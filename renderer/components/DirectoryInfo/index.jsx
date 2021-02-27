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

  return (
    <Grid item xs={11} sm={5} md={5} lg={4}>
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
            </Box>
            <Box>
              <Switch color="primary" checked={props.target === "source"} />
            </Box>
          </Box>
          <Box className={classes.desc}>
            <Typography variant="body2">{props.desc}</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.buttonChange}
          >
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
      </Paper>
    </Grid>
  );
}

export default DeirectoryInfo;
