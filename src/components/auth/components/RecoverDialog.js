import React , {useState}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useDispatch } from 'react-redux';

import {recoverPassword} from '../../../actions/auth';

export default function RecoverDialog(props) {

  const {open, setOpen} = props;
  const [email, setEmail] = useState("")

  const dispatch = useDispatch();

  const handleRecover = () => {
    setOpen(false);
    dispatch(recoverPassword({
        email: email
    }));
    setEmail("");
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Recuperar Contraseña.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Se enviara un correo a este email con la nueva contraseña.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(e)=>{
                handleChangeEmail(e);
            }}
            value= {email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose()}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleRecover()}} color="primary">
            Recuperar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
