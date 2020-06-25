import React, { useState, useEffect } from "react";
import OrderList from "../../../customer/orderManager/orderList";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import "./style.css";
import {
  atcGetUserByIdRequest,
  atcChangeRoleRequest
} from "../../../../actions";
import { Redirect } from "react-router-dom";

function DetailEmployee(props) {
  const [role, setRole] = useState("");
  const [user, setUser] = useState(props.user);
  const [isSave, setIsSave] = useState(false);

  const onChange = e => {
    setRole(e.target.value);
  };

  const saveChangeRole = () => {
    let id = props.match.params.id;
    props.changeRole(id, role);
    setIsSave(true);
  };
  useEffect(() => {
    console.log("id", props.match.params.id);
    props.getUserById(props.match.params.id);
  }, []);

  useEffect(() => {
    //Loi, khong nhan gia tri
    setUser(props.user);
    setRole(props.user.role);
  }, [props.user]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {isSave && <Redirect to = "/admin/employees"/>}
        <button className="outline-button" onClick={saveChangeRole}>
          Lưu
        </button>
      </div>
      <div>
        <h6 >THÔNG TIN NHÂN VIÊN</h6>
      </div>
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
          <h6>{user.name}</h6>
          <label>Địa chỉ</label>
          <h6>
            {" "}
            <h6>{user.address}</h6>
          </h6>
          <label>Địa chỉ ship</label>
          <h6>{user.shipAddress}</h6>
        </div>
        <div className="info-customer">
          <label>Email</label>
          <h6>{user.email}</h6>
          <label>SDT</label>
          <h6>{user.phone}</h6>
          {/* <label>Tình trạng</label>
          <div>
            <select>
              <option>Đang hoạt động</option>
              <option>Tạm nghỉ</option>
            </select>
          </div> */}
          <label>Quyền</label>
          <div>
            <select
              value={role}
              onChange={onChange}
              style={{ width: "150px", height: "40px" }}
            >
              <option value="customer">Khách hàng</option>
              <option value="saleman">Nv bán hàng</option>
              <option value="shipper">Shipper</option>
              <option value="stocker">Thủ kho</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <OrderList  userId={props.match.params.id} isManager={true}></OrderList>
      </div>
    </div>
  );
}
const stateMapToProps = state => {
  return {
    user: state.customer
  };
};

const dispatchMapToProps = (dispatch, props) => {
  return {
    changeRole: (id, role) => {
      dispatch(atcChangeRoleRequest(id, role));
    },
    getUserById: id => {
      dispatch(atcGetUserByIdRequest(id));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(DetailEmployee);
