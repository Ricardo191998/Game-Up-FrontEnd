import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken , fetchSinToken} from '../helpers/fetch';


export const productStartAddNew = ( product ) => {
    return async( dispatch, getState ) => {

        try {
            const resp = await fetchConToken('new_product', product, 'POST');
            const body = await resp.json();

            if ( body.success ) {
                dispatch( productAddNew( body.product ) );
            }else {
                Swal.fire('Error', 'Contactar a propietario', 'error');
            }


        } catch (error) {
            console.log(error);
        }

    }
}



const productAddNew = (product) => ({
    type: types.productAddNew,
    payload: product
});

export const productSetActive = (product) => ({
    type: types.productSetActive,
    payload: product
});

export const productClearActiveProduct = () => ({ type: types.productClearActiveProduct });



export const productStartUpdate = ( product ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken(`edit_product/${ product._id }`, product, 'POST' );
            const body = await resp.json();
            
            if ( body.success ) {
                dispatch( productUpdated( body.product ) );
            } else {
                Swal.fire('Error', 'Contactar a propietario', 'error');
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const productUpdated = ( product ) => ({
    type: types.productUpdated,
    payload: product
});


export const productStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { _id } = getState().products.activeProduct;
        try {
            const resp = await fetchConToken(`product/${ _id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.success ) {
                dispatch( productDeleted() );
            } else {
                Swal.fire('Error', 'Contactar a propietario', 'error');
            }
  
        } catch (error) {
            console.log(error)
        }

    }
}


const productDeleted = () => ({ type: types.productDeleted });


export const productStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchSinToken( 'products' );
            const body = await resp.json();

            const products = body.products;

            dispatch( productLoaded( products ) );

        } catch (error) {
            console.log(error)
        }

    }
}

const productLoaded = (products) => ({
    type: types.productLoaded,
    payload: products
})

export const productLogout =() => ({ type: types.productLogout });