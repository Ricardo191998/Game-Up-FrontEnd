import { types } from '../types/types';

const initialState = {
    purchases: [],
    activePurchase: null
};


export const purchaseReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.purchaseUpdated:
            return {
                ...state,
                purchases: state.purchases.map(
                    e => ( e._id === action.payload ) ? {...e, status: "true", is_pay: "true"} : e
                )
            }
        case types.purchaseSetActive:
            return {
                ...state,
                activePurchase: action.payload
            }

        case types.purchaseClearActivePurchase:
            return {
                ...state,
                activePurchase: null
            }

        case types.purchaseLoaded:
            return {
                ...state,
                purchases: [ ...action.payload ]
            }

        case types.purchasesLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
