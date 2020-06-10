import * as Types from '../constants/actionType'
var initState = [];

const productSupliers = (state = initState, action)=>{
    switch(action.type)
    {
        case Types.GET_PRODUCT_SUPLIER:
           state = action.productSupliers;
           return state;    
        default:
            return state;
    }
}

export default productSupliers;