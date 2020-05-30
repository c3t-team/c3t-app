import * as Types from "../constants/actionType";

var inintState = {};

const sign = (state = inintState, action) => {
  switch (action.type) {
    case Types.SIGN:
      state = action.sign;
      return state;
    default:
      return state;
  }
};

export default sign;
