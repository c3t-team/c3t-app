import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
import CustomerItem from "../customerItem";
import { connect } from "react-redux";
// import SearchBar from "material-ui-search-bar";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

import {
  actGetCustomerRequest,
  atcDeleteCustomerRequest,
  atcSearchUserRequets
} from "../../../../actions";
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#FAFAFA",
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

function ListCustomer(props) {
  useEffect(() => {
    props.getCustomers();
  }, []);

  const rendeCustomerItem = customers => {
    var result = "";

    if (customers && customers.length > 0) {
      console.log(customers, "ne");
      result = customers.map((customer, index) => {
        return (
          <CustomerItem
            key={index}
            customer={customer}
            index={index}
            deleteCustomer={props.deleteCustomer}
          ></CustomerItem>
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
      name: "address",
      label: "Địa chỉ"
    },
    {
      name: "phone",
      label: "Số điện thoại"
    }
  ];

  const RenderDataTable = () => {
    return (
      <ReactMUIDatatable
        data={props.customers}
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
                  pathname: `/admin/customers/${row._id}`
                }}
                style={{ color: "#6c6c6c" }}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => {
                console.log("Xóa nè 1", row);
                props.deleteCustomer(row._id);
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
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "20px"
        }}
      >
        <div style={{ width: "400px" }}>
          <SearchBar
            hintText="Tìm kiếm nhà cung cấp"
            onChange={text => setFilter(text)}
            onRequestSearch={search}
            style={{
              margin: "0 auto",
              maxWidth: 400
            }}
            value={filter}
          />
        </div>
        <div>
          <button className="cancel-search" onClick={clearSearch}>
            Hủy tìm kiếm
          </button>
        </div>
      </div>

      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell align="center">Tên Khách hàng</StyledTableCell>
            <StyledTableCell align="center">Địa chỉ</StyledTableCell>
            <StyledTableCell align="center">SDT</StyledTableCell>
            <StyledTableCell align="center">Chi tiết</StyledTableCell>
            <StyledTableCell align="center">Xóa</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rendeCustomerItem(customers)}</TableBody>
      </Table> */}
      <RenderDataTable />
    </>
  );
}

const stateMapToProps = state => {
  return {
    customers: state.customers
  };
};

const dispatchMapToProps = (dispatch, state) => {
  return {
    getCustomers: () => {
      dispatch(actGetCustomerRequest());
    },
    deleteCustomer: id => {
      dispatch(atcDeleteCustomerRequest(id));
    },
    search: (filter, kind) => {
      dispatch(atcSearchUserRequets(filter, kind));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ListCustomer);
