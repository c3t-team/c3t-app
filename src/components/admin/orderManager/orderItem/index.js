import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
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
    },
    width: "100%"
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  detail: {
    "&:hover": {
      cursor: "pointer",
      color: "red"
    }
  }
}));

function OrderItem(props) {
  const classes = useStyles();
  const order = props.order;
  return (
   ( props.status == "ALL" || props.status== order.status) && (
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {props.index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{order.name}</StyledTableCell>
        <StyledTableCell align="center">{order.shipAddress}</StyledTableCell>
        <StyledTableCell align="center">{order.phone}</StyledTableCell>
        <StyledTableCell align="center">{ new Date(order.updatedAt).toDateString("yyyy-MM-dd")}</StyledTableCell>
        <StyledTableCell align="center" className={classes.detail}>
          {/* <Link to="/admin/orderDetail">Chi tiết</Link> */}
          <Link to={{
            pathname:`/admin/order-detail/${order._id}`
          }}>Chi tiết</Link>
        </StyledTableCell>
        <StyledTableCell align="center">{order.status}</StyledTableCell>
      </StyledTableRow>
    )
  );
}
export default OrderItem;
