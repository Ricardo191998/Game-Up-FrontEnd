import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import {startLogout} from './auth';

export const purchaseStartUpdate = (  ) => {
    return async(dispatch, getState) => {

        const { _id } = getState().purchases.activePurchase;
        try {
            const resp = await fetchConToken(`edit_purchase/${ _id }` );
            const body = await resp.json();
        
            if ( body.success ) {
                dispatch( purchaseUpdated(_id) );
            } else {
                Swal.fire('Error', "Falla en el server", 'error');
            }
        } catch (error) {
            console.log(error)
        }

    }
}

export const purchaseSetActive = (purchase) => ({
    type: types.purchaseSetActive,
    payload: purchase
});

const purchaseUpdated = ( id ) => ({
    type: types.purchaseUpdated,
    payload: id
});


export const purchaseStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken( 'purchase' );
            const body = await resp.json();

            if(body.success){
                dispatch( purchaseLoaded( body.purchases) );

            }else{
                const purchases = [];

                dispatch( purchaseLoaded( purchases) );
                dispatch(startLogout());

            }

            
        } catch (error) {
            console.log(error)
        }

    }
}

const purchaseLoaded = (purchases) => ({
    type: types.purchaseLoaded,
    payload: purchases
})

export const purchaseLogout =() => ({ type: types.purchaseLogout });