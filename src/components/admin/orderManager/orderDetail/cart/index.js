import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { createBrowserHistory } from "history";
import "./style.css";
import CartResultAdmin from "./cartResult";
import CartItemAdmin from "./cartItem";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FAFAFA",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "80px",
    overflowX: "auto"
  },
  table: {
    minWidth: 700,
    marginTop: "20px"
  }
}));

function CartAdmin(props) {
  const classes = useStyles();
  console.log("lala", props.productOrders);
  const renderProductItem = () => {
    let result = [];
    const productOrders = props.productOrders;
    if (productOrders && productOrders.length > 0) {
      result = productOrders.map((productOrder, index) => {
        return (
          <CartItemAdmin
            productOrder={productOrder}
            key={index}
            index={index}
          />
        );
      });
    }
    return result;
  };
  return (
    <>
      <h6>DANH SÁCH SẢN PHẨM</h6>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">SẢN PHẨM</StyledTableCell>
            <StyledTableCell align="center">MÀU</StyledTableCell>
            <StyledTableCell align="center">SIZE</StyledTableCell>
            <StyledTableCell align="center">GÍA</StyledTableCell>
            <StyledTableCell align="center">SỐ LƯỢNG</StyledTableCell>
            <StyledTableCell align="center">TỔNG CỘNG</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderProductItem()}
          <CartResultAdmin
            totalPrice={parseInt(props.totalPrice)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          />
        </TableBody>
      </Table>
    </>
  );
}

export default CartAdmin;
