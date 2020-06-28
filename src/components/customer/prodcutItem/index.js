import React, { useState, useEffect } from "react";
import Rating from "@material-ui/lab/Rating";
import shoe from "../../../assets/image/shoe.jpg";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Paper, Box } from "@material-ui/core";
import { connect } from "react-redux";
import "./style.css";

function ProductItem(props) {
  const [value, setValue] = useState(4);
  const [show, setShow] = useState(false);
  const [amoutSold, setAmountSold] = useState(0);
  const [product, setProduct] = useState(props.product);
  useEffect(() => {
    setProduct(props.product);
    if (props.product.detail && props.product.detail.length > 0) {
      let tempAmountSold = 0;
      props.product.detail.map((item, index) => {
        tempAmountSold += parseInt(item.amountSold);
      });
      setAmountSold(tempAmountSold);
    }
    console.log("lalaalla", props.product);
  }, [props.product]);
  const addToCart = () => {};
  return (
    <Paper>
      <div
        className="card-container "
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="card-item-image">
          <img
            className="image-item product-item-img"
            alt="example"
            src={
              `http://localhost:1337/images/temp/${product.images[0]}` || shoe
            }
          />

          {product.sale && product.sale != "0" && (
            <Box className="sale">-{product.sale}%</Box>
          )}
        </div>
        <div className="card-item-body">
          <Link
            to={{
              pathname: `/product-detail/${product._id}`
            }}
            className="tilte showMore"
          >
            {product.nameShow || product.name}
          </Link>
          <div style={{ color: "#DFAF48" }}>
            {/* {product.sale && product.sale != 0 && ( */}
            <Box
              display="inline"
              style={{ textDecoration: "line-through", marginRight: "5px" }}
            >
              {product.sale && product.sale != 0
                ? (product.price || 0)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                : ""}
            </Box>
            {/* )} */}
            <Box display="inline" fontWeight={600}>
              {(product.sale && product.sale != 0
                ? Math.ceil(product.price * (1 - product.sale / 100))
                : product.price || 0
              )
                .toFixed(1)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <div>
              <Rating
                className="rating-home"
                name="simple-controlled"
                readOnly
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <div className="add-to-cart">
              <div className={`action-item ${show ? "d-block" : "d-none"}`}>
                <div>
                  <Link
                    to={{
                      pathname: `/product-detail/${product._id}`
                    }}
                  >
                    <ShoppingCartIcon
                      className="cart"
                      style={{
                        color: "#5E3D6E",
                        fontSize: "35px",
                        marginBottom: "10px"
                      }}
                    />
                  </Link>
                </div>
                <div>
                  <FavoriteBorderIcon
                    className="favorite-icon"
                    onClick={() => {
                      props.addFavourite(product._id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
              position: "absolute",
              bottom: 8,
              right: 8
            }}
          >
            <i style={{ color: "#00000", fontSize: "12px", fontWeight: "500" }}>
              {amoutSold} đã bán
            </i>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default ProductItem;
