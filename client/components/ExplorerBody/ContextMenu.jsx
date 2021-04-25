import { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";

import fileType from "../helpers/fileType";
import { apiPath } from "~/api/Api";
export default function ContextMenu(props) {
  const { file } = props;
  function openDir() {
    props.closeFileContext();
    props.changePath(file?.path);
  }

  function download() {
    props.closeFileContext();
    window.open(
      window.location.origin +
        apiPath +
        "/download" +
        file.path.substring(props.sourceDir.length)
    );
  }

  function canShowFile() {
    if (file?.type == "directory") return false;

    switch (fileType(file?.extension.substring(1).toLowerCase())) {
      case "image":
      case "video":
      case "text":
        return true;
      default:
        return false;
    }
  }

  function showFile() {
    props.closeFileContext();
    props.showFile(file);
  }

  return (
    <Fragment>
      {file?.type == "directory" ? (
        <MenuItem onClick={openDir}>Open</MenuItem>
      ) : null}

      {canShowFile() ? <MenuItem onClick={showFile}>Show</MenuItem> : null}

      {file?.type != "directory" ? (
        <MenuItem onClick={download}>Download</MenuItem>
      ) : null}
      <MenuItem onClick={props.closeFileContext}>Rename</MenuItem>
      <MenuItem onClick={props.closeFileContext}>Delete</MenuItem>
    </Fragment>
  );
}
