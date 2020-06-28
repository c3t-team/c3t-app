import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#43ab92",
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
    color: "#512C62",
    "&:hover": {
      color: "#f75f00",
      cursor: "pointer"
    }
  }
}));
function Item(props) {
  const classes = useStyles();

  const deleteProductSuplier = () => {
    console.log("check", props.id + "-" + props.product._id);
    props.deleteProductSuplier(props.id, props.product._id);
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="center">{props.index + 1}</StyledTableCell>
      <StyledTableCell align="center">{props.product.name}</StyledTableCell>
      <StyledTableCell align="center">
        <DeleteIcon
          className={classes.icon}
          onClick={deleteProductSuplier}
        ></DeleteIcon>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default Item;
