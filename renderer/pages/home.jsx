import { useEffect, useState, Fragment } from "react";
import Head from "next/head";
import { makeStyles, createStyles, formatMs } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";

import CastConnectedIcon from "@material-ui/icons/CastConnected";
import ErrorIcon from "@material-ui/icons/Error";

import { ipcRenderer } from "electron";
import DirectoryInfo from "~/components/DirectoryInfo";

import { Namming } from "~/helpers/index";

import HomeStyle from "../styles/homeStyles";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [isServerProsses, setServerProsses] = useState(false);
  const [isServerCreated, setServerCreated] = useState(false);
  const [canChangeSettings, setCanChangeSettings] = useState(true);
  const [serverAddresses, setServerAddresses] = useState([]);
  const [port, setPort] = useState(3000);
  const [sourceDir, setSourceDir] = useState("...");
  const [uploadDir, setUploadDir] = useState("...");

  const classes = HomeStyle();

  useEffect(() => {
    ipcRenderer.once(Namming.ON_DEFAULT_DIR, (event, arg) => {
      setSourceDir(arg.sourceDir);
      setUploadDir(arg.uploadDir);
      if (arg.isServerRunning) {
        setServerAddresses(arg.addresses);
        setServerCreated(true);
        setCanChangeSettings(false);
      } else setCanChangeSettings(true);
    });
    ipcRenderer.send(Namming.REQ_DEFAULT_DIR);
  }, []);

  function openDir(target) {
    ipcRenderer.once(Namming.DIR_SELECTED, (event, arg) => {
      if (arg.arg.target === "source") {
        setSourceDir(arg.path);
      } else if (arg.arg.target === "upload") {
        setUploadDir(arg.path);
      }
    });
    ipcRenderer.send(Namming.SELECT_DIR, { target });
  }

  function startServer() {
    setCanChangeSettings(false);
    setServerProsses(true);
    ipcRenderer.once(Namming.SERVER_CREATED, (event, arg) => {
      setServerAddresses(arg);
      setTimeout(() => {
        setServerCreated(true);
        setServerProsses(false);
      }, 1000);
    });

    ipcRenderer.send(Namming.START_SERVER, {
      port,
      sourceDir,
      uploadDir,
    });
  }

  function stopServer() {
    setServerProsses(true);
    ipcRenderer.once(Namming.SERVER_STOPED, (event, arg) => {
      setTimeout(() => {
        setServerCreated(false);
        setServerProsses(false);
        setCanChangeSettings(true);
      }, 1000);
    });

    ipcRenderer.send(Namming.STOP_SERVER, {
      port,
      sourceDir,
      uploadDir,
    });
  }

  function onPortChange(value) {
    setPort(value.replace(/\D/g, "").substring(0, 4));
  }

  function fixPort(value) {
    if (value.length < 4) value = (value + "0000").substring(0, 4);
    const charArray = value.split("");
    if (charArray[0] < 3) charArray[0] = 3;
    setPort(charArray.join(""));
  }

  const serverInfo = (
    <Fragment>
      <Paper className={classes.warningInfo} display>
        <Box display="flex" alignItems="center">
          <ErrorIcon style={{ marginRight: 8 }} />
          Make sure your device and other devices are connected to the same
          network.
        </Box>
      </Paper>
      <Grid container justify="center">
        <Grid item xs={11} sm={9} md={7}>
          <Paper className={classes.serverInfoContainer}>
            Server addresses:
            {serverAddresses.map((v, i) => {
              let m = i === 0 ? " " : " or ";
              return (
                <Box component="span">
                  {m}
                  <Box component="span" fontWeight="fontWeightBold">
                    {v}
                  </Box>
                </Box>
              );
            })}
            <Typography variant="subtitle2" style={{ marginTop: 6 }}>
              Other devices can acess your source directory by open their
              browser and type address{" "}
              {
                <Box component="span" fontWeight="fontWeightBold">
                  {
                    serverAddresses[
                      serverAddresses.length > 0
                        ? serverAddresses.length - 1
                        : ""
                    ]
                  }
                </Box>
              }{" "}
              or one of server address above
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={classes.title}
      >
        <Typography variant="h3" component="h1">
          File Transfer
        </Typography>
      </Box>
      <Grid container spacing={2} justify="center">
        <DirectoryInfo
          title="Source Directory"
          path={sourceDir || ""}
          target="source"
          openDir={openDir}
          canChange={canChangeSettings}
          desc="The source directory you want to share. All child directories and
              files are displayed."
        />
        <DirectoryInfo
          title="Receiving Directory"
          path={uploadDir || ""}
          target="upload"
          openDir={openDir}
          canChange={canChangeSettings}
          desc="The source directory you want to share. All child directories and
              files are displayed."
        />
      </Grid>
      <Box className={classes.startButtonContainer}>
        {isServerProsses ? (
          <CircularProgress />
        ) : (
          <Fab
            variant="extended"
            color="primary"
            className={
              isServerCreated ? classes.endButton : classes.startButton
            }
            onClick={() => {
              isServerCreated ? stopServer() : startServer();
            }}
          >
            <CastConnectedIcon style={{ marginRight: 12 }} />
            {isServerCreated ? "Stop" : "Start"}
          </Fab>
        )}
      </Box>
      {isServerCreated ? serverInfo : null}
      <Box
        alignSelf="flex-start"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        className={classes.portContainer}
      >
        <TextField
          id="outlined-basic"
          label="port"
          value={port}
          style={{ width: 80 }}
          variant="outlined"
          size="small"
          disabled={!canChangeSettings}
          onChange={(event) => {
            onPortChange(event.target.value);
          }}
          onBlur={(event) => {
            fixPort(event.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
