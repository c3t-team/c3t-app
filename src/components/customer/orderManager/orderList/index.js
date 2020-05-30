import React, { useEffect, useState } from "react";
import "./style.css";
import OrderItem from "../orderItem";
import { connect } from "react-redux";
import {
  atcGetOrderCustomersRequest,
  // atcGetCurentUserRequest,
  atcRemoveProductItemInOrderRequest
} from "../../../../actions";
import Pagination from "../../pagination";

function OrderList(props) {
  const [orders, setOrders] = useState([]);
  const itemPerPage = 3;
  const [curentPage, setCurentPage] = useState(1);
  const [showPagination, setShowaPagination] = useState(false);
  useEffect(() => {
    let tempOrderSort = props.orderCustomer;
    tempOrderSort = tempOrderSort.sort(compare);
    setOrders(tempOrderSort);
    console.log("test order admin",props.orderCustomer,props.orderCustomer.length)
    if ( props.orderCustomer.length > 0) {
      setShowaPagination(true);
    }
  }, [props.orderCustomer]);

  useEffect(() => {
    if (props.isManager) props.getOrderCumtomers(props.userId);
    else props.getOrderCumtomers(props.currentUser._id);

    // const token = localStorage.getItem("token");
    // props.getCurrentUser(token);
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
  }, []);

  const cancelProductOrderItem = (orderId, productOrderId) => {
    props.cancelProductOrderItem(
      orderId,
      productOrderId,
      props.currentUser._id
    );
  };

  const changeCurentPage = curentPage => {
    setCurentPage(curentPage);
  };

  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const orderA = a.createdAt.toUpperCase();
    const orderB = b.createdAt.toUpperCase();

    let comparison = 0;
    if (orderA < orderB) {
      comparison = 1;
    } else if (orderA >= orderB) {
      comparison = -1;
    }
    return comparison;
  };
  const renderOrderItem = () => {
    let result = [];
    console.log("curentPage", curentPage, itemPerPage, orders, orders.length);
    for (let i = (curentPage - 1) * itemPerPage; i < orders.length; i++) {
      if (i < itemPerPage * curentPage) {
        if (orders[i].products && orders[i].products.length > 0) {
          orders[i].products.map((item, ind) => {
            const orderItem = (
              <OrderItem
                key={i + new Date() + ind}
                orderItem={item}
                status={orders[i].status}
                orderId={orders[i]._id}
                cancelProductOrderItem={cancelProductOrderItem}
                updatedAt={orders[i].updatedAt}
                currentUser={props.currentUser}
                isManager={props.isManager}
              />
            );
            result.push(orderItem);
          });
        }
      } else {
        break;
      }
    }

    // if (orders && orders.length > 0) {
    //   orders.map((order, index) => {
    //     if (order.products && order.products.length > 0) {
    //       order.products.map((item, ind) => {
    //         const orderItem = (
    //           <OrderItem
    //             key={index + new Date() + ind}
    //             orderItem={item}
    //             status={order.status}
    //             orderId={order._id}
    //             cancelProductOrderItem={cancelProductOrderItem}
    //             updatedAt={order.updatedAt}
    //           />
    //         );
    //         result.push(orderItem);
    //       });
    //     }
    //   });
    // }
    return result;
  };
  return (
    <div style={{ marginTop: "40px" }}>
      <h6 style={{ color: "#2b2b28" }}>DANH SÁCH ĐƠN HÀNG</h6>
      <div
        style={{
          width: "10%",
          height: "4px",
          backgroundColor: "#e3b04b",
          marginBottom: "30px"
        }}
      ></div>
      {renderOrderItem()}

      {showPagination && props.orderCustomer.length!=0 && (
        <Pagination
          totalItem={props.orderCustomer.length}
          itemPerPage={itemPerPage}
          changeCurentPage={changeCurentPage}
          curentPage={curentPage}
        />
      )}
    </div>
  );
}
const stateMapToProps = (state, props) => {
  return {
    currentUser: state.user,
    orderCustomer: state.orderCustomer
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getOrderCumtomers: id => {
      dispatch(atcGetOrderCustomersRequest(id));
    },
    // getCurrentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // },
    cancelProductOrderItem: (orderId, productOrderId, userId) => {
      dispatch(
        atcRemoveProductItemInOrderRequest(orderId, productOrderId, userId)
      );
    }
  };
};

export default connect(stateMapToProps, dispatchMapToProps)(OrderList);
