import * as Types from "../constants/actionType";
var initState = [];

const orderCustomer = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_ORDER_CUSTOMERS:
      state = action.orders;
      return state;
    default:
      return state;
  }
};

export default orderCustomer;
