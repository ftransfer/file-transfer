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

import { ipcRenderer } from "electron";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  })
);

const Home = () => {
  const classes = useStyles({});
  const [open, setOpen] = React.useState(false);
  const [isServerCreated, setServerCreated] = React.useState(false);
  const [serverMessage, setServerMessage] = React.useState("");

  useEffect(() => {
    ipcRenderer.on("server-created", (event, arg) => {
      setServerCreated(true);
      setServerMessage(arg);
    });
  });

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-javascript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <button
          onClick={() => {
            ipcRenderer.send("start-server");
          }}
        >
          lalala
        </button>
        <br />
        <span>{isServerCreated ? serverMessage : "server not running"}</span>
      </div>
    </React.Fragment>
  );
};

export default Home;
