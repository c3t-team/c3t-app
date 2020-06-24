import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import OrderStockItem from "../orderStockItem";
import SearchBar from "material-ui-search-bar";
import { connect } from "react-redux";
import {
  atcGetOrderSuplierRequest,
  atcGetDetailOrderSuplier,
  atcDeleteOrderSuplier
} from "../../../../actions/";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
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
  }
}));

function OrderStockList(props) {
  const classes = useStyles();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    props.getOrdersSuplier("An");
  }, []);

  useEffect(() => {
    console.log("ordersSuplier ne", props.ordersSuplier);
  }, [props.ordersSuplier]);

  const columns = [
    {
      name: "suplierId.name",
      label: "Nhà cung cấp"
    },
    {
      name: "suplierId.phone",
      label: "Số điện thoại"
    },
    {
      name: "totalPrice",
      label: "Tổng giá trị"
    },
    {
      name: "createdAt",
      label: "Thời gian tạo"
    },
    {
      name: "employee.name",
      label: "Người tạo"
    },
    {
      name: "status",
      label: "Trạng thái"
    }
  ];
  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const orderA = a.createdAt.toUpperCase();
    const orderB = b.createdAt.toUpperCase();

    let comparison = 0;
    if (orderA < orderB) {
      comparison = 1;
    } else if (orderA >= orderB) {
      comparison = -1;
    }
    return comparison;
  };

  const RenderDataTable = () => {
    console.log("stockordekakar", props.ordersSuplier);
    let data = [];
    console.log("status", props.status);
    if (props.ordersSuplier && props.ordersSuplier.length > 0) {
      const temp = props.ordersSuplier;
      data = temp
        .filter(order => order.status == props.status || props.status == "ALL")
        .sort(compare)
        .map((order, index) => {
          order.createdAt = new Date(order.createdAt).toDateString(
            "yyyy-MM-dd"
          );
          order.totalPrice = parseInt(order.totalPrice)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$&,");
          return order;
        });
    }

    return (
      <ReactMUIDatatable
        data={data}
        columns={columns}
        rowActions={({ row, rowIndex }) => (
          <React.Fragment>
            <IconButton onClick={() => {}}>
              <Link
                to={{
                  pathname: `/admin/stock-orders/${row._id}`
                }}
                style={{ color: "#6c6c6c" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => {
                props.deleteOrderSuplier(row._id);
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
      <RenderDataTable />
    </>
  );
}

const stateMapToProps = (state, props) => {
  return {
    ordersSuplier: state.ordersSuplier
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    getOrdersSuplier: filter => {
      dispatch(atcGetOrderSuplierRequest(filter));
    },
    getDetailOrderSuplier: order => {
      dispatch(atcGetDetailOrderSuplier(order));
    },
    deleteOrderSuplier: id => {
      dispatch(atcDeleteOrderSuplier(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(OrderStockList);
