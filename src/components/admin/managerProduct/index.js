import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ProductItem from "./productItem";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SearchBar from "material-ui-search-bar";
import {
  atcGetProductsRequest,
  atcDeleteProductRequest,
  atcGetCategoryRequest,
  atcCreateProductRequest,
  atcUpdateProductRequest,
  atcGetProduct,
  atcSearchProductRequest
} from "../../../actions";
import SnackbarContentWrapper from "../../message";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#F5F5F5",
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

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
  },

  label: {
    width: "100px"
  }
}));

function ManagerProduct(props) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [chooseParent, setChooseParent] = useState("Giày nam");
  const [childrens, setChildrens] = useState([]);
  const [subParent, setSubParent] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [variantMessage, setVariantMessage] = useState("info");
  const [status, setStatus] = useState(false);

  const atcChooseParent = e => {
    setChooseParent(e.target.value);
    if (props.categories && props.categories.length > 0) {
      var lsChildren = [];
      props.categories.map((category, index) => {
        if (chooseParent !== category.name) {
          if (category.children && category.children.length > 0) {
            lsChildren = category.children.map((children, index) => {
              return children;
            });
            setChildrens(lsChildren);
            console.log("lsChildren", lsChildren);
          }
        }
      });
    }
  };

  const atcChooseSubParent = e => {
    setSubParent(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const renderOption = lsChildren => {
    var result = "";
    if (lsChildren && lsChildren.length > 0) {
      result = lsChildren.map((children, index) => {
        return (
          <option key={index} value={children._id}>
            {children.name}
          </option>
        );
      });
    }
    return result;
  };

  const setDefaultValue = () => {
    setChooseParent("Giày nam");
    setChildrens([]);
    setCheckUpdate(false);
  };

  const createProduct = () => {
    let product = {
      name: nameProduct,
      categories: subParent,
      status: status
    };
    if (checkUpdate) {
      try {
        console.log("ì update", idUpdate)
        props.updateProduct(idUpdate, product);
        showMessage("success", "Cập nhập thành công!");
      } catch (error) {
        showMessage("info", "cập nhập không thành công!");
      }
    } else {
      try {
        props.createProduct(product);
        showMessage("success", "Tạo thành công!");
      } catch (error) {
        showMessage("info", "Tạo không thành công!");
      }
    }
    handleClose();
  };

  const handleOpen = () => {
    //Chưa ở trạng thái update
    setCheckUpdate(false);
    if (props.categories && props.categories.length > 0) {
      var lsChildren = [];
      props.categories.map((category, index) => {
        if (chooseParent == category.name) {
          if (category.children && category.children.length > 0) {
            lsChildren = category.children.map((children, index) => {
              return children;
            });
            setChildrens(lsChildren);
          }
        }
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getProducts();
    props.getCategories();
  }, []);

  const btnCreate = () => {
    handleOpen();
  };

  const editProduct = product => {
    setCheckUpdate(true);
    setIdUpdate(product._id);
    setNameProduct(product.name);
    console.log("status update",product.status )
    setStatus(product.status=="Hoạt động"?true:false);
    if (product.categories != null) {
      setChooseParent(product.categories.parent.name);
      if (props.categories && props.categories.length > 0) {
        var lsChildren = [];
        props.categories.map((category, index) => {
          if (chooseParent !== category.name) {
            if (category.children && category.children.length > 0) {
              lsChildren = category.children.map((children, index) => {
                return children;
              });
              setChildrens(lsChildren);
            }
          }
        });
      }

      setSubParent(product.categories._id);
    }
    setOpen(true);
  };
  const deleteProduct = id => {
    try {
      props.deleteProduct(id);
      showMessage("success", "Xóa thành công!");
    } catch (error) {
      showMessage("info", "Xóa không thành công!");
    }
  };

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

  const columns = [
    {
      name: "name",
      label: "Tên sản phẩm"
    },
    {
      name: "categories.parent.name",
      label: "Loại cha"
    },
    {
      name: "categories.name",
      label: "Loại con"
    },
    {
      name: "inventory",
      label: "Số lượng tồn kho"
    },
    {
      name: "amountSold",
      label: "Số lượng bán ra"
    },
    {
      name:"favorited",
      label:'Lượt thích'
    },
    {
      name: "status",
      label: "Trạng thái"
    }
  ];

  const RenderDataTable = () => {
    const products = props.products;
    if (products && products.length > 0) {
      products.map((product, index) => {
        if (product.status) {
          products[index].status = "Hoạt động";
        } else products[index].status = "Ngưng";
        if (product.detail && product.detail.length > 0) {
          let inventory = 0;
          let amountSold = 0;
          product.detail.map((item, index) => {
            inventory += parseInt(item.inventory);
            amountSold += parseInt(item.amountSold);
          });
          products[index].inventory = inventory;
          products[index].amountSold = amountSold;
        } else {
          products[index].inventory = 0;
          products[index].amountSold = 0;
        }
      });
    }

    console.log("ahihi", products);
    return (
      <ReactMUIDatatable
        data={products}
        columns={columns}
        rowActions={({ row, rowIndex }) => (
          <React.Fragment>
            <IconButton
              onClick={() => {
                console.log("Xóa nè 2", row);
              }}
            >
              <Link
                to={{
                  pathname: `/admin/product-detail/${row._id}`
                }}
                style={{ color: "#6c6c6c" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton onClick={() => editProduct(row)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                deleteProduct(row._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        )}
      />
    );
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="outline-button" onClick={btnCreate}>
          Thêm mới
        </button>
      </div>
      <RenderDataTable />
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
            <h5 id="transition-modal-title">THÔNG TIN SẢN PHẨM </h5>
            <div id="transition-modal-description">
              <div>
                <label className={classes.label}>Tên sản phẩm</label>
                <input
                  className={classes.input}
                  value={nameProduct}
                  onChange={e => {
                    setNameProduct(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className={classes.label}>SL tồn kho</label>
                <input className={classes.input} value={0} onChange={e => {}} />
              </div>

              <div>
                <label className={classes.label}> Loại cha: </label>
                <select
                  className={classes.input}
                  value={chooseParent}
                  onChange={atcChooseParent}
                >
                  <option value="Giày nam">Giày nam</option>
                  <option value="Giày nữ">Giày nữ</option>
                </select>
              </div>
              <div>
                <label className={classes.label}>Loại Con: </label>
                <select
                  className={classes.input}
                  onChange={atcChooseSubParent}
                  value={subParent}
                >
                  {renderOption(childrens)}
                </select>
              </div>
              <div>
                <label
                  className={classes.label}
                  style={{ marginRight: "50px" }}
                >
                  Trạng thái
                </label>
                <input
                  type="checkbox"
                  checked={status}
                  onChange={e => {
                    setStatus(e.target.checked);
                  }}
                />
                Hoạt động
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="fill-button" onClick={handleClose}>
                  Hủy
                </button>
                <button className="fill-button" onClick={createProduct}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
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
    </>
  );
}

const stateMapToProps = (state, props) => {
  return {
    products: state.products,
    categories: state.categories
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getProducts: () => {
      dispatch(atcGetProductsRequest(false));
    },
    deleteProduct: id => {
      dispatch(atcDeleteProductRequest(id));
    },
    getCategories: () => {
      dispatch(atcGetCategoryRequest());
    },
    createProduct: product => {
      dispatch(atcCreateProductRequest(product));
    },
    updateProduct: (id, product) => {
      dispatch(atcUpdateProductRequest(id, product));
    },
    getProduct: product => {
      dispatch(atcGetProduct(product));
    },
    search: filter => {
      dispatch(atcSearchProductRequest(filter));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ManagerProduct);
