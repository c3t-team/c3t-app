import * as Types from "../constants/actionType";
var initState = {
  Detail: [],
  categories: {
    name: "",
    parent: {
      name: ""
    }
  },
  favorited: 0,
  images: [],
  name: "Giày cao got A"
};

const product = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCT:
      state = action.product;
      return state;
    default:
      return state;
  }
};

export default product;
