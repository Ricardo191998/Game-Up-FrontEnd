import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { productLogout } from './products';
import {shopClear} from './shop';

export const startLogin = ( email, password, type ) => {
    return async( dispatch ) => {
        let resp;

        if(type === "CLIENT"){
            resp = await fetchSinToken( 'login', { email, password }, 'POST' );
        }else{
            resp = await fetchSinToken( 'login/admin', { email, password }, 'POST' );
        }

        const body = await resp.json();

        if( body.success ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            if(type === "CLIENT"){
                
                dispatch(userLogin({
                    uid: body.user[0]._id,
                    name: body.user[0].name,
                    lastname: body.user[0].lastname,
                    email: body.user[0].email,
                }));
            }else{
                dispatch( login({
                    uid: body.user._id,
                    name: body.user.name,
                    lastname: body.user.lastname,
                    email: body.user.email,
                    type : body.user.type_user
                }) );
            }
           
        } else {
            Swal.fire('Error', body.message, 'error');
        }
        

    }
}

export const superUserUpdate = (user ) => {
    return async( dispatch,getState ) => {
        let resp ;
        
        resp = await fetchConToken( `update_super_admin`, user, 'POST' );
        
        const body = await resp.json();

        if( body.success ) {
            
            Swal.fire('Bien', 'El usuario se a actualizado. Por razones de seguridad cerraremos sesión', 'success');
       
            setTimeout(()=>{
                dispatch(startLogout() );
            }, 1000);
        } else {
            if(body.status === 401){
                Swal.fire('Error','Por razones de seguridad cerrara sesión automaticamente. ', 'error');
                dispatch(logout());
            }
            Swal.fire('Error', body.message, 'error');
        }
    }
}

export const startUpdate = ( user, type ) => {
    return async( dispatch,getState ) => {
        let resp ;

        const {user_info } = getState().client;
        const user_save = getState().auth;
  
        if(type === 'CLIENT'){
            resp = await fetchConToken( `update_user/${user_info._id}`, user, 'POST' );
        }else{
            resp = await fetchConToken( `update_admin/${user_save.uid}`, user, 'POST' );
        }
        
        const body = await resp.json();

        if( body.success ) {
        
            Swal.fire('Bien', 'El usuario se a actualizado. Por razones de seguridad cerraremos sesión', 'success');
    
                setTimeout(()=>{
                    dispatch(startLogout() );
                }, 1000);
                return 
            
        } else {
            if(body.status === 401){
                Swal.fire('Error','Por razones de seguridad cerrara sesión automaticamente. ', 'error');
                dispatch(logout());
            }
            Swal.fire('Error', body.message, 'error');
        }
    }
}


export const startRegister = ( email, password, name, lastname, code , type ) => {
    return async( dispatch ) => {
        let resp ;
        if(type === "CLIENT"){
            resp = await fetchSinToken( 'signin', { email, password, name , lastname , code}, 'POST' );
        }else{
            resp = await fetchSinToken( 'create_admin', { email, password, name , lastname, code}, 'POST' );
        }
        
        const body = await resp.json();

        if( body.success ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            if(type === "CLIENT"){
                dispatch( userLogin({
                    uid: body.user._id,
                    name: body.user.name,
                    lastname: body.user.lastname,
                    email: body.user.email,
                }) )
            }

            Swal.fire('Correcto', `Tu código embajador es : ${body.code}`, 'success');
            
        } else {
            Swal.fire('Error', body.message, 'error');
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken( 'renew_admin' );
        const body = await resp.json();

        if( body.success ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            if(body.user.type_user === "CLIENT"){
                dispatch(startLogout());
                dispatch( checkingFinish() );
            }else{
                dispatch( login({
                    uid: body.user._id,
                    name: body.user.name,
                    lastname: body.user.lastname,
                    email: body.user.email,
                    type : body.user.type_user
                }) )
            }
            
        } else {
            dispatch( checkingFinish() );
        }
    }
}

export const recoverPassword = (data) =>{
    return async() =>{
        const resp = await fetchSinToken( 'recover_password', data, 'POST' );
        const body = await resp.json();

        if( body.success ) {
            
            Swal.fire('Correcto', 'Checar correo.', 'success');
        
        } else {
            Swal.fire('Error', body.message, 'error');
        } 
    }
}

export const startCheckingUser = () => {
    return async(dispatch) => {
        const resp = await fetchConToken( 'renew' );
        const body = await resp.json();

        if( body.success ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( userLogin({
                uid: body.user._id,
                name: body.user.name,
                lastname: body.user.lastname,
                email: body.user.email
            }) );
        } else {
            dispatch( userCheckingFinish() );
        }
    }
}


const checkingFinish = () => ({ type: types.authCheckingFinish });
const userCheckingFinish = () => ({ type: types.userCheckingFinish });

export const startUserInfoLoaded = (user_id = "") => {
    return async(dispatch, getState) => {
        let uid = user_id; 

        if(user_id.length === 0){
            uid  = getState().client.uid;
       }
        const resp = await fetchConToken( `purchases/${uid}` );
        const body = await resp.json();

        if( body.success ) {
            dispatch( userInfo(body.user_info) );
        } 
    }
}

export const startUserGainLoaded = (user_id= "") => {
    return async(dispatch, getState) => {
        let uid = user_id; 

        if(user_id.length === 0){
             uid  = getState().client.uid;
        }

        

        const resp = await fetchConToken( `gain/${uid}` );
        const body = await resp.json();


        if( body.success ) {
            dispatch( userGainInfo(body.message) );
        } 
    }
}

const userGainInfo = (user_info) =>({
    type: types.userGainLoading,
    payload: user_info
});

const userInfo = (user_info) =>({
    type: types.userDataStartLogin,
    payload: user_info
});

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const userLogin = ( user ) => ({
    type: types.userLogin,
    payload: user
});

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear();
        dispatch( productLogout() );
        dispatch( shopClear() );
        dispatch( userlogout());
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })

const userlogout = () => ({ type: types.userClientLogout })