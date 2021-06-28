import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import {userStartDelete} from '../../../../actions/users';
import { useDispatch} from 'react-redux';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const {open, setOpen} = props;
  const dispatch =  useDispatch();


  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (user)=>{
    dispatch(userStartDelete());
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Estas seguro que desea eliminar al usuario?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
          <Button onClick={handleDelete} color="primary">
            Eliminar 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}