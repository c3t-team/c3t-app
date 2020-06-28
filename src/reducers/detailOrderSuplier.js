import * as Types from "../constants/actionType";

var inintState = {
  products: [],
  totalPrice: 120000,
  suplierId: {
    products: [],

    phone: "",
    email: "",
    address: "",
    name: ""
  },
  employee: {
    email: "",
    name: "",
    phone: ""
  }
};

const detailOrderSuplier = (state = inintState, action) => {
  switch (action.type) {
    case Types.GET_DETAIL_ORDER_SUPLIER:
      state = action.detailOrderSuplier;
      return state;

    default:
      return state;
  }
};

export default detailOrderSuplier;
