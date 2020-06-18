import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Switch from "@material-ui/core/Switch";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";
import {
  atcGetOrderRequest,
  atcChangeStatusOrderRequest,
  atcUpdateAmountSold
} from "../../../../actions";
import CartAdmin from "./cart";

const useStyles = makeStyles(theme => ({
  paddingLabel: {},
  width100: {
    marginBottom: "10px",
    width: "80%"
  }
}));

function OrderDetail(props) {
  const classes = useStyles();
  const [duyet, setDuyet] = useState(false);
  const [isAccess, setIsAccess] = useState(false);
  const [order, setOrder] = useState({});
  useEffect(() => {
    console.log("order ne em", props.order);
    setOrder(props.order);
    console.log("usser role", props.currentUser.role, props.order.status);
    if (
      (props.order.status == "PAID" && props.currentUser.role == "saleman") ||
      (props.order.status == "ORDERED" &&
        props.currentUser.role == "stocker") ||
      (props.order.status == "SHIPPING" &&
        props.currentUser.role == "shipper") ||
      props.currentUser.role == "admin"
    ) {
      setIsAccess(true);
    } else {
      setIsAccess(false);
    }
  }, [props.order]);
  useEffect(() => {
    const id = props.match.params.id;
    props.getOrder(id);
  }, []);

  const approved = e => {
    setDuyet(e.target.checked);
    let status = "";
    if (e.target.checked) {
      switch (order.status) {
        case "PAID":
          status = "ORDERED";
          break;
        case "BOOK":
          status = "ORDERED";
          for (let i = 0; i < order.products.length; i++) {
            props.updateAmountSold(
              order.products[i].productId._id,
              order.products[i].color,
              order.products[i].size,
              order.products[i].inventory
            );
          }
          break;
        case "ORDERED":
          status = "SHIPPING";
          break;
        case "SHIPPING":
          status = "PAYED";
          break;
        default:
          status = "PAID";
          break;
      }
    } else {
      switch (order.status) {
        case "ORDERED":
          status = "PAID";
          break;
        case "SHIPPING":
          status = "ORDERED";
          break;
        case "PAYED":
          status = "SHIPPING";
          break;
        default:
          status = "PAID";
          break;
      }
    }
    props.changeStatus(order._id, status);
  };
  return (
    <Container fixed>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          {(order.status == "PAID" || order.status == "BOOK") && (
            <label>Duyệt</label>
          )}
          {order && order.status == "ORDERED" && <label>Shipping</label>}
          {order && order.status == "SHIPPING" && <label>Hoàn thành</label>}
          {order && order.status == "CANCEL" && <label>Đã hủy</label>}
          { order && order.status !== "PAYED" && (
            <Switch
              checked={duyet}
              onChange={e => approved(e)}
              value="duyet"
              disabled={!isAccess}
            />
          )}
          {order && order.status == "PAYED" && <h6>Đã thanh toán</h6>}
        </div>
      </div>
      <Grid>
        <Grid
          item
          sm={10}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <h6>THÔNG TIN KHÁCH HÀNG</h6>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item sm={5}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                htmlFor="adornment-userName"
                className={classes.paddingLabel}
              >
                Username
              </InputLabel>
              <Input
                id="adornment-userName"
                className={classes.width100}
                readOnly
                value={order.name}
              />
            </FormControl>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                htmlFor="adornment-address"
                className={classes.paddingLabel}
              >
                Địa chỉ
              </InputLabel>
              <Input
                id="adornment-address"
                className={classes.width100}
                readOnly
                value={order.shipAddress}
              />
            </FormControl>
          </Grid>
          <Grid item sm={5}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                htmlFor="adornment-emial"
                className={classes.paddingLabel}
              >
                Email
              </InputLabel>
              <Input
                id="adornment-email"
                className={classes.width100}
                readOnly
                value={order.email}
              />
            </FormControl>

            <FormControl style={{ width: "100%" }}>
              <InputLabel
                htmlFor="adornment-phone"
                className={classes.paddingLabel}
              >
                Số điện thoại
              </InputLabel>
              <Input
                id="adornment-phone"
                className={classes.width100}
                readOnly
                value={order.phone}
                name="phone"
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid sm={12} item style={{ marginTop: "20px" }}>
          <CartAdmin
            productOrders={order.products}
            totalPrice={order.totalPrice}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
const stateMapToProps = (state, props) => {
  return {
    order: state.order,
    currentUser: state.user
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getOrder: id => {
      dispatch(atcGetOrderRequest(id));
    },
    changeStatus: (orderId, status) => {
      dispatch(atcChangeStatusOrderRequest(orderId, status));
    },
    updateAmountSold: (productId, color, size, quantity) => {
      dispatch(atcUpdateAmountSold(productId, color, size, quantity));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(OrderDetail);
