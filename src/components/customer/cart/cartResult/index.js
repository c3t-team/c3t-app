import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";
import TableCell from "@material-ui/core/TableCell";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  atcTotalPrice,
  // atcGetCurentUserRequest,
  atcMakeOrderCustomer,
  atcAddToCart,
  atcUpdateAmountSold
} from "../../../../actions";
import SnackbarContentWrapper from "../../../message";
import Snackbar from "@material-ui/core/Snackbar";
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

function CartResult(props) {
  const [user, setUser] = useState(props.currentUser);
  const [ordered, setOrdered] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [variantMessage, setVariantMessage] = useState("info");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const showMessage = (variant, message) => {
    setVariantMessage(variant);
    setMessage(message);
    setOpenSnackbar(true);
  };
  useEffect(() => {
    if (props.totalPrice == 0) {
      let total = parseInt(localStorage.getItem("total"))
        ? parseInt(localStorage.getItem("total"))
        : 0;
      props.calculateTotalPrice(total);
    } else {
      const productOrders = props.productOrders;

      if (productOrders && productOrders.length > 0) {
        let total = 0;
        productOrders.map((productOrder, index) => {
          total +=
            parseInt(productOrder.price) * parseInt(productOrder.quantity);
        });

        props.calculateTotalPrice(total - props.totalPrice);
      }
    }

    // const token = localStorage.getItem("token");
    // props.getCurrentUser(token);
  }, []);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props.currentUser]);

  const makePurchase = () => {
    const temp = JSON.parse(localStorage.getItem("ProductOrders"));
    let products = [];
    if (temp && temp.length > 0) {
      products = temp.map((item, index) => {
        props.updateAmountSold(
          item.productId,
          item.color,
          item.size,
          item.quantity
        );
        console.log(
          "check1234",
          item.productId,
          item.color,
          item.size,
          item.quantity
        );
        return {
          productId: item.productId,
          color: item.color,
          size: item.size,
          price: item.price,
          inventory: item.quantity
        };
      });
    }
    const order = {
      products: products,
      totalPrice: props.totalPrice,
      userId: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      shipAddress: user.shipAddress
    };
    props.makeOrderCumtomer(order);
    localStorage.removeItem("ProductOrders");
    localStorage.removeItem("total");
    props.addToCart(-props.count);
    props.calculateTotalPrice(-props.totalPrice);
    showMessage("info", "Mua hàng thành công!!");

    setTimeout(() => {
      setOrdered(true);
    }, 1000);
    console.log("order da order ne", order);
  };
  return (
    <>
      <StyledTableRow>
        <StyledTableCell colSpan={2}>
          <button className="red-button">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Trở về home
            </Link>
          </button>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{ fontSize: "20px", fontWeight: "600" }}
          colSpan={3}
        >
          Tổng tiền
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{ fontSize: "20px", fontWeight: "600" }}
        >
          {parseInt(props.totalPrice)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </StyledTableCell>
        <StyledTableCell align="center">
          {!props.buy && (
            <button
              className="red-button"
              onClick={() => {
                if (props.totalPrice == 0)
                  showMessage("info", "Bạn chưa chọn sản phẩm!");
              }}
            >
              <Link
                disabled={props.totalPrice == 0 ? true : false}
                to="/product/purchase"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Mua hàng
              </Link>
            </button>
          )}
          {props.buy && (
            <button className="red-button" onClick={makePurchase}>
              Đặt hàng
            </button>
          )}
          {ordered && <Redirect to="/" />}
        </StyledTableCell>
      </StyledTableRow>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant={variantMessage}
          message={message}
        />
      </Snackbar>
    </>
  );
}

const stateMapToProps = (state, props) => {
  return {
    totalPrice: state.totalPrice,
    currentUser: state.user,
    count: state.countCart
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    calculateTotalPrice: price => {
      dispatch(atcTotalPrice(price));
    },
    // getCurrentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // },
    makeOrderCumtomer: order => {
      dispatch(atcMakeOrderCustomer(order));
    },
    addToCart: count => {
      dispatch(atcAddToCart(count));
    },
    updateAmountSold: (productId, color, size, quantity) => {
      dispatch(atcUpdateAmountSold(productId, color, size, quantity));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(CartResult);
