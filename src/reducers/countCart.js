import * as Types from "../constants/actionType";
var initState = 0;

const countCart = (state = initState, action) => {
  switch (action.type) {
    case Types.COUNT_CARTS:
      console.log(state,'kjhkljkljl')
    state = state + action.count;
      return state;
    default:
      return state;
  }
};

export default countCart;
