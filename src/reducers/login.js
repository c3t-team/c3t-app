import *as Types from '../constants/actionType'

var inintState = {}

const login = (state = inintState, action) => {

    switch (action.type) {
        case Types.LOGIN:
            state = action.login;
            return state;

        default:
            return state;

    }
}

export default login;
