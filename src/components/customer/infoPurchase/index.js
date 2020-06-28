import React, { useState, useEffect } from "react";
import Carts from "../cart";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
// import { atcGetCurentUserRequest } from "../../../actions";
import "./style.css";

const useStyles = makeStyles(theme => ({
  paddingLabel: {
    margin: "auto"
  },
  width100: {
    marginBottom: "20px",
    width: "80%"
  }
}));

function InfoPurchase(props) {
  const classes = useStyles();
  const [user, setUser] = useState(props.currentUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [phone, setPhone] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   props.getCurrentUser(token);
  // }, []);

  useEffect(() => {
    const temp = props.currentUser;
    setUser(temp);
    setName(temp.name);
    setEmail(temp.email);
    setPhone(temp.phone);
    setShipAddress(temp.shipAddress);
  }, [props.currentUser]);

  return (
    <div className ="container-purchase" >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          sm={10}
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <h6>THÔNG TIN KHÁCH HÀNG</h6>
        </Grid>
        <Grid item sm={5} xs={12} className="infor-purchase">
          <FormControl style={{ width: "100%" }}>
            <InputLabel
              htmlFor="adornment-userName"
              className={classes.paddingLabel}
            >
              Username
            </InputLabel>
            <Input
              id="adornment-address"
              className={classes.width100}
              name="name"
              value={name}
              readOnly
            />
          </FormControl>
          <FormControl style={{ width: "100%" }}>
            <InputLabel
              htmlFor="adornment-address"
              className={classes.paddingLabel}
            >
              Địa chỉ nhận
            </InputLabel>
            <Input
              id="adornment-userName"
              className={classes.width100}
              name="shipAddress"
              value={shipAddress}
              readOnly
            />
          </FormControl>
        </Grid>
        <Grid item sm={5} xs={12} className="infor-purchase">
          <FormControl style={{ width: "100%" }}>
            <InputLabel
              htmlFor="adornment-emial"
              className={classes.paddingLabel}
            >
              Email
            </InputLabel>
            <Input
              id="adornment-email"
              className={classes.width100}
              name="email"
              value={email}
              readOnly
            />
          </FormControl>

          <FormControl style={{ width: "100%" }}>
            <InputLabel
              htmlFor="adornment-phone"
              className={classes.paddingLabel}
            >
              Số điện thoại
            </InputLabel>
            <Input
              id="adornment-phone"
              className={classes.width100}
              name="phone"
              value={phone}
              readOnly
            />
          </FormControl>
        </Grid>

        <Grid
          item
          sm={10}
          xs={12}
          direction="column"
          justify="flex-start"
          alignItems="center"
        ></Grid>
        <Grid sm={10}  xs={12} item>
          <div style={{ overflowX: "auto" }}>
            <Carts buy={true}></Carts>
          </div>
        </Grid>
      </Grid>
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
    // getCurrentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(InfoPurchase);
