import React, { useState, useEffect } from "react";
import OrderList from "../../../customer/orderManager/orderList";
import "./style.css";
import { connect } from "react-redux";
import {
  atcGetUserByIdRequest,
  atcChangeRoleRequest
} from "../../../../actions";
import { Redirect } from "react-router-dom";

function DetailCustomer(props) {
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
    const id = props.match.params.id;
    props.getUserById(id);
  }, []);

  useEffect(() => {
    setUser(props.user);
    setRole(props.user.role);
  }, [props.user]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {isSave && <Redirect to ="/admin/customers"/>}
        <button className="outline-button" onClick={saveChangeRole}>
          Lưu
        </button>
      </div>
      <div>
        <h6 >THÔNG TIN KHÁCH HÀNG</h6>
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
          <h6> {user.name}</h6>
          <label>Địa chỉ</label>
          <h6>{user.address}</h6>
          <label>Địa chỉ ship</label>
          <h6>{user.shipAddress}</h6>
        </div>
        <div className="info-customer">
          <label>Email</label>
          <h6>{user.email}</h6>
          <label>SDT</label>
          <h6>{user.phone}</h6>
          {props.currentUser.role === "admin" && (
            <>
              <label>Quyền</label>
              <div>
                <select
                  value={role}
                  onChange={onChange}
                  style={{ width: "100px", height: "40px" }}
                >
                  <option value="customer">Khách hàng</option>
                  <option value="saleman">Nv bán hàng</option>
                  <option value="shipper">Shipper</option>
                  <option value="stocker">Thủ kho</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <OrderList userId={props.match.params.id} isManager={true} ></OrderList>
      </div>
    </div>
  );
}
const stateMapToProps = state => {
  return {
    user: state.customer,
    currentUser: state.user
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
export default connect(stateMapToProps, dispatchMapToProps)(DetailCustomer);
