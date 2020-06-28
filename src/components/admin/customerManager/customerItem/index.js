import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Redirect, Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

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

function CustomerItem(props) {
  const classes = useStyles();
  const { customer } = props;

  const deleteCustomer = () => {
    props.deleteCustomer(customer._id);
  };

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {props.index + 1}
      </StyledTableCell>
      <StyledTableCell align="center">{customer.name}</StyledTableCell>
      <StyledTableCell align="center">{customer.address}</StyledTableCell>
      <StyledTableCell align="center">{customer.phone}</StyledTableCell>
      <StyledTableCell align="center" className={classes.detail}>
        <Link  to = {{
          pathname:`/admin/customers/${props.customer._id}`,
          aboutProps:{
            customer: props.customer
          }
        }} className={classes.detail}>
          {" "}
          chi tiết
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <DeleteIcon
          className={classes.icon}
          onClick={deleteCustomer}
        ></DeleteIcon>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default CustomerItem;
