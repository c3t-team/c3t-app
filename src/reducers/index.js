import { combineReducers } from "redux";
import login from "./login";
import sign from "./sign";
import customers from "./customers";
import categories from "./categorys";
import products from "./products";
import supliers from "./supliers";
import productSupliers from "./productSupliers";
import suplier from "./suplier";
import detailProduct from "./detailProduct";
import ordersSuplier from "./ordersSuplier";
import detailOrderSuplier from "./detailOrderSuplier";
import user from "./user";
import product from "./product";
import countCart from "./countCart";
import totalPrice from "./totalPrice";
import orderCustomer from "./orderCutomer";
import orders from "./orders";
import order from "./order";
import favoriteProducts from "./favoriteProducts";
import customer from "./customer";
import message from "./message";
import priceAndInventoyAll from './priceAndInventoryAll';
import saveOrderSuplier from './saveOrderSuplier'
const reducerControler = combineReducers({
  login,
  sign,
  customers,
  categories,
  products,
  product,
  supliers,
  productSupliers,
  suplier,
  detailProduct,
  ordersSuplier,
  detailOrderSuplier,
  user,
  countCart,
  totalPrice,
  orderCustomer,
  orders,
  order,
  favoriteProducts,
  customer,
  message,priceAndInventoyAll,
  saveOrderSuplier
});

export default reducerControler;
