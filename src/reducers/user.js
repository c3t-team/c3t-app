import * as Types from "../constants/actionType";
import { stat } from "fs";
var init = {};

const user = (state = init, action) => {
  switch (action.type) {
    case Types.GET_CURRENT_USER:
      state = action.infoUser;
    default:
      return state;
  }
};

export default user;
