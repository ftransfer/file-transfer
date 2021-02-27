import React, { useEffect } from "react";
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

import CastIcon from "@material-ui/icons/Cast";

import { ipcRenderer, dialog } from "electron";

import HomeStyle from "../styles/homeStyles";

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [isServerCreated, setServerCreated] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [port, setPort] = React.useState(3000);
  const [sourceDir, setSourceDir] = React.useState(null);
  const [uploadDir, setUploadDir] = React.useState(null);

  const classes = HomeStyle();

  useEffect(() => {
    ipcRenderer.on("server-created", (event, arg) => {
      setServerCreated(true);
      setServerMessage(arg);
    });
    ipcRenderer.on("server-stoped", (event, arg) => {
      setServerCreated(false);
    });
    ipcRenderer.on("dir-selected", (event, arg) => {
      if (arg.arg.target === "source") {
        setSourceDir(arg.path);
        if (uploadDir == null) setUploadDir(arg.path);
      } else if (arg.arg.target === "upload") {
        setUploadDir(arg.path);
        if (sourceDir == null) setSourceDir(arg.path);
      }
    });
  });

  function openDir(target) {
    ipcRenderer.send("select-dir", { target });
  }

  return (
    <React.Fragment>
      <Head>
        <title>File Transfer</title>
      </Head>

      <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="center"
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

        <Paper className={classes.paper}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{ width: "100%" }}
            >
              <Button
                variant="outlined"
                style={{ marginRight: 16 }}
                onClick={() => {
                  openDir("source");
                }}
              >
                Source
              </Button>

              <Breadcrumbs>
                {sourceDir == null ? (
                  <Typography color="textPrimary">select source dir</Typography>
                ) : (
                  sourceDir.split("\\").map((v, i) => (
                    <Typography key={i} color="textPrimary">
                      {v}
                    </Typography>
                  ))
                )}
              </Breadcrumbs>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              style={{ marginTop: 16, width: "100%" }}
            >
              <Button variant="outlined" style={{ marginRight: 16 }}>
                Uploaded
              </Button>
              <Breadcrumbs>
                {uploadDir == null ? (
                  <Typography color="textPrimary">select source dir</Typography>
                ) : (
                  uploadDir.split("\\").map((v, i) => (
                    <Typography key={i} color="textPrimary">
                      {v}
                    </Typography>
                  ))
                )}
              </Breadcrumbs>
            </Box>

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 16 }}
            >
              <TextField
                id="outlined-basic"
                label="port"
                value={port}
                style={{ width: 100 }}
                variant="outlined"
                type="number"
                size="small"
                onChange={(event) => {
                  setPort(event.target.value);
                }}
              />
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Fab
                variant="extended"
                className={
                  isServerCreated ? classes.endButton : classes.startButton
                }
                onClick={() => {
                  ipcRenderer.send(
                    isServerCreated ? "stop-server" : "start-server",
                    { port, sourceDir, uploadDir }
                  );
                }}
              >
                <CastIcon style={{ marginRight: 12 }} />
                {isServerCreated ? "Stop" : "Start"}
              </Fab>
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Typography color="textPrimary" variant="h6" component="h6">
                {isServerCreated ? serverMessage : ""}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Home;
