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
import { useDispatch , useSelector } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import useStyles from './styles';

import {isEmail, letter} from '../../../../helpers/validators';

import { useForm } from '../../../../hooks/useForm';

import {startUpdate, superUserUpdate } from '../../../../actions/auth';

export default function DialogUser(props) {
  const {open, setOpen} = props;
  const dispatch = useDispatch();
  
  const {  name , email , lastname, type} = useSelector( state => state.auth );
  
  const classes = useStyles();

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    rName: name ,
    rLastName : lastname,
    rEmail: email,
    rPassword1: '',
    rPassword2: '',
    realPassword1: '',
    realPassword2: '',
  });

  const [ formRegisterError, handleErrorRegisterLoginInputChange ] = useState({
    rName: null,
    rLastName: null
  });

  const [ formErrorP, handleErrorPLoginInputChange ] = useState({
    rPassword1: null,
    rPassword2: null,
  });

  const [ formErrorMail, handleErrorMailLoginInputChange ] = useState({
    rEmail: null,
    realPassword1: null,
    realPassword2: null,
  });

  const { rName, rEmail, rPassword1, rPassword2,realPassword1, realPassword2, rLastName } = formRegisterValues;

  const handleRegisterPassword = (  ) => {

    if ( rPassword1 !== rPassword2 ) {
        handleErrorPLoginInputChange({
            ...formErrorP,
            rPassword1 :"Las contraseñas deben ser iguales",
            rPassword2: "Las contraseñas deben ser iguales"
        });
        return;
    }

    if(rPassword1.length <= 5 ){
        handleErrorPLoginInputChange({
            ...formErrorP,
            rPassword2: null,
            rPassword1: "Mínimo 6 caracteres"
        });
        return;
    }

    if(rPassword2.length <= 5 ){
        handleErrorPLoginInputChange({
            ...formErrorP,
            rPassword1: null,
            rPassword2: "Mínimo 6 caracteres."
        });
        return;
    }

    setOpen(false);
    handleErrorPLoginInputChange({
        rPassword1: null,
        rPassword2: null
    });

    if(type === 'SUPER_ADMIN'){


        dispatch( superUserUpdate( {
            email :rEmail, 
            password: rPassword1, 
            name: rName,  
            lastname: rLastName
            } ) );
    }else{
        dispatch( startUpdate( {
            email :rEmail, 
            password: rPassword1, 
            name: rName,  
            lastname: rLastName
            } , 'ADMIN') );
    }
    
  }

  const handleRegisterPasswordReal = (  ) => {


    if(rEmail.length === 0 || !isEmail.test(rEmail)){
        handleErrorMailLoginInputChange({
            ...formErrorMail,
            realPassword1:null,
            realPassword2:null,
            rEmail: "Correo Invalido"
        });
        return;
    }

    if ( realPassword1 !== realPassword2 ) {
        handleErrorMailLoginInputChange({
            ...formErrorMail,
            rEmail: null,
            realPassword1 :"Las contraseñas deben ser iguales",
            realPassword2: "Las contraseñas deben ser iguales"
        });
        return;
    }

    

    if(realPassword1.length <= 5 ){
        handleErrorMailLoginInputChange({
            ...formErrorMail,
            rEmail: null,
            realPassword2: null,
            realPassword1: "Mínimo 6 caracteres"
        });
        return;
    }

    if(realPassword2.length <= 5 ){
        handleErrorMailLoginInputChange({
            ...formErrorMail,
            rEmail: null,
            realPassword1: null,
            realPassword2: "Mínimo 6 caracteres."
        });
        return;
    }

    handleErrorMailLoginInputChange({
        rEmail: null,
        realPassword1: null,
        realPassword2: null
    });

    setOpen(false);
    if(rEmail === email){
        dispatch( superUserUpdate( {
            password: realPassword1, 
            name: rName, 
            lastname: rLastName,
            realPassword: realPassword1
        } ) );
    }else{
        dispatch( superUserUpdate( {
            password: realPassword1, 
            name: rName,
            email: rEmail, 
            lastname: rLastName,
            realPassword: realPassword1
        } ) );
    }
  }
  
  const handleChange= (  ) => {
        
        if(rName.length === 0 || !letter.test(rName)){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rLastName : null,
                rName: "Nombre inválido."
            });
            return;
        }

        if(rLastName.length === 0 || !letter.test(rLastName)){
            handleErrorRegisterLoginInputChange({
                ...formRegisterError,
                rName: null,
                rLastName: "Apellido inválido."
            });
            return;
        }

        handleErrorRegisterLoginInputChange({
            rName: null,
            rLastName: null
        });

        setOpen(false);

        if(type === 'SUPER_ADMIN'){   
            dispatch( superUserUpdate( {
                name: rName,  
                lastname: rLastName
            }) );
            
        }else{
            if(rEmail === email){
                dispatch( startUpdate( {
                    name: rName,  
                    lastname: rLastName
                    }, 'ADMIN') );
            }else{
                dispatch( startUpdate( {
                    email :rEmail, 
                    name: rName,  
                    lastname: rLastName
                    }, 'ADMIN') );
            }
        }
        
    }


  const handleClose = () => {
    handleErrorRegisterLoginInputChange({
        rName: null,
        rLastName: null
    });
    handleErrorMailLoginInputChange({
        rEmail: null,
        realPassword1: null,
        realPassword2: null
    });
    handleErrorPLoginInputChange({
        rPassword1: null,
        rPassword2: null
    });

    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edita Usuario</DialogTitle>
        <DialogContent>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Edita USuario
                        </Typography>
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
                            fullWidth
                            error= {!!formRegisterError.rLastName}
                            label = {!!formRegisterError.rLastName?formRegisterError.rLastName:'Apellido'}    
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
                        
                    </CardContent>          
                </CardActionArea>
                <CardActions>
                <Button
                    onClick = {()=> {
                        handleChange()
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
                </CardActions>
            </Card>

            {
                type === 'SUPER_ADMIN' ? 
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Cambiar contraseña de tu correo asociado a cuenta
                            </Typography>
                            <TextField
                                error= {!!formErrorMail.rEmail}
                                label = {!!formErrorMail.rEmail?formErrorMail.rEmail:'Correo'}
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
                                error= {!!formErrorMail.realPassword1}
                                label = {!!formErrorMail.realPassword1?formErrorMail.realPassword1:'Contraseña'}  
                                fullWidth
                                type="password"
                                margin="dense"
                                className="input_space"
                                placeholder="Contraseña" 
                                name="realPassword1"
                                value={ realPassword1 }
                                variant="outlined"
                                onChange = {
                                    handleRegisterInputChange
                                }
                            />
                            <TextField
                                error= {!!formErrorMail.realPassword2}
                                label = {!!formErrorMail.realPassword2?formErrorMail.realPassword2:'Contraseña'}  
                                fullWidth
                                type="password"
                                margin="dense"
                                className="input_space"
                                placeholder="Confirma Contraseña" 
                                name="realPassword2"
                                variant="outlined"
                                value={ realPassword2 }
                                onChange = {
                                    handleRegisterInputChange
                                }
                            />
                        </CardContent>          
                    </CardActionArea>
                    <CardActions>
                    <Button
                        onClick = {()=> {
                            handleRegisterPasswordReal()
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Cambia contraseña correo real
                    </Button>
                    </CardActions>
                </Card>: 
                <Divider/>
            }

            <Card className={classes.root}>
                <CardActionArea>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Cambiar contraseña
                        </Typography>
                        <TextField
                            error= {!!formErrorP.rPassword1}
                            label = {!!formErrorP.rPassword1?formErrorP.rPassword1:'Contraseña'}  
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
                            error= {!!formErrorP.rPassword2}
                            label = {!!formErrorP.rPassword2?formErrorP.rPassword2:'Contraseña'}  
                            fullWidth
                            type="password"
                            margin="dense"
                            className="input_space"
                            placeholder="Confirma Contraseña" 
                            name="rPassword2"
                            variant="outlined"
                            value={ rPassword2 }
                            onChange = {
                                handleRegisterInputChange
                            }
                        />
                    </CardContent>          
                </CardActionArea>
                <CardActions>
                <Button
                    onClick = {()=> {
                        handleRegisterPassword()
                    }}
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Cambia contraseña
                </Button>
                </CardActions>
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
