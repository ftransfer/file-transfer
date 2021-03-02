import { Fragment } from "react";
import AppBar from "~/components/AppBar";
import SideBar from "~/components/SideBar";
import Explorer from "~/components/Explorer";
import { Resize, ResizeVertical, ResizeHorizon } from "react-resize-layout";
import Style from "./MainLayoutStyle";

import Box from "@material-ui/core/Box";

function Mainlayout(props) {
  const classes = Style();
  return (
    <Fragment>
      <AppBar />
      <div>
        <Resize handleWidth="3px" handleColor="#777">
          <ResizeHorizon minWidth="250px" width="250px" overflow="auto">
            <Box className={classes.toolbar} />
            <SideBar dirTree={props.dirTree} />
          </ResizeHorizon>
          <ResizeHorizon minWidth="250px" overflow="auto">
            <Box className={classes.toolbar} />
            <Explorer files={props.files} />
          </ResizeHorizon>
        </Resize>
      </div>
    </Fragment>
  );
}

export default Mainlayout;
