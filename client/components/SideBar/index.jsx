import { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Collapse from "@material-ui/core/Collapse";

import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderIcon from "@material-ui/icons/Folder";

import { getApi } from "~/api/Api";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  subHeader: { marginTop: theme.spacing(1) },
  nested: {
    paddingLeft: theme.spacing(3),
  },
  arrow: {},
  icon: {
    minWidth: 0,
    marginRight: theme.spacing(2),
  },
}));

function ItemWithChild({ child, changePath, fullPath }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <ListItem
        button
        onClick={() => {
          changePath(child.path);
        }}
      >
        <ListItemIcon className={classes.icon}>
          <FolderIcon style={{ color: "#ffb74d" }} />
        </ListItemIcon>
        <ListItemText primary={child.name} />
        <ListItemSecondaryAction>
          <IconButton
            size="small"
            className={classes.arrow}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense className={classes.nested}>
          <DirTree
            dirTree={child.children}
            changePath={changePath}
            fullPath={fullPath.concat(child.name)}
          />
        </List>
      </Collapse>
    </Fragment>
  );
}

function Item({ child, changePath, fullPath }) {
  const classes = useStyles();

  if (child.children.length > 0) {
    return (
      <ItemWithChild
        child={child}
        changePath={changePath}
        fullPath={fullPath}
      />
    );
  }
  return (
    <ListItem
      button
      key={child.name}
      onClick={() => {
        changePath(child.path);
      }}
    >
      <ListItemIcon className={classes.icon}>
        <FolderIcon style={{ color: "#ffb74d" }} />
      </ListItemIcon>
      <ListItemText primary={child.name} />
    </ListItem>
  );
}

function DirTree({ dirTree, changePath, fullPath }) {
  const classes = useStyles();

  if (!dirTree || dirTree.length < 1) return null;

  return (
    <Fragment>
      {dirTree.map((v) => (
        <Item
          key={v.name}
          child={v}
          changePath={changePath}
          fullPath={fullPath}
        />
      ))}
    </Fragment>
  );
}

export default function SideBar(props) {
  const classes = useStyles();

  const [dirTree, setDirTree] = useState(null);

  useEffect(async () => {
    const a = await getApi(window.location.origin).get();
    setDirTree(a.data);
  }, []);

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      dense
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography variant="h6" className={classes.subHeader}>
            Shared Folders
          </Typography>
        </ListSubheader>
      }
    >
      {dirTree ? (
        <DirTree
          dirTree={dirTree.children ? dirTree.children : null}
          {...props}
          fullPath={[]}
        />
      ) : null}
    </List>
  );
}
