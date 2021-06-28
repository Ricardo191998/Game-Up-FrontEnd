import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchConToken } from '../helpers/fetch';
import {startLogout} from './auth';

export const userStartAddNew = ( user ) => {
    return async( dispatch, getState ) => {
        try {
            const resp = await fetchConToken('create_admin', user, 'POST');
            const body = await resp.json();
        
            if ( body.success ) {
                dispatch( userAddNew( {
                    ...user,
                    _id: body.user._id,
                    invitation_code: body.user.code 
                } ) );
            }else {
                Swal.fire('Error', 'Contactar al propietario', 'error');
            }

        } catch (error) {
            console.log(error);
        }
    }
}

const userAddNew = (user) => ({
    type: types.userAddNew,
    payload: user
});

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user
});

export const userClearActiveUser = () => ({ type: types.userClearActiveUser });

export const userStartUpdate = ( user, type ) => {
    return async( dispatch) => {
        let resp ;

        if(type === "CLIENT"){
            resp = await fetchConToken( `update_user/${user._id}`, user, 'POST' );
        }else{
            resp = await fetchConToken( `update_admin/${user._id}`, user, 'POST' );
        }
        
        const body = await resp.json();

        if( body.success ) {
            
            dispatch(userStartLoading());
            
            Swal.fire('Bien', 'El usuario se a actualizado.', 'success');
       
            
        } else {
            Swal.fire('Error', body.message, 'error');
        }
    }
}


export const userStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { _id } = getState().users.activeUser;
        try {
            const resp = await fetchConToken(`user/${ _id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.success ) {
                dispatch( userDeleted() );
            } else {
                Swal.fire('Error', 'Contactar al propietario.', 'error');
            }
  
        } catch (error) {
            console.log(error)
        }

    }
}


const userDeleted = () => ({ type: types.userDeleted });


export const userStartLoading = () => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken(`users`, {}, 'GET' );
            const body = await resp.json();
            
            if(body.success){
                const users= body.users;
                dispatch( userLoaded( users ) );
            }else{
                dispatch( userLoaded( [] ) );
                dispatch(startLogout());
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const userLoaded = (users) => ({
    type: types.userLoaded,
    payload: users
})

export const userLogout =() => ({ type: types.userLogout});