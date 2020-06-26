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

function EmployeeItem(props) {
  const classes = useStyles();
  const employee = props.employee;

  return (
    (props.role == "ALL" || props.role == employee.role) && (
      <StyledTableRow>
        <StyledTableCell component="th" scope="row">
          1122435123{" "}
        </StyledTableCell>
        <StyledTableCell align="center">{employee.name}</StyledTableCell>
        <StyledTableCell align="center">{employee.address}</StyledTableCell>
        <StyledTableCell align="center">{employee.phone}</StyledTableCell>
        <StyledTableCell align="center">
          <Link
            to={{
              pathname: `/admin/employees/${employee._id}`
            }}
            className={classes.detail}
          >
            chi tiết
          </Link>
        </StyledTableCell>
        <StyledTableCell align="center">{employee.role}</StyledTableCell>
        <StyledTableCell align="center">hoạt động</StyledTableCell>
        <StyledTableCell align="center">
          <DeleteIcon className={classes.icon}></DeleteIcon>
        </StyledTableCell>
      </StyledTableRow>
    )
  );
}
export default EmployeeItem;
