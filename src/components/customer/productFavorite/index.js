import React, { useEffect, useState } from "react";
import ProductFavoriteItem from "./productFavoriteItem";
import { connect } from "react-redux";
import {
  atcGetFavoriteProductsRequest,
  atcRemoveFavoriteProduct
} from "../../../actions/index";
function ProductFavorite(props) {
  const [favoriteProducts, setFavoriteProducts] = useState(
    props.favoriteProducts
  );

  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
    props.getFavoriteProducts(props.currentUser._id);
  }, []);
  useEffect(() => {
    console.log("ooaoaid", props.currentUser._id);
    props.getFavoriteProducts(props.currentUser._id);
  }, [props.currentUser]);

  useEffect(() => {
    const products = props.favoriteProducts.favoriteProducts;
    setFavoriteProducts(products);
    console.log("fav", props.favoriteProducts.favoriteProducts);
  }, [props.favoriteProducts]);

  const removeProduct = productId => {
    props.removeFavoriteProduct(props.currentUser._id, productId);
    //  props.getFavoriteProducts(props.currentUser._id);
  };
  const renderFavoriteProducts = () => {
    var result = [];
    if (favoriteProducts && favoriteProducts.length > 0) {
      result = favoriteProducts.map((product, index) => {
        return (
          <ProductFavoriteItem
            product={product}
            removeProduct={removeProduct}
            key={index}
          />
        );
      });
    }
    return result;
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <h6 style={{ color: "#2b2b28" }}>DANH SÁCH YÊU THÍCH</h6>
      <div
        style={{
          width: "10%",
          height: "4px",
          backgroundColor: "#d9a128",
          marginBottom: "30px"
        }}
      ></div>
      {renderFavoriteProducts()}
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    currentUser: state.user,
    favoriteProducts: state.favoriteProducts
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getFavoriteProducts: userId => {
      dispatch(atcGetFavoriteProductsRequest(userId));
    },
    removeFavoriteProduct: (userId, productId) => {
      dispatch(atcRemoveFavoriteProduct(userId, productId));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ProductFavorite);
