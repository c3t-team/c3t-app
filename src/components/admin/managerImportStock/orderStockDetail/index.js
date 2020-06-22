import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Switch from "@material-ui/core/Switch";

import {
  atcGetDetailOrderSuplierRequest,
  atcChangeStatusOrderSuplier,
  atcGetSuplierRequest,
  atcGetDetailProductRequest,
  atcCreateOrderSuplierRequest,
  atcUpdateProductRequest,
  atcAddDetailItemProductRequets,
  // atcGetCurentUserRequest,
  atcUpdateDetailItemProductRequets
} from "../../../../actions";
import OrderStockItemDetail from "./orderStockItemDetail";
function OrderStockDetail(props) {
  const [order, setOrder] = useState(props.order);
  const [duyet, setDuyet] = useState(false);
  const [_detailProducts, _setDetailProducts] = useState([
    {
      maSanPham: "",
      detail: [
        {
          color: "",
          size: "",
          price: 0,
          inventory: 0
        }
      ]
    }
  ]);

  //Danh sách detail của sản phẩm trong model products
  const [detailProducts, setDetailProducts] = useState([]);

  var products = [];
  if (order.products && order.products.length > 0) {
    for (var i = 0; i < order.products.length; i++) {
      var color = new Set();
      var size = new Set();

      for (var m = 0; m < order.products[i].detail.length; m++) {
        color.add(order.products[i].detail[m].color);
        size.add(order.products[i].detail[m].size);
      }
      let product = {
        maSanPham: order.products[i]._id,
        classification: { color: Array.from(color), size: Array.from(size) }
      };
      products.push(product);
    }
  }
  useEffect(() => {
    let id = props.match.params.id;
    props.getOrder(id);
    console.log("11", props.order);
  }, []);

  useEffect(() => {
    console.log("order nè", props.order);
    setOrder(props.order);
    if (order.status == "COMPLETED") {
      setDuyet(true);
    }
  }, [props.order]);

  const renderOrderStockItemDetail = () => {
    console.log("idaa", props.order.products[0]);
    var ressult = [];
    const order = props.order;
    if (order.products && order.products.length > 0) {
      ressult = order.products.map((product, index) => {
        console.log("product test", product);
        const item = product.maSanPham && (
          <OrderStockItemDetail
            product={product}
            key={index}
            name={
              product.maSanPham && product.maSanPham.name
                ? product.maSanPham.name
                : "undifine"
            }
          />
        );

        return item;
        // (
        //   <OrderStockItemDetail
        //     product={product}
        //     key={index}
        //     name={
        //       product.maSanPham && product.maSanPham.name
        //         ? product.maSanPham.name
        //         : "undifine"
        //     }
        //   />
        // );
      });
    }
    return ressult;
  };
  const approved = e => {
    setDuyet(e.target.checked);
    let status = "";
    if (e.target.checked) {
      switch (order.status) {
        case "PAID":
          status = "ORDERED";
          break;
        case "ORDERED":
          status = "COMPLETED";
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
        case "COMPLETED":
          status = "ORDERED";
          break;
        default:
          status = "PAID";
          break;
      }
    }
    console.log("dattaus", status);
    props.changeaAproved(order._id, status);
    if (status == "COMPLETED") {
      updateProduct();
    }
  };

  const updateProduct = () => {
    if (order.products && order.products.length > 0) {
      order.products.map((product, index) => {
        const detailProduct = product.maSanPham.detail;
        const orderDetailProduct = product.detail;
        if (detailProduct && detailProduct.length > 0) {
          for (let i = 0; i < orderDetailProduct.length; i++) {
            let check = false;
            for (let k = 0; k < detailProduct.length; k++) {
              if (
                orderDetailProduct[i].color.toLowerCase() ==
                  detailProduct[k].color.toLowerCase() &&
                orderDetailProduct[i].size == detailProduct[k].size
              ) {
                //cập nhập lại số lượng của product detail

                // let quantity = productOrderDetail.detail[n].quantity +  tempDetailProducts[k].detail[l].quantity;
                props.updateDetailItem(
                  product.maSanPham._id,
                  detailProduct[k]._id,
                  orderDetailProduct[i].inventory
                );
                // setIndexToUpdate.add(n);
                check = true;
                break;
              }
            }
            if (!check) {
              props.addDetailProduct(
                product.maSanPham._id,
                orderDetailProduct[i]
              );
            }
          }
        } else {
          let data = {
            detail: orderDetailProduct
          };
          props.updateProduct(product.maSanPham._id, data);
        }
      });
    }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          {order.status == "PAID" && <label>Duyệt</label>}
          {order.status == "ORDERED" && <label>Hoàn thành</label>}
          {order.status == "COMPLETED" && <label>Đã nhận hàng</label>}

          {order.status != "COMPLETED" && (
            <Switch checked={duyet} onChange={e => approved(e)} value="duyet" />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginBottom: "20px",
          marginTop: "20px"
        }}
      >
        <div style={{ width: "50%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "150px" }}>Nhà cung cấp:</div>
            <p>
              {" "}
              <b>{order.suplierId.name} </b>
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "150px" }}>Người tạo:</div>
            <p>
              <b>{order.employee.name}</b>
            </p>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "150px" }}>Thời gian: </div>
            <p>
              <b>{new Date(order.createdAt).toDateString("yyyy-MM-dd")} </b>
            </p>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "150px" }}>Tổng công:</div>
            <p>
              <b>
                {order.totalPrice
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </b>
            </p>
          </div>
        </div>
      </div>
      <h6>THÔNG TIN CHI TIẾT ĐƠN HÀNG</h6>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="center">Màu sắc</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Giá nhập</TableCell>
            <TableCell align="center">Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderOrderStockItemDetail()}</TableBody>
      </Table>
    </div>
  );
}
const stateMapToProps = (state, props) => {
  return {
    order: state.detailOrderSuplier
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getOrder: id => {
      dispatch(atcGetDetailOrderSuplierRequest(id));
    },
    changeaAproved: (id, status) => {
      dispatch(atcChangeStatusOrderSuplier(id, status));
    },
    getSupliers: () => {
      dispatch(atcGetSuplierRequest());
    },
    getDetailProduct: id => {
      return dispatch(atcGetDetailProductRequest(id));
    },
    createOrderSuplier: order => {
      dispatch(atcCreateOrderSuplierRequest(order));
    },
    updateProduct: (id, data) => {
      dispatch(atcUpdateProductRequest(id, data));
    },
    addDetailProduct: (id, detail) => {
      dispatch(atcAddDetailItemProductRequets(id, detail));
    },
    updateDetailItem: (id, idItem, inventory) => {
      dispatch(atcUpdateDetailItemProductRequets(id, idItem, inventory));
    },
    // getCurrentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(OrderStockDetail);
