import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';

import { TextField } from '@material-ui/core';

import {Navigation} from '../shop/components/Navigation';
import {Footer} from '../shop/components/Footer';
import RecoverDialog from './components/RecoverDialog';
import {isEmail, letter} from '../../helpers/validators';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const [ formError, handleErrorLoginInputChange ] = useState({
        lEmail: null,
        lPassword: null
    });

    const [ formRegisterError, handleErrorRegisterLoginInputChange ] = useState({
        rName: null,
        rLastName : null,
        rEmail: null,
        rPassword1: null,
        rPassword2: null,
        rCode     : null
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rLastName : '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
        rCode     : '' 
    });
    
    const { lEmail, lPassword } = formLoginValues;
    const { rName, rEmail, rPassword1, rPassword2, rLastName, rCode } = formRegisterValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        if(lEmail.length === 0 || !isEmail.test(lEmail)){
            handleErrorLoginInputChange({
                ...formError,
                lPassword: null,
                lEmail: "Correo Invalido"
            });
            return;
        }
        if(lPassword.length <= 5 ){
            handleErrorLoginInputChange({
                ...formError,
                lEmail: null,
                lPassword: "Mínimo 6 caracteres"
            });
            return;
        }

        handleErrorLoginInputChange({
            lEmail: null,
            lPassword: null
        });
        dispatch( startLogin( lEmail, lPassword , "CLIENT") );
        
    }

    const handleRecover = () =>{
        setOpen(true);
    }

    const handleRegister = ( e ) => {
        e.preventDefault();
        

        if(rEmail.length === 0 || !isEmail.test(rEmail)){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName : null,
                rPassword1: null,
                rPassword2: null,
                rCode     : null,
                rEmail: "Correo Invalido"
            });
            return;
        }

        if(rName.length === 0 || !letter.test(rName)){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rLastName : null,
                rPassword1: null,
                rPassword2: null,
                rCode     : null,
                rEmail: null,
                rName: "Nombre inválido."
            });
            return;
        }

        if(rLastName.length === 0 || !letter.test(rLastName)){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rPassword1: null,
                rPassword2: null,
                rCode     : null,
                rEmail: null,
                rLastName: "Apellido inválido."
            });
            return;
        }

        
        if ( rPassword1 !== rPassword2 ) {
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName : null,
                rCode     : null,
                rEmail: null,
                rPassword1 :"Las contraseñas deben ser iguales",
                rPassword2: "Las contraseñas deben ser iguales"
            });
            return;
        }

        if(rPassword1.length <= 5 ){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName : null,
                rPassword2: null,
                rCode     : null,
                rEmail: null,
                rPassword1: "Mínimo 6 caracteres"
            });
            return;
        }

        if(rPassword2.length <= 5 ){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName : null,
                rPassword1: null,
                rCode     : null,
                rEmail: null,
                rPassword2: "Mínimo 6 caracteres."
            });
            return;
        }

        if(rCode.length <= 4 ){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName : null,
                rPassword1: null,
                rPassword2: null,
                rEmail: null,
                rCode: "Mínimo 5 caracteres."
            });
            return;
        }
        handleErrorRegisterLoginInputChange({
            rName: null,
            rLastName : null,
            rEmail: null,
            rPassword1: null,
            rPassword2: null,
            rCode     : null
        });
        dispatch( startRegister( rEmail, rPassword1, rName,  rLastName, rCode , "CLIENT") );
    }


    return (
        <>
        <Navigation/>
        <div className="container login-container mb-5">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <TextField
                                type="text"
                                error= {!!formError.lEmail}
                                label = {!!formError.lEmail?formError.lEmail:'Correo'}
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                error= {!!formError.lPassword}
                                label = {!!formError.lPassword?formError.lPassword:'Contraseña'}
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group ml-5">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                        <p className= "ml-5 btn btn-link" onClick={()=>{handleRecover();}}>Olvido su contraseña?</p>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rName}
                                label = {!!formRegisterError.rName?formRegisterError.rName:'Nombre'}
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rLastName}
                                label = {!!formRegisterError.rLastName?formRegisterError.rLastName:'Apellido'}
                                type="text"
                                className="form-control"
                                placeholder="Apellidos"
                                name="rLastName"
                                value={ rLastName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rEmail}
                                label = {!!formRegisterError.rEmail?formRegisterError.rEmail:'Correo.'}
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rPassword1}
                                label = {!!formRegisterError.rPassword1?formRegisterError.rPassword1:'Contraseña'}
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                value={ rPassword1 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rPassword2}
                                label = {!!formRegisterError.rPassword2?formRegisterError.rPassword2:'Confirmar contraseña'}
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                value={ rPassword2 }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        
                        <div className="form-group">
                            <TextField
                                error= {!!formRegisterError.rCode}
                                label = {!!formRegisterError.rCode?formRegisterError.rCode:'Código Embajador'}
                                type= "text"
                                className="form-control"
                                placeholder="Código embajador"
                                name="rCode"
                                value={ rCode }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <RecoverDialog open={open} setOpen={setOpen}></RecoverDialog>
        <Footer/>
        </>
    )
}