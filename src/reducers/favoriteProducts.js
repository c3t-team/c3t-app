import * as Types from "../constants/actionType";
var initState = [];

const favoriteProducts = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_FAVORITE_PRODUCTS:
      state = action.favoriteProducts;
      console.log("state list", state);
      return state;
    default:
      return state;
  }
};

export default favoriteProducts;
