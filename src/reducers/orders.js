import * as Types from "../constants/actionType";
var initState = [];

const orders = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_ORDERS:
      state = action.orders;
      return state;
    default:
      return state;
  }
};

export default orders;
