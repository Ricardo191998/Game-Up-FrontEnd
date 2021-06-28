import { types } from '../types/types';

const initialState = {
    products: [],
    activeProduct: null
};


export const productReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.productSetActive:
            return {
                ...state,
                activeProduct: action.payload
            }
        
        case types.productAddNew:
            return {
                ...state,
                products: [
                    ...state.products,
                    action.payload
                ]
            }
    
        case types.productClearActiveProduct:
            return {
                ...state,
                activeProduct: null
            }


        case types.productUpdated:
            return {
                ...state,
                products: state.products.map(
                    e => ( e._id === action.payload._id ) ? action.payload : e
                )
            }
        
        case types.productDeleted:
            return {
                ...state,
                products: state.products.filter(
                    e => ( e._id !== state.activeProduct._id )
                ),
                activeProduct: null
            }

        case types.productLoaded:
            return {
                ...state,
                products: [ ...action.payload ]
            }

        case types.productLogout:
            return {
                ...initialState
            }

        default:
            return state;
    }


}
