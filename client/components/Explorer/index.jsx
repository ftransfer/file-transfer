import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ExplorerHeader from "~/components/ExplorerHeader";
import ExplorerBody from "~/components/ExplorerBody";
import { getApi } from "~/api/Api";

export default function Explorer(props) {
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    const f = await getApi(window.location.origin).get(
      `/files${props.pathFile}`
    );
    setFiles(f.data);
  }, [props.pathFile]);

  return (
    <Box display="flex" flexDirection="column">
      <ExplorerHeader {...props} />
      <Divider />
      <ExplorerBody files={files} {...props} />
    </Box>
  );
}
