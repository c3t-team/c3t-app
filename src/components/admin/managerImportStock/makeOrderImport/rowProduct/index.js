import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import PriceAndQualityItem from "./priceAndQuanlityItem";


const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    width: "100%"
  }
}))(TableRow);

function RowProduct(props) {
  const [_detailProduct, _setDetailProduct] = useState([
    {
      color: "",
      size: "",
      price: 0,
      inventory: 0
    }
  ]);

  useEffect(() => {
    //set detail product
    if (props.__detailProduct && props.__detailProduct.detail[0].color != "") {
      _setDetailProduct(props.__detailProduct.detail);
    } else {
      var amountProducts = props.product.classification
        ? props.product.classification.color.length *
          props.product.classification.size.length
        : 0;
      let arr = [];
      for (let i = 1; i <= amountProducts; i++) {
        let itemDetail = {
          color: "",
          size: "",
          price: 0,
          inventory: 0
        };
        arr.push(itemDetail);
      }
      _setDetailProduct(arr);
    }
    console.log("test", props.product);
  }, [props.product]);

  const onRecive = (index, indexColor, indexSize, content) => {
    let item = {
      color: props.product.classification.color[indexColor],
      size: props.product.classification.size[indexSize],
      price: content.price,
      inventory: content.inventory
    };

    let arr = _detailProduct;
    arr[index] = item;
    _setDetailProduct(arr);

    props.sendDetailProduct(props.index, _detailProduct);
  };

  const renderProduct = () => {
    var result = [];
    var rowSpanProductName = props.product.classification
      ? props.product.classification.color.length *
        props.product.classification.size.length
      : 0;
    var rowSpanSize = props.product.classification
      ? props.product.classification.size.length
      : 0;
    var i = 1;
    var color = 0;
    var size = 0;
    var check = 1;
    console.log("llalla", props.suplierProducts, props.product.maSanPham);
    var nameProduct = "demo";
    if (props.suplierProducts && props.suplierProducts.length > 0) {
      for (let i = 0; i < props.suplierProducts.length; i++) {
        if (props.suplierProducts[i]._id == props.product.maSanPham) {
          nameProduct = props.suplierProducts[i].name;
          break;
        }
      }
    }

    for (i = 1; i <= rowSpanProductName; i++) {
      if (i === 1) {
        let item = (
          <StyledTableRow>
            <TableCell rowSpan={rowSpanProductName}>{nameProduct}</TableCell>
            <TableCell align="center" rowSpan={rowSpanSize}>
              {props.product.classification.color[0]}
            </TableCell>
            <TableCell align="center">
              {" "}
              {props.product.classification.size[0]}
            </TableCell>
            <PriceAndQualityItem
              key={i + new Date()}
              indexColor={0}
              indexSize={0}
              index={i - 1}
              onRecive={onRecive}
              detail={_detailProduct[i - 1]}
            />
          </StyledTableRow>
        );
        result.push(item);
      } else {
        if (i % rowSpanSize === 1 || rowSpanSize == 1) {
          var item = (
            <StyledTableRow>
              <TableCell align="center" rowSpan={rowSpanSize}>
                {props.product.classification.color[color]}
              </TableCell>
              <TableCell align="center">
                {" "}
                {props.product.classification.size[size]}
              </TableCell>
              <PriceAndQualityItem
                key={i + new Date()}
                indexColor={color}
                indexSize={size}
                index={i - 1}
                onRecive={onRecive}
                detail={_detailProduct[i - 1]}
              />
            </StyledTableRow>
          );
          result.push(item);
        } else {
          var item = (
            <StyledTableRow>
              <TableCell align="center">
                {" "}
                {props.product.classification.size[size]}
              </TableCell>
              <PriceAndQualityItem
                key={i + new Date()}
                indexColor={color}
                indexSize={size}
                index={i - 1}
                onRecive={onRecive}
                detail={_detailProduct[i - 1]}
              />
            </StyledTableRow>
          );
          result.push(item);
        }
      }

      ++size;
      if (check == props.product.classification.size.length) {
        ++color;
        check = 1;
      } else ++check;

      if (size == props.product.classification.size.length) {
        size = 0;
      }
    }
    console.log("KQ", result);
    return result;
  };

  return <>{renderProduct()}</>;
}
export default RowProduct;
