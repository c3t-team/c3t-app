import * as Types from "../constants/actionType";

var inintState = [
  {
    inventory: 0,
    amountSold: 0,
    _id: "",
    color: "",
    size: "",
    price: 0
  }
];

const detailProduct = (state = inintState, action) => {
  switch (action.type) {
    case Types.GET_DETAIL_PRODUCT:
      state = action.detailProduct.length > 0 ? action.detailProduct : state;
      return state;

    default:
      return state;
  }
};

export default detailProduct;
