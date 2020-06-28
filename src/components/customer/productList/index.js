import React, { useEffect, useState } from "react";
import "./style.css";
import ProductItem from "../prodcutItem";
import { connect } from "react-redux";
import {
  atcGetProductsRequest,
  // atcGetCurentUserRequest,
  atcAddProductFavourite
} from "../../../actions/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Grid } from "@material-ui/core";
import Pagination from "../pagination";
import { Redirect } from "react-router-dom";

function ProductList(props) {
  const [user, setUser] = useState(props.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const itemPerPage = 12;
  const [curentPage, setCurentPage] = useState(1);
  const [showPagination, setShowaPagination] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const RenderProductList = () => {
    console.log("ls products", props.products);
    var result = [];
    const products = props.products;
    for (let i = (curentPage - 1) * itemPerPage; i < products.length; i++) {
      if (i < itemPerPage * curentPage) {
        const item = (
          <Grid item md={3} xs={6} key={i}>
            <ProductItem product={products[i]} addFavourite={addFaccvourite} />
          </Grid>
        );
        result.push(item);
      } else {
        break;
      }
    }
    // if (products && products.length > 0) {
    //   result = products.map((product, index) => {
    //     return (
    //       <Grid item md={3} xs={6} key={index}>
    //         <ProductItem product={product} addFavourite={addFaccvourite} />
    //       </Grid>
    //     );
    //   });
    // }
    if (result.length > 0) {
      return result;
    } else {
      setShowaPagination(false);
      return (
        <div>
          <h2>Không có sản phẩm nào được tìm thấy!!</h2>
        </div>
      );
    }
  };

  const changeCurentPage = curentPage => {
    setCurentPage(curentPage);
  };

  const addFaccvourite = productId => {
    if (props.currentUser && props.currentUser._id) {
      let body = {
        productId: productId,
        id: user._id
      };

      props.addFaccvourite(body);
    } else {
      setIsLogin(true);
    }
  };
  useEffect(() => {
    props.getProducts();
    // const token = localStorage.getItem("token");
    // console.log("token111", token);
    // if (token && token.length > 0) {
    //   console.log("token", token);
    //   props.getCurentUser(token);
    // }
  }, []);

  useEffect(() => {
    if (props.products && props.products.length > 0) {
      setIsLoading(false);
      setShowaPagination(true);
    }
  }, [props.products]);

  useEffect(() => {
    setUser(props.currentUser);
    console.log("oaoaooa", props.currentUser);
  }, [props.currentUser]);
  return (
    <>
      {isLogin && <Redirect to="/login" />}
      {isLoading && (
        <div style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress
            style={{ width: "100px", height: "100px", color: "#5A3D6C" }}
          />
        </div>
      )}
      <Grid container spacing={2}>
        {!isLoading && <RenderProductList />}
      </Grid>
      {showPagination && (
        <Pagination
          totalItem={props.products.length}
          itemPerPage={itemPerPage}
          changeCurentPage={changeCurentPage}
          curentPage={curentPage}
        />
      )}
    </>
  );
}
const stateMapToProps = (state, props) => {
  return {
    products: state.products,
    currentUser: state.user
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getProducts: () => {
      dispatch(atcGetProductsRequest(true));
    },
    // getCurentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // },
    addFaccvourite: data => {
      dispatch(atcAddProductFavourite(data));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ProductList);
