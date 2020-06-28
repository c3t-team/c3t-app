import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import "./style.css";
import {
  atcGetProductsRequest,
  atcCreateProdctSuplierRequest,
  atcGetProductSuplierRequest,
  atcDeletProductSuplierRequest,
  atcGetSuplierByIdRequest
} from "../../../../actions";
import Item from "./item";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#F5F5F5",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #Fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  input: {
    marginLeft: "50px",
    width: "300px",
    height: "30px"
  }
}));
function DetailSuplier(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [maSanPham, setMaSanPham] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderOption = () => {
    var result = "";
    var products = props.products;
    if (products && products.length > 0) {
      result = products.map((product, index) => {
        return (
          <option key={index} value={product._id}>
            {product.name}
          </option>
        );
      });
    }
    return result;
  };

  const renderItemProduct = () => {
    var result = "";
    var productSupliers = props.productSupliers;
    console.log("pppp", productSupliers);
    if (productSupliers && productSupliers.length > 0) {
      result = productSupliers.map((product, index) => {
        return (
          <Item
            key={index}
            index={index}
            product={product}
            deleteProductSuplier={props.deleteProductSuplier}
            id={props.suplier._id}
          ></Item>
        );
      });
    }
    return result;
  };
  const createProduct = () => {
    props.createProduct(props.suplier._id, maSanPham);
    handleClose();
  };
  useEffect(() => {
    const id = props.match.params.id;
    props.getSuplierById(id);
    props.getProducts();
    console.log("Lỗi j đây");
  }, []);

  useEffect(() => {
    props.getProductSupliers(props.suplier._id);
  }, [props.suplier]);

  return (
    <div>
      <div>
        <h6 style={{ color: "#512c62" }}>THÔNG TIN NHÀ CUNG CẤP</h6>
      </div>
      {/* <div
        style={{ width: "10%", height: "4px", backgroundColor: "#F75F00" }}
      ></div> */}
      <div
        style={{
          display: "flex",
          justifyItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          marginTop: "20px"
        }}
      >
        <div className="info-customer">
          <label>Tên</label>
          <h6>{props.suplier.name}</h6>
          <label>Địa chỉ</label>
          <h6>{props.suplier.address}</h6>
        </div>
        <div className="info-customer">
          <label>Email</label>
          <h6>{props.suplier.email}</h6>
          <label>SDT</label>
          <h6>{props.suplier.phone}</h6>
        </div>
      </div>
      <div>
        <h6 style={{ color: "#512c62", marginTop: "50px" }}>
          DANH SÁCH SẢN PHẨM
        </h6>
      </div>
      {/* <div
        style={{ width: "10%", height: "4px", backgroundColor: "#F75F00" }}
      ></div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px"
        }}
      >
        <button onClick={handleOpen} className="outline-button">
          Thêm sản phẩm
        </button>
      </div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">STT</StyledTableCell>
            <StyledTableCell align="center">Tên sản phẩm</StyledTableCell>
            <StyledTableCell align="center">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderItemProduct()}</TableBody>
      </Table>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h3 id="transition-modal-title">Thêm sản phẩm</h3>
            <div id="transition-modal-description">
              <div>
                <label className={classes.label}>Tên sản phẩm</label>
                <select
                  className={classes.input}
                  value={maSanPham}
                  onChange={e => setMaSanPham(e.target.value)}
                >
                  {renderOption()}
                </select>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  style={{
                    backgroundColor: "#512c62",
                    marginTop: "10px",
                    marginRight: "10px"
                  }}
                >
                  Hủy
                </Button> */}
                <button className="fill-button">Hủy</button>
                {/* <Button
                  onClick={createProduct}
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: "#512c62", marginTop: "10px" }}
                >
                  Lưu
                </Button> */}
                <button className="fill-button" onClick={createProduct}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    products: state.products,
    productSupliers: state.productSupliers,
    suplier: state.suplier
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getProducts: () => {
      dispatch(atcGetProductsRequest(false));
    },
    createProduct: (id, productId) => {
      dispatch(atcCreateProdctSuplierRequest(id, productId));
    },
    getProductSupliers: id => {
      dispatch(atcGetProductSuplierRequest(id));
    },
    deleteProductSuplier: (id, productId) => {
      console.log("ppppp", id + "= " + productId);
      dispatch(atcDeletProductSuplierRequest(id, productId));
    },
    getSuplierById: id => {
      dispatch(atcGetSuplierByIdRequest(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(DetailSuplier);
