import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import DescriptionIcon from "@material-ui/icons/Description";

import Style from "./Style";

function createData(name, date, type, size) {
  return { name, date, type, size };
}

export default function ExplorerBody(props) {
  const classes = Style();
  const rows = props.files.map((v) =>
    createData(v, "Mar, 12 2016 16:00", "Folder", " ")
  );
  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <Typography variant="h5">Files</Typography>
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
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography className={classes.fileName} variant="body1">
                    <DescriptionIcon />
                    {row.name}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">{row.date}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">{row.type}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="body2">{row.size} </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
