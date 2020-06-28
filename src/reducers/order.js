import * as Types from "../constants/actionType";
var initState = [];

const order = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_ORDER:
      state = action.order;
      return state;
    default:
      return state;
  }
};

export default order;
