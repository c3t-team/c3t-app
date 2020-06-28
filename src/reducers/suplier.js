import * as Types from '../constants/actionType'
var initState = {};

const suplier = (state = initState, action)=>{
    switch(action.type)
    {
        case Types.GET_SUPLIER:
           state = action.suplier;
           return state;    
        default:
            return state;
    }
}

export default suplier;