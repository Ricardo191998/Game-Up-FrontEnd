import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import { useDispatch} from 'react-redux';
import {purchaseStartUpdate} from '../../../../actions/purchases';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const {open, setOpen} = props;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(false);
  };

  const handleClose = () => {
    dispatch(purchaseStartUpdate());
    setOpen(false);
  };

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
        <DialogTitle id="alert-dialog-slide-title">{"Desea marcar compra como entregada"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                De ser asi ya no podrá volver a desenmarcarla. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
