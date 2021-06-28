import React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {shopAddNew} from '../../../../actions/shop';

import useStyles from './styles';

import { productStartLoading } from '../../../../actions/products';

export const Products = () => {

    const dispatch = useDispatch();
    const { products } = useSelector( state => state.products );
    const classes = useStyles();
    

    const handleClickAddCard= (value) =>{
        value = {
            ...value,
            count: 1
        }
        dispatch(shopAddNew(value));
    }

    useEffect(() => {
        
        dispatch( productStartLoading() );

    }, [ dispatch ])
 
    return (
        <div>
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
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {
                                    value.stack === 0 ? 
                                    <Button
                                    onClick= {()=>{handleClickAddCard(value)}}
                                    variant="contained"
                                    color="secondary"
                                    disabled
                                    className={classes.button}
                                >
                                   AGOTADO
                                </Button>:
                                    <Button
                                    onClick= {()=>{handleClickAddCard(value)}}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<AddShoppingCartIcon />}
                                >
                                   AGREGAR A CARRITO
                                </Button>
                                }
                                
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Grid>
      </div>
    
    )
}
