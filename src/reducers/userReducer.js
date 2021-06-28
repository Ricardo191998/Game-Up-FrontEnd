import { types } from '../types/types';

const initialState = {
    products: [],
    activeUser: null
};


export const userReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.userSetActive:
            return {
                ...state,
                activeUser: action.payload
            }
        
        case types.userAddNew:
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            }
    
        case types.userClearActiveUser:
            return {
                ...state,
                activeUser: null
            }


        case types.userUpdated:
            return {
                ...state,
                users: state.users.map(
                    e => ( e._id === action.payload._id ) ? action.payload : e
                )
            }
        
        case types.userDeleted:
            return {
                ...state,
                users: state.users.filter(
                    e => ( e._id !== state.activeUser._id )
                ),
                activeUser: null
            }

        case types.userLoaded:
            return {
                ...state,
                users: [ ...action.payload ]
            }

        case types.userLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
