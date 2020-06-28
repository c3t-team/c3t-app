import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  detail: { "&:hover": { color: "#f75f00", cursor: "pointer" } },
  icon: {
    color: "#D9A128",
    marginRight: "10px",
    "&:hover": {
      color: "#f75f00",
      cursor: "pointer"
    }
  }
}));

function ProductItem(props) {
  const classes = useStyles();

  const deleteProduct = () => {
    props.deleteProduct(props.product._id);
  };

  const editProduct = () => {
    props.editProduct(props.product);
  };

  const getProduct = () => {
    props.getProduct(props.product);
  };
  console.log("1qaz", props.product);
  let inventory = 0;
  if (props.product.detail.length > 0) {
    props.product.detail.map((detail, index) => {
      inventory += parseInt(detail.inventory);
    });
  }

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {props.index + 1}
      </StyledTableCell>
      <StyledTableCell align="center">
        {props.product.name ? props.product.name : ""}
      </StyledTableCell>
      {props.product.categories != null && (
        <StyledTableCell align="center">
          {" "}
          {props.product.categories.parent.name} >{" "}
          {props.product.categories.name}
        </StyledTableCell>
      )}
      {props.product.categories == null && (
        <StyledTableCell align="center"> update category</StyledTableCell>
      )}
      <StyledTableCell align="center">{inventory}</StyledTableCell>
      <StyledTableCell align="center">
        {props.product.status ? "Đang hoạt động" : "Tạm ngưng"}
      </StyledTableCell>

      <StyledTableCell align="center">
        {/* <Link
          className={classes.icon}
          to={{
            pathname: `/admin/products/${props.product._id}`,
          }}
        >
          <VisibilityIcon />
        </Link> */}
        <EditIcon className={classes.icon} onClick={editProduct}></EditIcon>
        <DeleteIcon
          className={classes.icon}
          style={{ marginRight: "10px" }}
          onClick={deleteProduct}
        ></DeleteIcon>
      </StyledTableCell>
    </StyledTableRow>
  );
}
export default ProductItem;
