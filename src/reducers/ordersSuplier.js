import * as Types from "../constants/actionType";

var inintState = [
  {
    status: "",
    _id: "",
    products: [
      {
        Detail: [
          {
            _id: "",
            color: "",
            size: 0,
            price: 0,
            quantity: 0
          }
        ],
        _id: "",
        productId: ""
      }
    ]
  }
];

const ordersSuplier = (state = inintState, action) => {
  switch (action.type) {
    case Types.GET_ORDERS_SUPLIER:
        state= action.ordersSuplier.length>0?action.ordersSuplier:state;
      return state;

    default:
      return state;
  }
};

export default ordersSuplier;
