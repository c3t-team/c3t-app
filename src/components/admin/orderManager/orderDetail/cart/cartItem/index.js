import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import "./style.css";
import { connect } from "react-redux";

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FAFAFA",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

function CartItemAdmin(props) {
  const productOrder = props.productOrder;
  return (
    <StyledTableRow>
      <StyledTableCell align="center">{productOrder.productId.nameShow || productOrder.productId.name}</StyledTableCell>
      <StyledTableCell align="center">{productOrder.color}</StyledTableCell>
      <StyledTableCell align="center">{productOrder.size}</StyledTableCell>
      <StyledTableCell align="center">{productOrder.price}</StyledTableCell>
      <StyledTableCell align="center">
        <label>{productOrder.inventory}</label>
      </StyledTableCell>
      <StyledTableCell align="center">{((parseInt(productOrder.inventory) * parseInt(productOrder.price))||0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</StyledTableCell>
      <StyledTableCell align="center"></StyledTableCell>
    </StyledTableRow>
  );
}


const dispatchMapToProps = (dispatch, props) => {
  return {};
};
export default connect(null, dispatchMapToProps)(CartItemAdmin);
