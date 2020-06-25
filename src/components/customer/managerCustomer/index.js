/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import "./style.css";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Route, Switch, Link } from "react-router-dom";
import InforCustomer from "../infoCustomer";
import OrderList from "../orderManager/orderList";
import ProductFavorite from "../productFavorite";
import avatar from "../../../assets/image/avatar.JPG";
// import { atcGetCurentUserRequest } from "../../../actions";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    marginBottom: "50px"
  },
  navbar: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    height: "400px",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
  },
  inforCustomer: {
    marginLeft: "60px",
    width: "70%"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px",
    color: "#000000",
    fontWeight: 500
  },
  acount: {
    marginBottom: "20px",
    marginLeft: "20px",
    marginRight: "20px"
  },
  myOrder: {
    marginLeft: "20px",
    marginRight: "20px",
    marginBottom: "20px"
  },
  myFavorite: {
    marginLeft: "20px",
    marginRight: "20px"
  },
  myAdmin: {
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px"
  },
  imgInfor: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
    marginTop: "10%"
  },
  icon: {
    fontSize: "30px",
    color: "#D9A128",
    marginRight: "10px"
  },
  link: {
    textDecoration: "none",
    color: "#000000",
    "&:hover": {
      textDecoration: "none",
      textTransform: "none",
      color: "#D9A128"
    }
  }
}));
function ManagerCustomer(props) {
  const classes = useStyles();
  useEffect(() => {
    // let token = localStorage.getItem("token");
    // console.log(token);
    // props.getCurrentUser(token);
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, []);

  const [avatar, setAvater] = useState(
    "http://localhost:1337/images/temp/upload-1574355179631.png"
  );

  const [currentUser, SetCurrentUser] = useState(props.currentUser);

  useEffect(() => {
    SetCurrentUser(props.currentUser);
    console.log("1", props.currentUser);
    if (props.currentUser.avatar)
      setAvater(
        `http://localhost:1337/images/temp/${props.currentUser.avatar}`
      );
  }, [props.currentUser]);

  return (
    <div className={classes.container}>
      <div className={classes.navbar} className="navabar-customer">
        <div className={classes.info}>
          <div className={classes.imgInfor}>
            <img
              src={avatar}
              style={{ width: "100%", height: "100%", borderRadius: "40px" }}
              alt="image"
            />
          </div>
          <p>{props.currentUser.name}</p>
        </div>
        <div className={clsx(classes.acount, "action-hover")}>
          <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
          <Link
            to={{
              pathname: "/my-acount/profile"
            }}
            className={classes.link}
          >
            Tài khoản của tôi
          </Link>
        </div>
        <div className={clsx("action-hover", classes.myOrder)}>
          <DescriptionIcon className={classes.icon}></DescriptionIcon>
          <Link
            to={{
              pathname: "/my-acount/orders"
            }}
            className={classes.link}
          >
            Đơn mua
          </Link>
        </div>
        <div className={clsx("action-hover", classes.myFavorite)}>
          <FavoriteIcon className={classes.icon}></FavoriteIcon>
          <Link
            to={{
              pathname: "/my-acount/products-favorite"
            }}
            className={classes.link}
          >
            Sản phẩm yêu thích
          </Link>
        </div>
        {props.currentUser.role != "customer" && (
          <div className={clsx("action-hover", classes.myAdmin)}>
            <BusinessCenterIcon className={classes.icon}></BusinessCenterIcon>
            <Link
              to={{
                pathname: "/admin"
              }}
              className={classes.link}
            >
              Đi tới trang admin
            </Link>
          </div>
        )}
      </div>
      <div className={classes.inforCustomer}>
        <Switch>
          <Route path="/my-acount/profile" component={InforCustomer}></Route>
          <Route path="/my-acount/orders" component={OrderList}></Route>
          <Route
            path="/my-acount/products-favorite"
            component={ProductFavorite}
          ></Route>
          <Route path="**" component={InforCustomer}></Route>
        </Switch>
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
    // getCurrentUser: token => {
    //   dispatch(atcGetCurentUserRequest(token));
    // }
  };
};
export default connect(stateMapToProps, dispatchMapToProps)(ManagerCustomer);
