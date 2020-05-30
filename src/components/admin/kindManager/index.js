import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import KindItem from "./kindItem";
import SnackbarContentWrapper from "../../message";
import Snackbar from "@material-ui/core/Snackbar";
import {
  atcGetCategoryRequest,
  atcCreateCaregoryRequest,
  atcUpdateCaregoryRequest,
  atcDeleteCaregoryRequest
} from "../../../actions";
import "./style.css";
import { connect } from "react-redux";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FFFFFF",
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
    width: "300px",
    height: "30px"
  },
  label: {
    width: "80px"
  }
}));

function KindManager(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [parent, setParent] = useState("Giày nam");
  const [nameCategory, setNameCategory] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [variantMessage, setVariantMessage] = useState("info");
  const [validateCategory, setValidateCategory] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const openCatelogy = () => {
    setIdUpdate("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.getCategories();
  }, []);

  useEffect(() => {}, [props.categories]);

  const renderCategoryItem = categories => {
    var result = "";
    if (categories && categories.length > 0) {
      result = categories.map((category, index) => {
        return (
          <KindItem
            key={index}
            category={category}
            edit={editCategory}
            delete={deleteCategory}
          ></KindItem>
        );
      });
    }
    return result;
  };

  const deleteCategory = id => {
    try {
      props.deleteCategory(id);
      showMessage("success", "xóa thành công!");
    } catch (error) {
      showMessage("info", "Xóa không thành công!");
    }
  };
  const editCategory = categoryedit => {
    if (props.categories && props.categories.length > 0) {
      props.categories.map((category, index) => {
        if (categoryedit.parent == category._id) {
          setParent(category.name);
        }
      });
    }
    setNameCategory(categoryedit.name);
    setIdUpdate(categoryedit._id);
    handleOpen();
  };

  const createCategory = () => {
    if (nameCategory.length > 0) {
      var id = "";
      if (props.categories && props.categories.length > 0) {
        props.categories.map((category, index) => {
          if (parent == category.name) {
            id = category._id;
          }
        });
      }

      let category = {
        parent: id,
        name: nameCategory
      };
      if (idUpdate.length > 0) {
        try {
          props.updatecategory(idUpdate, category);
          showMessage("success", "Cập nhập thành công!");
        } catch (error) {
          showMessage("info", "Cập nhập không thành công!");
        }
      } else {
        try {
          props.createCategory(category);
          showMessage("success", "Tạo thành công!");
        } catch (error) {
          showMessage("info", "Tạo không thành công!");
        }
      }
      handleClose();
    } else {
      setValidateCategory(true);
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

  const FormError = props => {
    if (props.isHidden) {
      return null;
    }
    return (
      <div className="form-warning">
        <i> {props.errorMessage} </i>
      </div>
    );
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="outline-button" onClick={openCatelogy}>
          Thêm loại
        </button>
      </div>
      <div>
        {/* <h6>DANH SÁCH LOẠI</h6>
        <div
          style={{
            width: "10%",
            height: "4px",
            backgroundColor: "#F75F00",
            marginBottom: "30px"
          }}
        ></div> */}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Loại con</StyledTableCell>
              <StyledTableCell align="center">Loại cha</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderCategoryItem(props.categories)}</TableBody>
        </Table>
      </div>
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
            <h5 id="transition-modal-title">
              {" "}
              {idUpdate.length > 0 ? "Cập nhập phân loại" : "Thêm phân loại"}
            </h5>
            <div id="transition-modal-description">
              <div>
                <label className={classes.label}>Loại cha</label>
                <select
                  className={classes.input}
                  onChange={e => {
                    setParent(e.target.value);
                  }}
                  value={parent}
                >
                  <option value="Giày nam">Giày nam</option>
                  <option value="Giày nữ">Giày nữ</option>
                </select>
              </div>
              <div>
                <label className={classes.label}>Tên loại</label>
                <input
                  className={classes.input}
                  value={nameCategory}
                  onChange={e => {
                    setNameCategory(e.target.value);
                  }}
                />
                <FormError
                  isHidden={validateCategory}
                  errorMessage="Tên loại không được bỏ trống"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="fill-button" onClick={handleClose}>
                  Hủy
                </button>
                <button className="fill-button" onClick={createCategory}>
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
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    categories: state.categories
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getCategories: () => {
      dispatch(atcGetCategoryRequest());
    },
    createCategory: category => {
      dispatch(atcCreateCaregoryRequest(category));
    },
    updatecategory: (id, category) => {
      dispatch(atcUpdateCaregoryRequest(id, category));
    },
    deleteCategory: id => {
      dispatch(atcDeleteCaregoryRequest(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(KindManager);
