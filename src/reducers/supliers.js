import * as Types from "../constants/actionType";
var initState = [
  {
    products: [
      {
        status: true,
        _id: "",
        name: ""
      }
    ],
    _id: "",
    name: "",
    email: "",
    phone: "",
    address: ""
  }
];

const supliers = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_SUPLIERS:
      state = action.supliers;
      return state;
    default:
      return state;
  }
};

export default supliers;
