import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import fileType from "../helpers/fileType";
import languageCode from "../helpers/languageCode";

import GetAppIcon from "@material-ui/icons/GetApp";
import CancelIcon from "@material-ui/icons/Cancel";

import { getApiText, apiPath } from "~/api/Api";

import Style from "./Style";

export default function Content(props) {
  const classes = Style();

  const [textFile, setTextFile] = useState("");

  async function getText(file) {
    const t = await getApiText(window.location.origin).get(
      `/file${file.path.substring(props.sourceDir.length)}`
    );

    setTextFile(t.request.responseText);
  }

  function download(file) {
    window.open(
      window.location.origin +
        apiPath +
        "/download" +
        file.path.substring(props.sourceDir.length)
    );
  }

  function DownloadUI(file, child) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" className={classes.header}>
          <Box>
            <Button
              startIcon={<GetAppIcon />}
              color="primary"
              variant="contained"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                download(file);
              }}
            >
              Download
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              className={classes.close}
              endIcon={<CancelIcon />}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                props.close();
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
        {child}
      </Box>
    );
  }

  function renderContent(file) {
    if (!file) return null;

    const fileUrl =
      window.location.origin +
      apiPath +
      "/file" +
      file.path.substring(props.sourceDir.length);

    switch (fileType(file.extension.substring(1).toLowerCase())) {
      case "image":
        const ic = (
          <Box display="flex" justifyContent="center">
            <img
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              style={{ maxHeight: "80%", maxWidth: "80%" }}
              src={fileUrl}
            />
          </Box>
        );
        return DownloadUI(file, ic);
      case "video":
        const vc = (
          <Box
            display="flex"
            justifyContent="center"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <video
              src={fileUrl}
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              controls
            />
          </Box>
        );
        return DownloadUI(file, vc);

      case "text":
        getText(file);
        const tc = (
          <Box
            display="flex"
            justifyContent="center"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            style={{
              maxHeight: "85vh",
              maxWidth: "95vw",
              overflow: "auto",
            }}
          >
            <SyntaxHighlighter
              language={languageCode(file.extension.substring(1))}
              style={tomorrowNight}
              showLineNumbers
              wrapLongLines
              customStyle={{
                minHeight: "80vh",
                minWidth: "60vw",
              }}
            >
              {textFile}
            </SyntaxHighlighter>
          </Box>
        );
        return DownloadUI(file, tc);

      default: {
        download(file);
        props.close();
        return null;
      }
    }
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      {renderContent(props.file)}
    </Box>
  );
}
