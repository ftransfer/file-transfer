import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ExplorerHeader from "~/components/ExplorerHeader";
import ExplorerBody from "~/components/ExplorerBody";

export default function Explorer(porps) {
  return (
    <Box display="flex" flexDirection="column">
      <ExplorerHeader />
      <Divider />
      <ExplorerBody {...porps} />
    </Box>
  );
}
