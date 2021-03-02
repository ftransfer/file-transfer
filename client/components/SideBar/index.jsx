import React from "react";
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

import Link from "next/link";

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

function ItemWithChild({ child }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemIcon className={classes.icon}>
          <FolderIcon />
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
        <List component="div" disablePadding className={classes.nested}>
          {child.children.map((child) => {
            return <DirTree dirTree={child} key={child.name} />;
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
}

function Item({ child }) {
  const classes = useStyles();

  if (child.children && child.children.length > 0) {
    return <ItemWithChild child={child} />;
  }
  return (
    <Link href="/post/abc" shallow>
      <ListItem button key={child.name}>
        <ListItemIcon className={classes.icon}>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={child.name} />
      </ListItem>
    </Link>
  );
}

function DirTree({ dirTree }) {
  const classes = useStyles();

  if (dirTree.children && dirTree.children.length > 0)
    return (
      <React.Fragment>
        {dirTree.children.map((child, i) => {
          return <Item child={child} key={child.name} />;
        })}
      </React.Fragment>
    );
  return (
    <Link href="/post/abc">
      <ListItem button key={dirTree.name}>
        <ListItemIcon className={classes.icon}>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={dirTree.name} />
      </ListItem>
    </Link>
  );
}

export default function SideBar(props) {
  const classes = useStyles();

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
      <DirTree dirTree={props.dirTree} />
    </List>
  );
}
