import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startLogin} from '../../actions/auth';
import {isEmail} from '../../helpers/validators';

import { TextField } from '@material-ui/core';

import './login.css';

import RecoverDialog from './components/RecoverDialog';

export const LoginAdminScreen = () => {

    const dispatch = useDispatch();
    
    const [open, setOpen] = React.useState(false);

    const [ formError, handleErrorLoginInputChange ] = useState({
        lEmail: null,
        lPassword: null
    });

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const { lEmail, lPassword } = formLoginValues;

    const handleRecover = () =>{
        setOpen(true);
    }

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

        dispatch( startLogin( lEmail, lPassword, "ADMIN" ) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <TextField
                                error= {!!formError.lEmail}
                                label = {!!formError.lEmail?formError.lEmail:'Correo'}
                                type="text"
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
                        <div className="form-group">
                            <input 

                                type="submit"
                                className="ml-5 btnSubmit"
                                value="Login" 
                            />
                        </div>
                        <p className= "ml-5 btn btn-link" onClick={()=>{handleRecover();}}>Olvido su contraseña?</p>
                    </form>
                </div>

            </div>
            <RecoverDialog open={open} setOpen={setOpen}></RecoverDialog>
        </div>
    )
}