import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RowProduct from "../rowProduct";

function ImportStockDetail(props) {
  var products = props.products;
  console.log("lallala", products);

  const [_detailProduct, _setDetailProduct] = useState([
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

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < products.length; i++) {
      let item = {
        maSanPham: products[i].maSanPham,
        detail: [
          {
            color: "",
            size: "",
            price: 0,
            inventory: 0
          }
        ]
      };
      arr.push(item);
    }
    _setDetailProduct(arr);
    console.log("kiem tra",props.products)
  }, [props.products]);

  const onreciveProduct = (index, details) => {
    let item = {
      maSanPham: products[index].maSanPham,
      detail: details
    };
    let tempdetailProduct = _detailProduct;
    tempdetailProduct[index] = item;
    _setDetailProduct(tempdetailProduct);
    props._sendDetailProduct(_detailProduct);
  };

  const renderRowProduct = () => {
    var result = "";
    console.log("check",props._detailProducts[0], )
    if (products && products.length > 0) {
      result = products.map((product, index) => {
        return (
          <RowProduct
            product={product}
            key={index + Date.now}
            index={index}
            sendDetailProduct={onreciveProduct}
            __detailProduct={props._detailProducts[index]}
            suplierProducts={props.suplierProducts}
          />
        );
      });
    }
    return result;
  };
  return (
    <div>
      <Table aria-label="simple table">
        <TableHead style={{ backgroundColor: "#F5F5F5" }}>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell align="center">Màu sắc</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="center">Giá</TableCell>
            <TableCell align="center">Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderRowProduct()}
          <TableRow>
            {/* <TableCell
              colSpan={5}
              style={{ textAlign: "end", fontSize: "25px", color: "#2a1a5e" }}
            >
              Tổng cộng: 1000000000
            </TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default ImportStockDetail;
