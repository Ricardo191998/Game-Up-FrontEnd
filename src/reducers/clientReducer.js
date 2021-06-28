import { types } from '../types/types';

const initialState = {
    checking: true,
    user_info: null,
    gain_info: null
    // uid: null,
    // name: null
}

export const userAuthReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.userLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.userCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.userDataStartLogin:
            return {
                ...state,
                checking: false,
                user_info: action.payload
            }

        case types.userGainLoading:
            return {
                ...state,
                checking: false,
                gain_info: action.payload
            }

        case types.userClientLogout:
            return {
                checking: false
            }
        
        default:
            return state;
    }

}


