import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import "./style.css";
import { atcTotalPrice, atcAddToCart } from "../../../../actions";
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

function CartItem(props) {
  const useStyles = makeStyles(theme => ({
    button: {
      backgroundColor: "#ff0000",
      color: "#ffffff"
    }
  }));
  const [productOrder, setProductOrder] = useState(props.productOrder);
  const [quantity, setQuanlity] = useState(
    parseInt(props.productOrder.quantity)
  );
  const [totalPrice, setTotalPrice] = useState(
    parseInt(props.productOrder.price) * parseInt(props.productOrder.quantity)
  );
  const addQuanlityProduct = count => {
    const temp = parseInt(quantity + count);
    var total = localStorage.getItem("total")
      ? parseInt(localStorage.getItem("total"))
      : 0;
    if (count < 0) {
      if (quantity > 1) {
        setQuanlity(temp);
        props.calculateTotalPrice(-parseInt(productOrder.price));
        props.addToCart(-1);
        total -= parseInt(productOrder.price);
      }
    } else {
      setQuanlity(temp);
      props.calculateTotalPrice(parseInt(productOrder.price));
      total += parseInt(productOrder.price);
      props.addToCart(1);
    }
    if (temp > 0) {
      let productOrders = JSON.parse(localStorage.getItem("ProductOrders"));
      if (productOrders && productOrders.length > 0) {
        productOrders[props.index].quantity = temp;
        localStorage.setItem("ProductOrders", JSON.stringify(productOrders));
      }
      setTotalPrice(parseInt(productOrder.price) * parseInt(temp));
      localStorage.setItem("total", total);
    }
  };

  const removeProductOrder = () => {
    let productOrders = JSON.parse(localStorage.getItem("ProductOrders"));
    if (productOrders && productOrders.length > 0) {
      const price =
        parseInt(productOrders[props.index].price) *
        parseInt(productOrders[props.index].quantity);
      const total = parseInt(localStorage.getItem("total")) - price;
      props.calculateTotalPrice(-price);
      props.addToCart(-parseInt(productOrders[props.index].quantity));

      localStorage.setItem("total", total);
      productOrders.splice(props.index, 1);
      localStorage.setItem("ProductOrders", JSON.stringify(productOrders));
      props.remove();
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row" align="center">
        <img
          alt=""
          src={
            productOrder.img != ""
              ? `http://localhost:1337/images/temp/${productOrder.img}`
              : "http://localhost:1337/images/temp/1389854-1575513112475.jpg"
          }
          className="img-fluid z-depth-0 img-product"
        />
      </StyledTableCell>
      <StyledTableCell align="center">{productOrder.name}</StyledTableCell>
      <StyledTableCell align="center">
        {parseInt(productOrder.price)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </StyledTableCell>
      <StyledTableCell align="center">{productOrder.color}</StyledTableCell>
      <StyledTableCell align="center">{productOrder.size}</StyledTableCell>
      <StyledTableCell align="center">
        <label>{quantity}</label>
        {!props.buy && (
          <>
            <AddIcon
              onClick={() => addQuanlityProduct(1)}
              className="amount"
              style={{
                color: "#fff",
                fontSize: "20px",
                backgroundColor: "#c93838",
                marginLeft: "5px",
                borderBottomLeftRadius: "5px",
                borderTopLeftRadius: "5px"
              }}
            />
            <RemoveIcon
              onClick={() => addQuanlityProduct(-1)}
              className="amount"
              style={{
                color: "#fff",
                fontSize: "20px",
                backgroundColor: "#c93838",
                borderBottomRightRadius: "5px",
                borderTopRightRadius: "5px"
              }}
            />
          </>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {parseInt(totalPrice)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </StyledTableCell>
      <StyledTableCell align="center">
        {!props.buy && (
          <DeleteIcon className="icon-delete" onClick={removeProductOrder} />
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}

// DeleteProductInCart = (product) => {
//     // console.log('kkk', product);

//     // this.props.DeleteProductInCart(product);
//     // this.props.onChangeMessage(Msg.MSG_DELETE_PRODUCT_IN_CART_SUCCESS);

// }
// UpdateProduct = (product, quality) => {
//     // if (quality > 0) {
//     //     this.props.UpDateProductInCart(product, quality);
//     //     this.props.onChangeMessage(Msg.MSG_UPDATE_CART_SUCCESS);
//     // }

// }

const dispatchMapToProps = (dispatch, props) => {
  return {
    calculateTotalPrice: price => {
      dispatch(atcTotalPrice(price));
    },
    addToCart: count => {
      dispatch(atcAddToCart(count));
    }
  };
};
export default connect(null, dispatchMapToProps)(CartItem);
