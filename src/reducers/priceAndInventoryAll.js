import * as Types from "../constants/actionType";
var initState = {
  priceAll: 0,
  inventoryAll: 0
};

const priceAndInventoyAll = (state = initState, action) => {
  switch (action.type) {
    case Types.PRICEANDINVENTORYALL:
      state = action.priceAndInventoryAll;
      return state;
    default:
      return state;
  }
};

export default priceAndInventoyAll;
