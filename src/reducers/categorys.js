import * as Types from "../constants/actionType";
var initState = [
  {
    name: "",
    children: [
      {
        _id: "",
        parent: "",
        name: "Boot"
      }
    ]
  }
];

const categories = (state = initState, action) => {
  switch (action.type) {
    case Types.GET_CATEGORYS:
      state = action.categories;
      return state;
    case Types.DELETE_CATEGORY:

    default:
      return state;
  }
};

export default categories;
