import React, { useEffect, useState } from "react";
import "./style.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
   atcGetCurentUserRequest,
  atcUpdateUserRequest
} from "../../../actions";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350
  },
  containerTextField: {
    display: "flex",
    justifyItems: "center",
    justifyContent: "flex-start"
  },
  butonSave: {
    color: "#ffffff",
    marginTop: "30px",
    backgroundColor: "#D9A128",
    padding: "8px",
    width: "100px",
    border: "none"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50px",
    marginBottom: "10px"
  },
  textChange: {
    margin: 0
  },

  containerInfo: {
    display: "flex"
  }
}));
function InforCustomer(props) {
  const classes = useStyles();
  const [user, setUser] = useState(props.user);
  const [disName, setdisName] = useState(true);
  const [disEmail, setdisEmail] = useState(true);
  const [disPhone, setdisPhone] = useState(true);
  const [disAddress, setdisAddress] = useState(true);
  const [disShipAddress, setdisShipAddress] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const [data, setData] = useState(new FormData());
  const [url, setUrl] = useState({});
  let fileListAvata;
  const onChangeImage = e => {
    const file = e.target.files[0];
    setUrl({});
    data.append("image", file);
    data.append("id", "5dbede03a5592c2698f1992d");

    let reader = new FileReader();
    reader.onload = () => {
      const _url = {
        imagePreviewUrl: reader.result
      };
      setUrl(_url);
    };
    reader.readAsDataURL(file);
    setData(data);
    console.log("url", url);
    console.log("data", data);
  };
  const updateUser = () => {
    let user = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      shipAddress: shipAddress
    };
    props.updateUser(currentUser._id, user);
    setdisAddress(true);
    setdisEmail(true);
    setdisName(true);
    setdisShipAddress(true);
    setdisPhone(true);
  };

  const [currentUser, setCurrentUser] = useState(props.currentUser);

  useEffect(() => {
    let token = localStorage.getItem("token");
    props.getCurrentUser(token);
  }, []);

  useEffect(() => {
    setCurrentUser(props.currentUser);
    setName(currentUser.name);
    setEmail(currentUser.email);
    setAddress(currentUser.address);
    setShipAddress(currentUser.shipAddress);
    setPhone(currentUser.phone);
    if (props.currentUser.avatar) {
      setAvatar(
        `http://localhost:1337/images/temp/${props.currentUser.avatar}`
      );
    }
  }, [props.currentUser]);

  return (
    <div className="container-profile">
      <h5 style={{ marginTop: "10px", color: "#2b2b28" }}>HỒ SƠ CỦA TÔI</h5>
      <div
        style={{
          width: "10%",
          height: "4px",
          backgroundColor: "#e3b04b",
          marginBottom: "30px"
        }}
      ></div>
      <div className={classes.containerInfo}>
        <div style={{ width: "100%" }}>
          <div className={classes.containerTextField}>
            <TextField
              id="standard-name"
              label="Họ và tên"
              className={classes.textField}
              margin="normal"
              style={{ marginTop: "30px" }}
              disabled={disName}
              name="name"
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />

            <div className="change-infor">
              <p
                className={classes.textChange}
                onClick={() => {
                  setdisName(false);
                }}
              >
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div className={classes.containerTextField}>
            <TextField
              id="standard-name"
              label="Email"
              className={classes.textField}
              margin="normal"
              disabled={disEmail}
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <div
              className="change-infor"
              onClick={() => {
                setdisEmail(false);
              }}
            >
              <p className={classes.textChange}>
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div className={classes.containerTextField}>
            <TextField
              id="standard-name"
              label="Số điện thoại"
              className={classes.textField}
              margin="normal"
              disabled={disPhone}
              name="phone"
              value={phone}
              onChange={e => {
                setPhone(e.target.value);
              }}
            />
            <div
              className="change-infor"
              onClick={() => {
                setdisPhone(false);
              }}
            >
              <p className={classes.textChange}>
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div className={classes.containerTextField}>
            <TextField
              id="standard-name"
              label="Địa chỉ"
              className={classes.textField}
              margin="normal"
              disabled={disAddress}
              name="address"
              value={address}
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
            <div
              className="change-infor"
              onClick={() => {
                setdisAddress(false);
              }}
            >
              <p className={classes.textChange}>
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <div className={classes.containerTextField}>
            <TextField
              id="standard-name"
              label="Địa chỉ nhận hàng"
              className={classes.textField}
              margin="normal"
              name="shipAddress"
              value={shipAddress}
              disabled={disShipAddress}
              onChange={e => {
                setShipAddress(e.target.value);
              }}
              name="shipAddress"
            />
            <div
              className="change-infor"
              onClick={() => {
                setdisShipAddress(false);
              }}
            >
              <p className={classes.textChange}>
                <i>Thay đổi</i>
              </p>
            </div>
          </div>
          <button className={classes.butonSave} onClick={updateUser}>
            Lưu
          </button>
        </div>
        <div className="upload-img">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              width: 200,
              alignItems: "end",
              marginLeft: "30px"
            }}
          >
            <div
              style={{ marginBottom: "20px" }}
              onClick={() => fileListAvata.click()}
            >
              <div>
                {url && (
                  <img src={url.imagePreviewUrl} className="imgProduct" />
                )}
              </div>
            </div>
            <input
              ref={e => (fileListAvata = e)}
              type="file"
              className="d-none"
              onChange={onChangeImage}
            />
            <button
              className="outline-button"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:1337/api/v1/uploads/images/avatar",
                    data,
                    {
                      // receive two    parameter endpoint url ,form data
                    }
                  )
                  .then(res => {
                    console.log("imageL:", res);
                    console.log("avater id", currentUser._id);
                    console.log("aaaxx", res.data.payload);
                    axios
                      .put(
                        `http://localhost:1337/api/v1/users/avatar/${currentUser._id}`,
                        { avatar: res.data.payload }
                      )
                      .then(res => {
                        console.log("update avatar", res);
                        // window.location.reload();
                        let token = localStorage.getItem("token");
                        props.getCurrentUser(token);
                      });
                  })
                  .catch(err => {
                    console.log("Loi", err);
                  });
              }}
            >
              upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const stateMapToProps = (state, props) => {
  return {
    currentUser: state.user
  };
};
const dispatchMapToProps = (dispatch, props) => {
  return {
    getCurrentUser: token => {
      dispatch(atcGetCurentUserRequest(token));
    },
    updateUser: (id, user) => {
      dispatch(atcUpdateUserRequest(id, user));
    }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(InforCustomer);
