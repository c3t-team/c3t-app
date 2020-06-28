/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImportStockItem from "./importStockItem";
import ImportStockDetail from "../makeOrderImport/importStockDetail";
import {
  atcGetSuplierRequest,
  atcGetDetailProductRequest,
  atcCreateOrderSuplierRequest,
  atcUpdateProductRequest,
  atcAddDetailItemProductRequets,
  // atcGetCurentUserRequest,
  atcUpdateDetailItemProductRequets,
  atcPriceAndInventoryAll,
  atcCheckIsSave
} from "../../../../actions";
import { connect } from "react-redux";
import SnackbarContentWrapper from "../../../message";
import Snackbar from "@material-ui/core/Snackbar";
import { Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles(theme => ({
  btnAddInfo: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginRight: "10%",
    marginBottom: "40px"
  },
  image: {
    display: "flex"
  },
  imageItem: {
    width: "150xp",
    height: "150px"
  }
}));
function OrderImport(props) {
  const classes = useStyles();
  useEffect(() => {
    props.getSupliers();
    // let token = localStorage.getItem("token");
    // console.log("token", token);
    // props.getCurrentUser(token);
  }, []);

  const [suplier, setSuplier] = useState({});
  const [products, setProducts] = useState([
    {
      maSanPham: "",
      classification: { color: ["Màu"], size: ["40"] }
    }
  ]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [variantMessage, setVariantMessage] = useState("info");
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

  const [saveSucess, setSaveSuccess] = useState(false);
  const [priceAll, setPriceAll] = useState(0);
  const [inventoryAll, setInventoryAll] = useState(0);
  const [validatePrice, setValidatePrice] = useState(false);
  const [validateInventory, setValidateInventory] = useState(false);

  let orderProductDetail = [];
  //Danh sách detail của sản phẩm trong model products
  // const [detailProducts, setDetailProducts] = useState([]);

  // Danh sách product tỏng hóa đơn mua hàng
  const [productsOrder, setProductsOrder] = useState([]);

  // Lưu thông tin hóa đơn
  const [orderSuplier, setOrderSuplier] = useState({});

  const supliers = props.supliers;

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const showMessage = (variant, message) => {
    setVariantMessage(variant);
    setMessage(message);
    setOpenSnackbar(true);
  };
  const renderOptionSuplier = () => {
    var result = "";
    if (supliers && supliers.length > 0) {
      result = supliers.map((suplier, index) => {
        console.log("value option", JSON.stringify(suplier));
        return (
          <option key={index} value={JSON.stringify(suplier)}>
            {suplier.name}
          </option>
        );
      });
    }
    return result;
  };

  useEffect(() => {
    if (supliers && supliers.length > 0) {
      setSuplier({ ...props.supliers[0] });
    }
  }, [props.supliers]);
  const onSelectSuplier = e => {
    const obj = JSON.parse(e.target.value);
    // console.log(obj.name);
    setSuplier({ ...obj });
    //  const chooes = supliers[0];
    console.log("suplier choose", suplier);
    console.log("suplier temp ", obj);
  };

  const addCatelogyElement = () => {
    let arr = products;
    let item = {
      maSanPham: "",
      classification: { color: ["màu"], size: [40] }
    };
    arr.push(item);
    setProducts([...arr]);
  };

  const renderImportStockItem = () => {
    var result = "";
    if (products && products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ImportStockItem
            key={index + new Date()}
            index={index}
            product={product}
            suplierProducts={suplier.products}
            onRemove={() => removeImportStockItem(index)}
            reciveProduct={reciveProduct}
          ></ImportStockItem>
        );
      });
    }
    return result;
  };

  const reciveProduct = (index, product) => {
    let arrProduct = products;
    arrProduct[index] = product;
    setProducts([...arrProduct]);
  };

  const removeImportStockItem = index => {
    let arrProduct = products;
    arrProduct.splice(index, 1);
    setProducts([...arrProduct]);
  };
  const renderImportStockDetail = () => {
    if (products && products.length > 0) {
      return (
        <ImportStockDetail
          products={products}
          _sendDetailProduct={onReciveDetailProduct}
          _detailProducts={_detailProducts}
          suplierProducts={suplier.products}
          priceAll={priceAll}
          inventoryAll={inventoryAll}
        />
      );
    }
  };

  const onReciveDetailProduct = detailProduct => {
    _setDetailProducts(detailProduct);
    orderProductDetail = detailProduct;
    console.log("test detail product", _detailProducts);
  };
  const saveOrder = () => {
    // props.checkIsSave(true);
    if (products && products.length > 0) {
      // thực hiện lưu order vào trong model orderSuplier
      let total = 0;
      console.log("test order", orderProductDetail);
      for (let i = 0; i < _detailProducts.length; i++) {
        for (let j = 0; j < _detailProducts[i].detail.length; j++) {
          total +=
            parseInt(_detailProducts[i].detail[j].price) *
            parseInt(_detailProducts[i].detail[j].inventory);
        }
      }

      let order = {
        products: _detailProducts,
        totalPrice: total,
        suplierId: suplier._id,
        employee: props.currenUser._id
          ? props.currenUser._id
          : "5dbedb5ba5592c2698f1992a"
      };
      props
        .createOrderSuplier(order)
        .then(() => {
          showMessage("success", "Tạo thành thành công!");
          setTimeout(() => {
            setSaveSuccess(true);
          }, 1000);
        })
        .catch(() => {
          showMessage("info", "Tạo thất bại");
        });
    }
  };

  useEffect(() => {
    // console.log("messqge", props.message);
    // if ( props.message.status == true) {
    //   setTimeout(() => {
    //     showMessage("success", "Thêm thành thành công!");
    //     setTimeout(() => {
    //       setSaveSuccess(true);
    //     }, 1000);
    //   }, 100);
    // } else {
    //   if (props.message.status == false)
    //     showMessage("info", "Thêm không thành thành công!");
    // }
  }, [props.message]);

  const ApDung = () => {
    if (priceAll < 1000) {
      setValidatePrice(true);
    }
    if (inventoryAll < 0) {
      setValidateInventory(true);
    }
    if (priceAll >= 1000 && inventoryAll > 0) {
      setValidatePrice(false);
      setValidateInventory(false);
      props.makePriceAndInventoryAll(priceAll, inventoryAll);
    }
  };
  return (
    <div>
      {saveSucess && <Redirect to="/admin/stock-orders" />}
      <div className={classes.btnAddInfo} spaceing={4}>
        <button onClick={addCatelogyElement} className="outline-button">
          Thêm
        </button>
        <button className="outline-button" onClick={saveOrder}>
          Lưu
        </button>
      </div>
      <div>
        <div style={{ marginBottom: "30px", marginLeft: "15%" }}>
          <label
            style={{ fontSize: "15px", marginRight: "20px", width: "120px" }}
          >
            Nhà sản xuất
          </label>
          <select
            style={{ width: "200px", height: "40px" }}
            onClick={onSelectSuplier}
          >
            {renderOptionSuplier()}
          </select>
        </div>
        {renderImportStockItem()}
      </div>

      <div style={{ marginTop: "20px", marginBottom: "50px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h5>Chi tiết đơn hàng</h5>
        </div>
        <div className="applyAll">
          <Box marginBottom={2} fontWeight={500}>
            Áp dụng cho Tất cả
          </Box>
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Giá</div>
              <input
                type="number"
                min={1000}
                className="input-apply"
                placeholder="gia"
                value={priceAll}
                onChange={e => setPriceAll(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div>Số lượng</div>
              <input
                type="number"
                min={1}
                className="input-apply"
                placeholder="số lượng"
                value={inventoryAll}
                onChange={e => setInventoryAll(e.target.value)}
              />
            </div>
            <button className="outline-button" onClick={ApDung}>
              Áp dụng
            </button>
          </div>
          {validatePrice && (
            <div className="form-warning">Giá nhập không hợp lệ</div>
          )}
          {validateInventory && (
            <div className="form-warning">số lượng nhập không hợp lệ</div>
          )}
        </div>
        {renderImportStockDetail()}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <SnackbarContentWrapper
          onClose={handleCloseSnackbar}
          variant={variantMessage}
          message={message}
        />
      </Snackbar>
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    supliers: state.supliers,
    detailProduct: state.detailProduct,
    currenUser: state.user,
    message: state.message
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getSupliers: () => {
      dispatch(atcGetSuplierRequest());
    },
    getDetailProduct: id => {
      return dispatch(atcGetDetailProductRequest(id));
    },
    createOrderSuplier: order => {
      return dispatch(atcCreateOrderSuplierRequest(order));
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
    // },
    makePriceAndInventoryAll: (priceAll, inventoryAll) => {
      dispatch(atcPriceAndInventoryAll(priceAll, inventoryAll));
    },
    setStatusMessage: status => {
      // dispatch()
    },
    checkIsSave: status => {
      dispatch(atcCheckIsSave(status));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(OrderImport);
