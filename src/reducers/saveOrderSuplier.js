import * as Types from "../constants/actionType";

var inintState = false;

const saveOrderSuplier = (state = inintState, action) => {
  switch (action.type) {
    case "SAVEORDER":
      state = action.status;
      return state;
    default:
      return state;
  }
};

export default saveOrderSuplier;
