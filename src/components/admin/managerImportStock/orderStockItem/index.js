import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "./style.css";

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
  icon: {
    color: "#D9A128",
    marginRight: "5px",
    "&:hover": {
      color: "#f75f00",
      cursor: "pointer"
    }
  }
}));

function OrderStockItem(props) {
  const classes = useStyles();
  const order = props.order;
  console.log("status", props.status);
  console.log("status ỏder", order.status);

  const showDetailOrder = () => {
    // console.log("AAAA", order)
    // props.getDetailOrderSuplier(order);
  };

  const deleteOrderSuplier = () => {
    props.deleteOrderSuplier(order._id);
  };
  return (
    (props.status == "ALL" || props.status == order.status) && (
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          {props.index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{order.suplierId.name}</StyledTableCell>

        <StyledTableCell align="center">
          {order.suplierId.phone}
        </StyledTableCell>
        <StyledTableCell align="center">{order.totalPrice}</StyledTableCell>
        <StyledTableCell align="center">{order.employee.name}</StyledTableCell>
        <StyledTableCell align="center">{order.status}</StyledTableCell>
        <StyledTableCell align="center">
          <Link
            to={{
              pathname: `/admin/stock-orders/${order._id}`
            }}
            className={classes.icon}
          >
          <VisibilityIcon onClick={showDetailOrder}></VisibilityIcon>
          </Link>
          <DeleteIcon
            className={classes.icon}
            onClick={deleteOrderSuplier}
          ></DeleteIcon>{" "}
          {/* <EditIcon className={classes.icon}></EditIcon> */}
        </StyledTableCell>
      </StyledTableRow>
    )
  );
}
export default OrderStockItem;
