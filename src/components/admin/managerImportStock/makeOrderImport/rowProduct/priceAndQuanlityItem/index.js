import React, { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import { Input } from "@material-ui/core";
import { connect } from "react-redux";
function PriceAndQualityItem(props) {
  console.log("kkakaka", props.detail);
  // const [content, setContent] = useState({
  //   price: props.detail ? props.detail.price : 0,
  //   inventory: props.detail ? props.detail.inventory : 0
  // });
  const [price, setPrice] = useState(props.detail ? props.detail.price : 0);
  const [inventory, setInventory] = useState(
    props.detail ? props.detail.inventory : 0
  );
  const [save, setSave] = useState(false);

  const [validatePrice, setValidatePrice] = useState(false);
  const [validateQuantity, setValidateQuantity] = useState(false);

  // const onChangePrice = e => {
  //   setContent({
  //     ...content,
  //     [e.target.name]: e.target.value
  //   });
  //   console.log("content", content, e.target.name,e.target.value);
  //   props.onRecive(props.index, props.indexColor, props.indexSize, content);

  // };

  useEffect(() => {
    setPrice(props.priceAndInventoyAll.priceAll);
    setInventory(props.priceAndInventoyAll.inventoryAll);
    const content = {
      price: props.priceAndInventoyAll.priceAll,
      inventory: props.priceAndInventoyAll.inventoryAll
    };
    // if (
    //   price != props.priceAndInventoyAll.priceAll ||
    //   inventory != props.priceAndInventoyAll.inventoryAll
    // )
    if (!save) {
      props.onRecive(props.index, props.indexColor, props.indexSize, content);
      console.log("thay đổi");
    }
  }, [props.priceAndInventoyAll]);

  useEffect(() => {
    setSave(props.saveOrderSuplier);
  }, [props.saveOrderSuplier]);

  const onChangePrice = e => {
    setPrice(e.target.value);
    const content = {
      price: e.target.value,
      inventory: inventory
    };
    props.onRecive(props.index, props.indexColor, props.indexSize, content);
  };

  const onChangeInventory = e => {
    setInventory(e.target.value);
    const content = {
      price: price,
      inventory: e.target.value
    };
    props.onRecive(props.index, props.indexColor, props.indexSize, content);
  };

  const leave = () => {
    // props.onRecive(props.index, props.indexColor, props.indexSize, content);
  };

  return (
    <>
      <TableCell align="center">
        <Input
          type="number"
          value={price}
          style={{ width: "150px" }}
          name="price"
          onChange={e => onChangePrice(e)}
          // onBlur={leave}
        />
      </TableCell>
      <TableCell align="center">
        <Input
          // onMouseMove={leave}
          type="number"
          value={inventory}
          style={{ width: "150px" }}
          name="inventory"
          onChange={e => onChangeInventory(e)}
        />
      </TableCell>
    </>
  );
}
const stateMapToProps = (state, props) => {
  return {
    priceAndInventoyAll: state.priceAndInventoyAll,
    saveOrderSuplier: state.saveOrderSuplier
  };
};
export default connect(stateMapToProps, null)(PriceAndQualityItem);
