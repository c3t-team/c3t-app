import { connect } from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import { IconButton } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  actGetEmployeeRequest,
  atcSearchUserRequets,
  atcDeleteEmployeeRequest
} from "../../../../actions";
import { ReactMUIDatatable } from "react-material-ui-datatable";
import { Link } from "react-router-dom";



function ListEmployee(props) {
  const [dataSource, setDataSource] = useState([]);

  useEffect( ()=> {
      props.getCustomers();
  }, []);

  useEffect(() => {
    setDataSource([...props.employees]);
  }, [props.employees]);

  
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
    },
    {
      name: "role",
      label: "Quyền"
    }
  ];

  const RenderDataTable = () => {
    let arr = [];
    if (dataSource && dataSource.length > 0) {
      arr = dataSource.filter(
        employee => (props.role == employee.role || props.role == "ALL")
      );
    }
    {console.log(arr)}
    return (
      <>
      <ReactMUIDatatable
        data={arr}
        columns={columns}
        rowActions={({ row, rowIndex }) => (
          <React.Fragment>
            <IconButton
              onClick={() => {
              }}
            >
             
              <Link
                to={{
                  pathname: `/admin/employees/${row._id}`
                }}
                style = {{color:'#6c6c6c'}}
              >
                <VisibilityIcon />
              </Link>
            </IconButton>
            <IconButton
              onClick={() => {
                props.deleteCustomer(row._id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </React.Fragment>
        )}
      />
      </>
    );
  };

  return (
    <div>
     <RenderDataTable/>
    </div>
  );
}

const stateMapToProps = state => {
  return {
    employees: state.customers
  };
};

const dispatchMapToProps = (dispatch, state) => {
  return {
    getCustomers: () => {
      dispatch(actGetEmployeeRequest());
    },
    search: (filter, kind) => {
      dispatch(atcSearchUserRequets(filter, kind));
    },
    deleteCustomer: id => {
      dispatch(atcDeleteEmployeeRequest(id));
    },
  };
};

export default connect(stateMapToProps, dispatchMapToProps)(ListEmployee);
