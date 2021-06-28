import { types } from '../types/types';

const initialState = {
    card: [],
    activeShop: null,
    url: null,
    image: null
};


export const shopReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.productShopSetActive:
            return {
                ...state,
                cardActive: action.payload
            }
        
        case types.productShopAddNew:

            for(let i = 0; i < state.card.length ; i++){
                if(state.card[i]._id === action.payload._id){
                    return {
                        ...state,
                        card: [
                            ...state.card
                        ]
                    }
                }
            }
            return {
                ...state,
                card: [
                    ...state.card,
                    action.payload
                ]
            }
    
        case types.productShopClearActiveProduct:
            return {
                ...state,
                cardActive: null
            }


        case types.productShopUpdated:
            return {
                ...state,
                card: state.card.map(
                    e => ( e._id === action.payload._id ) ? action.payload : e
                )
            }
        
        case types.productShopDeleted:
            return {
                ...state,
                card: state.card.filter(
                    e => ( e._id !== state.cardActive._id )
                ),
                cardActive: null
            }

        case types.productShopLoaded:
            return {
                ...state,
                card: [ ...action.payload ]
            }

        case types.productShopClear:
            return {
                ...initialState
            }

        case types.editUrl: 
            return{
                ...state,
                url: action.payload
            }

        case types.editImage: 
            return{
                ...state,
                image: action.payload
            }
        
        case types.setNullImage :
            return{
                ...state,
                image: null
            }

        default:
            return state;
    }


}
