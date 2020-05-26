import * as Types from "../constants/actionType";
var initState = {};

const message = (state = initState, action) => {
  switch (action.type) {
    case Types.SUCCESS:
      state = action.message;
      return state;
    case Types.FAIL:
      state = action.message;
      return state;
    default:
      return state;
  }
};

export default message;
