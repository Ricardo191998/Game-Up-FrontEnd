import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { useDispatch  } from 'react-redux';

import useStyles from './styles';

import {isEmail, letter} from '../../../../helpers/validators';

import { useForm } from '../../../../hooks/useForm';

import { userStartAddNew } from '../../../../actions/users';


export default function CreateDialog(props) {
  const {open, setOpen} = props;
  const dispatch = useDispatch();
  const classes = useStyles();

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

  const { rName, rEmail, rPassword1, rPassword2, rLastName, rCode } = formRegisterValues;

  const handleRegister = (  ) => {

    
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

    setOpen(false);
    dispatch( userStartAddNew( {
         email :rEmail, 
         password: rPassword1, 
         name: rName,  
         lastname: rLastName, 
         code : rCode} ) );
}

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Crear Usuario Admin</DialogTitle>
        <DialogContent>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <TextField
                            error= {!!formRegisterError.rName}
                            label = {!!formRegisterError.rName?formRegisterError.rName:'Nombre'}
                            fullWidth
                            type="text"
                            className="input_space"
                            placeholder="Nombre"
                            margin="dense"
                            id="name"
                            name = "rName"
                            variant="outlined"
                            value={ rName }
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                        <TextField
                            error= {!!formRegisterError.rLastName}
                            label = {!!formRegisterError.rLastName?formRegisterError.rLastName:'Apellido'} 
                            fullWidth
                            type="text"
                            margin="dense"
                            className="input_space"
                            placeholder="Apellidos"
                            name="rLastName"
                            variant="outlined"
                            value={ rLastName }
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                        <TextField
                            error= {!!formRegisterError.rEmail}
                            label = {!!formRegisterError.rEmail?formRegisterError.rEmail:'Correo.'}
                            fullWidth
                            type="email"
                            margin="dense"
                            className="input_space"
                            placeholder="Correo"
                            name="rEmail"
                            variant="outlined"
                            value={ rEmail }
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                        <TextField
                            error= {!!formRegisterError.rPassword1}
                            label = {!!formRegisterError.rPassword1?formRegisterError.rPassword1:'Contraseña'}
                            fullWidth
                            type="password"
                            margin="dense"
                            className="input_space"
                            placeholder="Contraseña" 
                            name="rPassword1"
                            value={ rPassword1 }
                            variant="outlined"
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                        <TextField
                            error= {!!formRegisterError.rPassword2}
                            label = {!!formRegisterError.rPassword2?formRegisterError.rPassword2:'Confirmar contraseña'}
                            fullWidth
                            type="password"
                            margin="dense"
                            className="input_space"
                            placeholder="Contraseña" 
                            name="rPassword2"
                            variant="outlined"
                            value={ rPassword2 }
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                        <TextField
                            error= {!!formRegisterError.rCode}
                            label = {!!formRegisterError.rCode?formRegisterError.rCode:'Código Embajador'}
                            fullWidth
                            margin="dense"
                            type= "text"
                            className="input_space"
                            placeholder="Código embajador"
                            name="rCode"
                            variant="outlined"
                            value={ rCode }
                            onChange={ handleRegisterInputChange }
                          
                        />
                    </CardContent>          
                </CardActionArea>
            </Card>
        </DialogContent>
        <DialogActions>
          <Button
            onClick = {()=>{handleClose()}}
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<CancelIcon />}
           >
            Cancel
             </Button>
          <Button
            onClick = {()=> {
                handleRegister()
            }}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
        >
            Save
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
