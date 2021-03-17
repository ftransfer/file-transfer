import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import LinearProgress from "@material-ui/core/LinearProgress";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HomeIcon from "@material-ui/icons/Home";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import ErrorIcon from "@material-ui/icons/Error";
import ClearAllIcon from "@material-ui/icons/ClearAll";

import FileIcon from "~/components/FileIcon";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

import { getApiUpload } from "~/api/Api";

import Style from "./Style";

export default function FileDrop(props) {
  const classes = Style();
  const [paths, setPaths] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setPaths(props.pathFile.cutPath.split("\\"));
  }, [props.pathFile]);

  useEffect(() => {
    if (!uploading && files.length > 0) {
      const fIndex = files.findIndex((f) => !f.isDone && !f.isError);

      if (fIndex >= 0 && files.length >= fIndex) {
        setUploading({
          id: files[fIndex].id,
          file: files[fIndex].file,
        });
      }
    }
  }, [files]);

  useEffect(() => {
    upload();
  }, [uploading]);

  function upload() {
    if (!uploading) return;
    setFiles((oldFiles) => {
      if (!oldFiles) return oldFiles;

      const uIndex = oldFiles.findIndex((v) => v.id == uploading.id);

      if (uIndex < 0 || oldFiles.length <= uIndex) return [...oldFiles];

      const cFile = oldFiles[uIndex];

      if (cFile.isDone || cFile.isError) return oldFiles;

      cFile.uploading = true;
      cFile.isDone = false;
      cFile.isError = false;
      oldFiles[uIndex] = cFile;
      setUploadProgress(0);
      return [...oldFiles];
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setUploadProgress(percent);
      },
    };

    const imageToUpload = new FormData();
    imageToUpload.append("file", uploading.file);

    getApiUpload(window.location.origin)
      .post(paths.join("/"), imageToUpload, options)
      .then((res, err) => {
        setFiles((oldFiles) => {
          const uIndex = oldFiles.findIndex((v) => v.id == uploading.id);

          if (uIndex < 0 || oldFiles.length <= uIndex) return oldFiles;

          const cFile = oldFiles[uIndex];
          cFile.uploading = false;
          cFile.isDone = err ? false : true;
          cFile.isError = err ? true : false;

          oldFiles[uIndex] = cFile;

          const nIndex = uIndex + 1;

          if (oldFiles.length <= nIndex) {
            setUploading(null);
            return [...oldFiles];
          }

          const nFile = oldFiles[nIndex];
          nFile.uploading = true;
          oldFiles[nIndex] = nFile;

          setUploading({
            id: nFile.id,
            file: nFile.file,
          });

          return [...oldFiles];
        });
      });
  }

  function getFileExt(filename) {
    return filename.substring(0, 1) === "."
      ? "file"
      : filename.split(".").slice(1).pop() || "file";
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const mFile = acceptedFiles.map((f) => {
        const ext = getFileExt(f.name);
        return {
          uploading: false,
          id: f.name + new Date().getTime(),
          paths,
          file: f,
          ext,
          isDone: false,
          isError: false,
        };
      });
      setFiles((oldFiles) => {
        return [...oldFiles, ...mFile];
      });
    },
  });

  function removeFile(id) {
    setFiles((oldFiles) => {
      const index = oldFiles.findIndex((v) => v.id == id);
      oldFiles.splice(index, 1);
      return [...oldFiles];
    });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <div {...getRootProps()} className={classes.drop}>
        <input {...getInputProps()} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <CloudUploadIcon style={{ fontSize: 36 }} />
          </Box>
          <Box>
            {isDragActive ? (
              <Typography variant="h4">Drop Here to Upload</Typography>
            ) : (
              <Typography variant="h6">
                Drop or Select Files Here to Upload
              </Typography>
            )}
          </Box>
        </Box>
      </div>
      <Box className={classes.files}>
        {files.map((f) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box display="flex" className={classes.accordinSummary}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    className={classes.fileSummaryTitle}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                    >
                      <FileIcon ext={f.ext} className={classes.fileIcon} />
                      <Typography variant="body1">{f.file.name}</Typography>
                    </Box>
                    {f.isDone || f.isError ? null : (
                      <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>
                          <LinearProgress
                            variant={
                              f.uploading ? "determinate" : "indeterminate"
                            }
                            value={uploadProgress}
                          />
                        </Box>
                        <Box className={classes.textPercent}>
                          {uploadProgress + "%"}
                        </Box>
                      </Box>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    {f.isDone ? (
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeFile(f.id);
                        }}
                      >
                        <CheckCircleIcon color="secondary" />
                      </IconButton>
                    ) : null}
                    {f.isError ? (
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                      >
                        <ErrorIcon className={classes.removeButton} />
                      </IconButton>
                    ) : null}
                    {!f.isDone ? (
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          removeFile(f.id);
                        }}
                      >
                        <CancelIcon className={classes.removeButton} />
                      </IconButton>
                    ) : null}
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Breadcrumbs>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <HomeIcon fontSize="small" />
                  </Box>
                  {f.paths.map((v) => {
                    if (v.length > 0)
                      return <Typography variant="body1">{v}</Typography>;
                    return null;
                  })}
                </Breadcrumbs>
              </AccordionDetails>
            </Accordion>
          );
        })}
        {files.length > 0 && !uploading ? (
          <Box display="flex" justifyContent="flex-end">
            <Button startIcon={<ClearAllIcon />} onClick={() => setFiles([])}>
              Clear All
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
