import * as Types from "../constants/actionType";
var initState = [
  // {
  //   rate: 0,
  //   images: [],
  //   amountSold: 0,
  //   status: false,
  //   favorited: 0,
  //   _id: "",
  //   name: "",
  //   categories: {
  //     _id: "",
  //     parent: {
  //       _id: "",
  //       name: ""
  //     },
  //     name: ""
  //   },
  //   rating: [],
  //   detail: []
  // }
];

const products = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_PRODUCTS:
      state =  action.products
      console.log("state ổducts", state);
      return state;
    default:
      return state;
  }
};

export default products;
