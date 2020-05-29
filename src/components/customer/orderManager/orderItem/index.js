import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import shoe from "../../../../assets/image/shoe.jpg";
import "./style.css";
function getSteps() {
  return [" Đang xử lý", "Đang giao", "Đã nhận hàng"];
}

function OrderItem(props) {
  const [activeStep, setActiveStep] = useState(3);
  const [orderItem, setOrderItem] = useState(props.orderItem);
  const [hideCancel, setHidecancel] = useState(true);
  const steps = getSteps();
  console.log("oeeritem nẻ", orderItem);
  useEffect(() => {
    switch (props.status) {
      case "PAID":
      case "ORDERED":
        setActiveStep(0);
        break;
      case "SHIPPING":
        setActiveStep(1);
        setHidecancel(false);
        break;
      case "PAYED":
        setHidecancel(false);
        setActiveStep(3);
        break;
      default:
        setActiveStep(0);

        break;
    }
  }, []);

  useEffect(() => {
    setOrderItem(props.orderItem);
  }, [props.orderItem]);
  const CancelOrderItem = () => {
    props.cancelProductOrderItem(props.orderId, props.orderItem._id);
    window.location.reload();
  };
  return (
    <div className="container-order">
      <div className="container-order-item">
        <Grid container style={{ width: "100%" }}>
          <Grid sm={2} item>
            <img
              style={{ width: "90%", height: "80%" }}
              alt="example"
              src={
                orderItem.productId.images && orderItem.productId.images[0]
                  ? `http://localhost:1337/images/temp/${orderItem.productId.images[0]}`
                  : shoe
              }
            />
          </Grid>
          <Grid sm={4} item>
            <h6> {orderItem.productId.nameShow}</h6>
            <p> Số lượng: {orderItem.inventory}</p>
            <p>
              Ngày mua: {new Date(props.updatedAt).toDateString("yyyy-MM-dd")}
            </p>
            {/* {hideCancel || !props.isManager && ( */}
              {hideCancel && (
              <button
                className="fill-button"
                onClick={() => {
                  CancelOrderItem();
                }}
              >
                Hủy
              </button>
            )}
          </Grid>

          <Grid sm={6} item>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              style={{ backgroundColor: "transparent" }}
            >
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end"
              }}
            >
              <h5 style={{ color: "#d9a128" }}>
                Tổng tiền: {parseInt(orderItem.price * orderItem.inventory)}
              </h5>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default OrderItem;
