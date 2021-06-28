
import { types } from '../types/types';

import Swal from 'sweetalert2';

import {fetchSinToken} from '../helpers/fetch';


export const shopAddNew = (product) => ({
    type: types.productShopAddNew,
    payload: product
});

export const productSetActive = (product) => ({
    type: types.productShopSetActive,
    payload: product
});

export const paypalPayment = (data) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchSinToken( 'paypal_payment', data,'POST' );
            const body = await resp.json();

            if(body.success){
                dispatch( setUrl(body.url) );
            }else{
                Swal.fire('Error', "Contactar a propietario", 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const payment = (data) => {
    return async(dispatch) => {

        try {
            const resp = await fetchSinToken( 'make_purchase', data,'POST' );
            const body = await resp.json();

            if(body.success){
                dispatch(setImage(body.pdf));
            }else{
                Swal.fire('Error', "Contactar a propietario", 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

export const setImage = (base64) => ({
    type: types.editImage,
    payload: base64
})

export const setNullImage = () => ({
    type: types.setNullImage,
    payload: ""
})

export const setUrl = (url) => ({
    type: types.editUrl,
    payload: url
});

export const productClearActiveProduct = () => ({ type: types.productShopClearActiveProduct });

export const shopUpdated = ( product ) => ({
    type: types.productShopUpdated,
    payload: product
});


export const shopDeleted = () => ({ type: types.productShopDeleted});


export const shopClear =() => ({ type: types.productShopClear });