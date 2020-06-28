import  * as Types from '../constants/actionType' 
var init = []

const customers = (state = init, action)=>{
    switch(action.type)
    {
        case Types.GET_CUSTOMERS:
            state = action.customers
            return state;
        default: 
            return state;

    }

} 

export default customers