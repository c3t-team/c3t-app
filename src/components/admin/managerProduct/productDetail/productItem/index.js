import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

function ProductItem(props) {
  const countDetail = props.product.Detail.length;
  var colorCount = new Set();
  var sizeCount = new Set();
  if (props.product.Detail.length && props.product.Detail.length > 0) {
    props.product.Detail.map((detail, index) => {
      colorCount.add(detail.color);
      sizeCount.add(detail.size);
    });
  }

  const renderRow = () => {
    var result = [];
    var color = Array.from(colorCount);
    var size = Array.from(sizeCount);
    let item = (
      <TableRow>
        <TableCell rowSpan={countDetail}>Giày nữ> giày cao got</TableCell>
        <TableCell rowSpan={countDetail}>SP A</TableCell>
        <TableCell align="center" rowSpan={sizeCount.size}>
          {color[0]}
        </TableCell>
    <TableCell align="center">{size[0]}</TableCell>
        <TableCell align="center">100</TableCell>
      </TableRow>
    );
    result.push(item);
    var i = 0;
    for (i = 0; i < colorCount.size; i++) {
      var j = 0;
      if (i != 0) {
        let item = (
          <TableRow>
            <TableCell align="center" rowSpan={2}>
             {color[i]}
            </TableCell>
        <TableCell align="center">{size[0]}</TableCell>
            <TableCell align="center">50</TableCell>
          </TableRow>
        );
        result.push(item);
      }

      for (j = 1; j < sizeCount.size; j++) {
        let item = (
          <TableRow>
      <TableCell align="center">{size[j]}</TableCell>
            <TableCell align="center">10</TableCell>
          </TableRow>
        );
        result.push(item);
      }
    }
    return result;
  };
  return (
    <>
    {props.product.Detail.length>0 && renderRow()}
    </>
  );
}
export default ProductItem;
