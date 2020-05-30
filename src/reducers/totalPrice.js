import * as Types from "../constants/actionType";
var initState = 0;

const totalPrice = (state = initState, action) => {
  switch (action.type) {
    case Types.TOTAL_PRICE:
      console.log(state,'price')
    state = state + action.price;
      return state;
    default:
      return state;
  }
};

export default totalPrice;
