import { useState } from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Backdrop from "@material-ui/core/Backdrop";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import dayjs from "dayjs";
import prettyBytes from "pretty-bytes";

import FileIcon from "~/components/FileIcon";
import Contents from "~/components/contents";

import DescriptionIcon from "@material-ui/icons/Description";

import Style from "./Style";

import ContextMenu from "./ContextMenu";

export default function ExplorerBody(props) {
  const classes = Style();
  const [showFile, setShowFile] = useState(false);
  const [file, setFile] = useState(null);
  const [fileContext, setFileContext] = useState(null);
  const [anchorContext, setAnchorContext] = useState(null);

  const openFileContext = (event) => {
    setAnchorContext({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };

  const closeFileContext = () => {
    setAnchorContext(null);
  };

  function onRowClick(row) {
    if (row.type == "directory") {
      props.changePath(row.path);
    } else {
      setFile({ ...row });
      openFile();
    }
  }

  function openFile() {
    setShowFile(true);
  }

  function closeDialog() {
    setShowFile(false);
  }

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <TableContainer component={Paper} className={classes.content}>
        <Table className={classes.table} aria-label="Files" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Name</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Modified</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Type</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="h6">Size</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.files.map((row) => (
              <TableRow
                hover
                key={row.name}
                onClick={() => onRowClick(row)}
                onContextMenu={(event) => {
                  setFileContext(row);
                  event.preventDefault();
                  event.stopPropagation();
                  openFileContext(event);
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography className={classes.fileName} variant="body1">
                    <FileIcon
                      ext={
                        row.extension ? row.extension.substring(1) : row.type
                      }
                      className={classes.icon}
                    />
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {dayjs(row.modified).format("MMM, DD YYYY hh:ss")}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {row.extension ? row.extension.substring(1) : row.type}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">
                    {row.size ? prettyBytes(Number(row.size)) : ""}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="simple-menu"
        anchorReference="anchorPosition"
        anchorPosition={
          anchorContext
            ? anchorContext.mouseY !== null && anchorContext.mouseX !== null
              ? { top: anchorContext.mouseY, left: anchorContext.mouseX }
              : undefined
            : undefined
        }
        keepMounted
        open={Boolean(anchorContext)}
        onClose={closeFileContext}
      >
        <ContextMenu
          closeFileContext={closeFileContext}
          file={fileContext}
          showFile={onRowClick}
          {...props}
        />
      </Menu>
      <Backdrop
        onClick={closeDialog}
        open={showFile}
        className={classes.backDrop}
      >
        {showFile ? (
          <Contents
            sourceDir={props.sourceDir}
            file={file}
            close={closeDialog}
          />
        ) : null}
      </Backdrop>
    </Box>
  );
}
