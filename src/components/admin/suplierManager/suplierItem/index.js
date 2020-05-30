import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  detail: {
    color: "#512C62",
    "&:hover": { color: "#f75f00", cursor: "pointer" }
  },
  icon: {
    color: "#D9A128",
    "&:hover": {
      color: "#f75f00",
      cursor: "pointer"
    }
  }
}));

function SuplierItem(props) {
  const classes = useStyles();

  const deleteSuplier = () => {
    props.deleteSuplier(props.suplier._id);
  };
  const getSuplier = () => {
    props.getSuplier(props.suplier);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{props.index + 1}</StyledTableCell>
      <StyledTableCell align="center">{props.suplier.name}</StyledTableCell>
      <StyledTableCell align="center">{props.suplier.address}</StyledTableCell>
      <StyledTableCell align="center">{props.suplier.phone}</StyledTableCell>
      <StyledTableCell align="center">{props.suplier.email}</StyledTableCell>
      <StyledTableCell align="center">
        <Link
          to="/admin/suplierDetail"
          className={classes.detail}
          onClick={getSuplier}
        >
          {" "}
          chi tiết
        </Link>
      </StyledTableCell>

      <StyledTableCell align="center">
        <DeleteIcon
          className={classes.icon}
          onClick={deleteSuplier}
        ></DeleteIcon>
      </StyledTableCell>
    </StyledTableRow>
  );
}
export default SuplierItem;
