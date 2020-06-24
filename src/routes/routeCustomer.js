import React, { useState, useEffect } from "react";
import CustomHomePage from "../pages/customerPage";
import { Route, Switch } from "react-router-dom";
import ProductDetailPage from "../pages/customerPage/productDetailPage";
import Navbars from "../components/customer/navbars";
import Footer from "../components/Footer";
import CartPage from "../pages/customerPage/cartPage";
import InfoPurchasePage from "../pages/customerPage/inforPurchasePage";
import ProfilePage from "../pages/customerPage/profilePage";
import IntroducePage from "../pages/introducePage";
import { connect } from "react-redux";
import NotFoundPage from "../pages/notFound";

function CustomerRoute(props) {
  const [countCarts, setCountCarts] = useState(0);
  const [role, setRole] = useState("");

  useEffect(() => {
    if (props.curentUser) {
      // setUser(props.curentUser);
      // const temp = rules[props.curentUser.role];
      // if (temp && temp.routes.length > 0)
      // {
      //   setRoutes([...temp.routes]);
      //   console.log("test role", temp.routes);
      // }
      // console.log("test role n", temp);
      setRole(props.curentUser.role);
    }
    console.log("role", role);
  }, [props.curentUser]);
  return (
    <div>
      <Navbars countCarts={countCarts}></Navbars>
      <Switch>
        <Route path="/cart" component={CartPage} />
        {role && (
          <Route path="/product/purchase" component={InfoPurchasePage} />
        )}
        <Route path="/product-detail/:id" component={ProductDetailPage} />
        {role && <Route path="/my-acount" component={ProfilePage} />}
        <Route path="/introduce" component={IntroducePage} />
        <Route path="/" component={CustomHomePage} exact={true} />
        <Route path="**" component={NotFoundPage} />
      </Switch>
      <div className="mt-2">
        <Footer></Footer>
      </div>
    </div>
  );
}

const stateMapToProps = (state, props) => {
  return {
    curentUser: state.user
  };
};
export default connect(stateMapToProps, null)(CustomerRoute);
