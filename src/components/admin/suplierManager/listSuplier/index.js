import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { connect } from "react-redux";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {
  atcGetSuplierRequest,
  atcCreateSuplierRequest,
  atcDeleteSuplierRequest,
  atcGetSuplier,
  atcUpdateSuplierRequest
} from "../../../../actions";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
    marginLeft: "10px",
    width: "300px",
    height: "30px",
    border: "1px solid #000000"
  },
  label: {
    width: "100px"
  }
}));

function ListSuplier(props) {
  const classes = useStyles();
  const supliers = props.supliers;
  const [open, setOpen] = useState(false);
  const [suplier, setSuplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const [idUpdate, setIdUpdate] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = event => {
    setSuplier({
      ...suplier,
      [event.target.name]: event.target.value
    });
  };

  const createSuplier = e => {
    e.preventDefault();
    if (isUpdate) {
      props.updateSUplier(idUpdate, suplier);
      setIsUpdate(false);
      setIdUpdate(null);
      const temp = {
        name: "",
        email: "",
        phone: "",
        address: ""
      };

      setSuplier(temp);
    } else {
      props.createSuplier(suplier);
    }

    handleClose();
  };

  const updateSuplier = suplier => {
    setIsUpdate(true);
    console.log("supliertrrr", suplier);
    setIdUpdate(suplier._id);
    const temp = {
      name: suplier.name,
      email: suplier.email,
      phone: suplier.phone,
      address: suplier.address
    };
    setSuplier(temp);
    setOpen(true);
  };
  useEffect(() => {
    props.getSupliers();
  }, []);

  const columns = [
    {
      name: "name",
      label: "Tên nhà cung cấp"
    },
    {
      name: "address",
      label: "Địa chỉ"
    },
    {
      name: "phone",
      label: "Số điện thoại"
    },
    {
      name: "email",
      label: "Email"
    }
  ];

  const RenderDataTable = () => {
    return (
      <ReactMUIDatatable
        data={props.supliers}
        columns={columns}
        rowActions={({ row, rowIndex }) => (
          <React.Fragment>
            <IconButton onClick={() => {}}>
              <Link
                to={{
                  pathname: `/admin/supliers/${row._id}`
                }}
                style={{ color: "#6c6c6c" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => {
                props.deleteSuplier(row._id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                updateSuplier(row);
              }}
            >
              <EditIcon />
            </IconButton>
          </React.Fragment>
        )}
      />
    );
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="outline-button" onClick={handleOpen}>
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
            <h3 id="transition-modal-title">Thông tin nhà cung cấp</h3>
            <div id="transition-modal-description">
              <form onSubmit={createSuplier}>
                <div>
                  <label className={classes.label}>Tên NCC</label>
                  <input
                    className={classes.input}
                    name="name"
                    value={suplier.name}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label className={classes.label}>Địa chỉ</label>
                  <input
                    className={classes.input}
                    name="address"
                    value={suplier.address}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label className={classes.label}>SDT</label>
                  <input
                    type="tel"
                    className={classes.input}
                    name="phone"
                    value={suplier.phone}
                    onChange={onChange}
                    required
                  />
                </div>
                <div>
                  <label className={classes.label}>Email</label>
                  <input
                    className={classes.input}
                    name="email"
                    type="email"
                    value={suplier.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    className="fill-button"
                    onClick={() => setOpen(false)}
                  >
                    Hủy
                  </button>
                  <button className="fill-button" type="submit">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const stateMapToProps = state => {
  return {
    supliers: state.supliers
  };
};

const dispatchMapToProps = (dispatch, state) => {
  return {
    getSupliers: () => {
      dispatch(atcGetSuplierRequest());
    },
    getSuplier: suplier => {
      dispatch(atcGetSuplier(suplier));
    },
    createSuplier: suplier => {
      dispatch(atcCreateSuplierRequest(suplier));
    },
    deleteSuplier: id => {
      dispatch(atcDeleteSuplierRequest(id));
    },
    updateSUplier: (id, data) => {
      dispatch(atcUpdateSuplierRequest(id, data));
    }
  };
};

export default connect(stateMapToProps, dispatchMapToProps)(ListSuplier);
