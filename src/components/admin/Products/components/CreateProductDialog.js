import React , {useState}from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';
import { useDispatch  } from 'react-redux';

import useStyles from './styles';

import {num ,  letterNum, isFloat} from '../../../../helpers/validators';
import { productStartAddNew} from '../../../../actions/products';


export default function CreateDialog(props) {
  const {open, setOpen} = props;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [product, setProduct] = useState({
      name: "",
      description: "",
      cost : 0,
      stack: 0
  })

  const [ formError, handleErrorLoginInputChange ] = useState({
    name: null,
    description: null,
    cost : null,
    stack: null
  });

  const handleClose = () => {
    handleErrorLoginInputChange({
        ...formError,
        name: null,
        cost : null,
        stack: null,
        description: null
    });
    setOpen(false);
  };

  const handleChangeText = (element)=>{
    setProduct({
        ...product,
        [element.name]: element.value
    });
  }

  const handleSubmit = () => {
      
      if(product.description.length === 0 || !letterNum.test(product.description)){
        handleErrorLoginInputChange({
            ...formError,
            name: null,
            cost : null,
            stack: null,
            description: "Descripción inválida."
        });
        return;
      }

      if(product.name.length === 0 || !letterNum.test(product.name)){
        handleErrorLoginInputChange({
            ...formError,
            description: null,
            cost : null,
            stack: null,
            name: "Nombre inválido"
        });
        return;
      }

      if(product.cost === 0 || !isFloat.test(product.cost)){
        handleErrorLoginInputChange({
            ...formError,
            description: null,
            name : null,
            stack: null,
            cost: "Precio inválido."
        });
        return;
      }

      if(product.stack === 0 || !num.test(product.stack)){
        handleErrorLoginInputChange({
            ...formError,
            description: null,
            name : null,
            cost: null,
            stack: "Stack inválido."
        });
        return;
      }

      handleErrorLoginInputChange({
        ...formError,
        name: null,
        cost : null,
        stack: null,
        description: null
      });
      setOpen(false);
      dispatch(productStartAddNew(product));
      setProduct({
          name: "",
          description: "",
          cost : 0,
          stack: 0});
  }

  const handleChangeImage = (value)=>{
    var reader  = new FileReader();
    reader.onloadend = function () {
        let url = reader.result;
        setProduct({
            ...product,
            file : url
        })
    }
    reader.readAsDataURL(value[0]);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update</DialogTitle>
        <DialogContent>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={product.file ? product.file : "https://res.cloudinary.com/ricardo191998/image/upload/v1599700603/no_image_kukdun.png" }
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <TextField
                            error= {!!formError.name}
                            label = {!!formError.name?formError.name:'Nombre'}
                            autoFocus
                            fullWidth
                            helperText="Nombre"
                            margin="dense"
                            id="name"
                            name = "name"
                            onChange = {
                                e =>{
                                    handleChangeText(e.target);
                                }
                            }
                        />
                        <TextField
                            error= {!!formError.description}
                            label = {!!formError.description?formError.description:'Descripción'}
                            fullWidth
                            autoFocus
                            margin="dense"
                            helperText="Descripción"
                            id="description"
                            name = "description"
                            onChange = {
                                e =>{
                                    handleChangeText(e.target);
                                }
                            }
                        />
                        <TextField
                            error= {!!formError.cost}
                            label = {!!formError.cost?formError.cost:'Precio'}
                            fullWidth
                            autoFocus
                            margin="dense"
                            helperText="Precio"
                            id="cost"
                            name = "cost"
                            onChange = {
                                e =>{
                                    handleChangeText(e.target);
                                }
                            }
                        />
                        <TextField
                            error= {!!formError.stack}
                            label = {!!formError.stack?formError.stack:'Stack'}
                            fullWidth
                            autoFocus
                            helperText="Stack"
                            margin="dense"
                            id="stack"
                            name = "stack"
                            onChange = {
                                e =>{
                                    handleChangeText(e.target);
                                }
                            }
                        />
                        <Input type= "file" 
                                helperText="Imagen" onChange={e => {
                                handleChangeImage([...e.target.files]);
                                 }} />
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
                handleSubmit()
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
