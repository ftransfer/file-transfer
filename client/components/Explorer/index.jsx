import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ExplorerHeader from "~/components/ExplorerHeader";
import FileDrop from "~/components/FileDrop";
import ExplorerBody from "~/components/ExplorerBody";
import { getApi } from "~/api/Api";

export default function Explorer(props) {
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    getFiles();
  }, [props.pathFile]);

  async function getFiles() {
    const f = await getApi(window.location.origin).get(
      `/files${props.pathFile.cutPath}`
    );
    f.data.sort(
      (a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
    );
    setFiles(f.data);
  }

  return (
    <Box display="flex" flexDirection="column">
      <ExplorerHeader {...props} getFiles={getFiles} />
      <Divider />
      <FileDrop {...props} getFiles={getFiles} />
      <ExplorerBody files={files} {...props} />
    </Box>
  );
}
