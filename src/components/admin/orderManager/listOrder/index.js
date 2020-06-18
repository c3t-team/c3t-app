import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import OrderItem from "../orderItem";
import { atcGetListOrderRequest, atcDeleteOrder } from "../../../../actions";
import { connect } from "react-redux";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

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

function ListOrder(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState(props.orders);

  useEffect(() => {
    setOrders([...props.orders]);
  }, [props.orders]);

  useEffect(() => {
    props.getOrders();
  }, []);

  const renderOrderItem = () => {
    var result = [];
    console.log("oo", orders);
    if (orders && orders.length > 0) {
      result = orders.map((order, index) => {
        if (order.products.length > 0)
          return (
            <OrderItem
              key={index}
              order={order}
              index={index}
              status={props.status}
            />
          );
      });
    }
    return result;
  };

  const columns = [
    {
      name: "name",
      label: "Tên khách hàng"
    },
    {
      name: "shipAddress",
      label: "Địa chỉ"
    },
    {
      name: "createdAt",
      label: "Thời gian tao"
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
    console.log("order-detail", orders);
    let data = [];
    if (orders && orders.length > 0) {
      data = orders
        .filter(order => props.status == order.status || props.status == "ALL")
        .sort(compare)
        .map((order, index) => {
          order.createdAt = new Date(order.createdAt).toDateString(
            "yyyy-MM-dd"
          );
          return order;
        });
    }
    return (
      <ReactMUIDatatable
        data={data}
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
                  pathname: `/admin/order-detail/${row._id}`
                }}
                style={{ color: "#6c6c6c" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => {
                props.deleteOrder(row._id);
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
    <div>
      <RenderDataTable />
    </div>
  );
}
const stateMapToProps = (state, props) => {
  return {
    orders: state.orders
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getOrders: () => {
      dispatch(atcGetListOrderRequest());
    },
    deleteOrder: id => {
      dispatch(atcDeleteOrder(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ListOrder);
