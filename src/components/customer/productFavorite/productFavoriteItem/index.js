import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import shoe from "../../../../assets/image/shoe.jpg";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import './style.css' 

function ProductFavoriteItem(props) {
  return (
    <div>
      <div className="container-order">
        <div className="container-order-item">
          <Grid container spacing={1}>
            <Grid item md={2} xs={6}>
              <div>
                <img
                  style={{ width: "100px", height: "100px" }}
                  alt="example"
                  src={
                    props.product.images && props.product.images[0]
                      ? `http://localhost:1337/images/temp/${props.product.images[0]}`
                      : shoe
                  }
                />
              </div>
            </Grid>
            <Grid item md={8} xs={6}>
              <div>
                <h6> {props.product.nameShow || props.product.name}</h6>

                <div>
                  <h6 style={{ color: "#d9a128" }}> {props.product.price} đ</h6>
                </div>
                <div>
                  <DeleteIcon
                    className="icon-delete"
                    onClick={() => {
                      props.removeProduct(props.product._id);
                      console.log("pid", props.product._id);
                    }}
                  />
                </div>
              </div>
            </Grid>
            <Grid item md={2} xs={12}>
              <button className="fill-button-detail">
                <Link
                  to={{
                    pathname: `/product-detail/${props.product._id}`
                  }}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Chi tiết
                </Link>
              </button>
            </Grid>
          </Grid>

          {/* <div style={{ width: "100%", display: "flex" }}>
            <div>
              <h6> {props.product.nameShow || props.product.name}</h6>

              <div>
                <h6 style={{ color: "#d9a128" }}> {props.product.price} đ</h6>
              </div>
              <div>
                <DeleteIcon
                  className="icon-delete"
                  onClick={() => {
                    props.removeProduct(props.product._id);
                    console.log("pid", props.product._id);
                  }}
                />
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  height: "100%"
                }}
              >
                <button className="fill-button">
                  <Link
                    to={{
                      pathname: `/product-detail/${props.product._id}`
                    }}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Chi tiết
                  </Link>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ProductFavoriteItem;
