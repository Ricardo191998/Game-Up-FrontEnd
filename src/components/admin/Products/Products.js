import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateDialog from './components/CreateProductDialog';
import  UpdateDialog from './components/UpdateDialog';

import useStyles from './styles';

import { productSetActive ,productStartDelete, productStartLoading } from '../../../actions/products';

export const Products = () => {

    //TODO IMPORTAR ESTILOS
    const dispatch = useDispatch();
    const { products } = useSelector( state => state.products );
    const classes = useStyles();
    const [openUpdate, setUpdateOpen] = React.useState(false);
    const [open , setOpen] = React.useState(false);
    const [product, setProduct] = React.useState({
    });

    const handleClickOpen = (type, value) => {
        
        if(type==="UPDATE"){
            setProduct({
                "name": value.name,
                "_id" : value._id,
                "description": value.description,
                "image": value.image,
                "cost": value.cost,
                "stack" : value.stack
            });
            setUpdateOpen(true);
        }else{
            setOpen(true);
        }
    };

    const handleClickDelete = (value) =>{
        dispatch(productSetActive(value));
        dispatch(productStartDelete());
    }
    useEffect(() => {
        
        dispatch( productStartLoading() );

    }, [ dispatch ])
 
    return (
        <div>
            <Fab onClick = {()=>{handleClickOpen("CREATE")}} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                {products.map((value) => (
                    <Grid key={value._id} item>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={value.image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom className={classes.text} variant="h5" component="h2">
                                        {value.name}
                                    </Typography>
                                    <Typography variant="body2" className={classes.text} color="textSecondary" component="p">
                                        {value.description}
                                    </Typography>
                                    <Typography variant="body2" className={classes.text} color="textPrimary" component="p">
                                        PRECIO: $ {value.cost} MXN
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" component="p">
                                        STACK : {value.stack} 
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={()=>{handleClickOpen("UPDATE", value)}}
                                    className={classes.button}
                                    endIcon={<SettingsIcon />}
                                >
                                    Update
                                </Button>
                                <Button
                                    onClick= {()=>{handleClickDelete(value)}}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Grid>
            <UpdateDialog
                open={openUpdate}
                setOpen={setUpdateOpen}
                productValue = {product}
            />
            <CreateDialog
                open={open}
                setOpen={setOpen}
            />
      </div>
    
    )
}
