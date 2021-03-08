import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";

import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import fileType from "../helpers/fileType";
import languageCode from "../helpers/languageCode";

import { getApiText, apiPath } from "~/api/Api";

import Style from "./Style";

export default function Content(props) {
  const classes = Style();

  const [textFile, setTextFile] = useState("");

  async function getText(file) {
    const t = await getApiText(window.location.origin).get(
      `/file${file.path.substring(props.sourceDir.length)}`
    );
    console.log(t);
    setTextFile(t.request.responseText);
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
        return (
          <img
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            style={{ maxHeight: "100%", maxWidth: "100%" }}
            src={fileUrl}
          />
        );
      case "video":
        return (
          <Box
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
      case "text":
        getText(file);
        return (
          <Box
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            style={{
              maxHeight: "90vh",
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
      default:
        return <Box>Video</Box>;
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
