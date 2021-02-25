import React, { useEffect } from "react";
import Head from "next/head";
import { makeStyles, createStyles, formatMs } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Link from "../components/Link";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import { ipcRenderer } from "electron";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import CastIcon from "@material-ui/icons/Cast";
import { log } from "electron-log";

const useStyles = makeStyles((theme) =>
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
      width: "100%",
    },
    startButton: {
      background: theme.palette.primary.main,
      color: "#fff",
    },
    endButton: {
      background: theme.palette.error.main,
      color: "#fff",
    },
  })
);

const Home = () => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const [isServerCreated, setServerCreated] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");
  const [port, setPort] = React.useState(3000);

  useEffect(() => {
    ipcRenderer.on("server-created", (event, arg) => {
      setServerCreated(true);
      setServerMessage(arg);
    });
    ipcRenderer.on("server-stoped", (event, arg) => {
      setServerCreated(false);
    });
  });

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
              <Button variant="outlined" style={{ marginRight: 16 }}>
                Source
              </Button>
              <Breadcrumbs>
                <Typography color="textPrimary">Breadcrumb</Typography>
                <Typography color="textPrimary">Breadcrumb</Typography>
                <Typography color="textPrimary">Breadcrumb</Typography>
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
                <Typography color="textPrimary">Breadcrumb</Typography>
                <Typography color="textPrimary">Breadcrumb</Typography>
                <Typography color="textPrimary">Breadcrumb</Typography>
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
                    { port }
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
