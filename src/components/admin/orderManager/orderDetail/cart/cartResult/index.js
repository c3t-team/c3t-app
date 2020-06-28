import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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

function CartResultAdmin(props) {
  return (
    <StyledTableRow>
      <StyledTableCell colSpan={3}></StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ fontSize: "20px", fontWeight: "600" }}
      >
        Tổng tiền
      </StyledTableCell>
      <StyledTableCell
        align="center"
        style={{ fontSize: "20px", fontWeight: "600" }}
      >
        {props.totalPrice}
      </StyledTableCell>
      <StyledTableCell align="center"></StyledTableCell>
    </StyledTableRow>
  );
}

const stateMapToProps = (state, props) => {
  return {};
};

const dispatchMapToProps = (dispatch, props) => {
  return {};
};

export default connect(stateMapToProps, dispatchMapToProps)(CartResultAdmin);
