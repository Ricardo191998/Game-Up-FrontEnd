import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {shopUpdated, paypalPayment, payment , shopDeleted, productSetActive, shopClear} from '../../../../actions/shop';
import PaymentIcon from '@material-ui/icons/Payment';
import StoreIcon from '@material-ui/icons/Store';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from "react-router-dom";

import DialogDownload from './components/DialogDownload';

export const PaymentScreen = () => {
    const { card , url, image } = useSelector( state => state.card );
    const dispatch = useDispatch();
    const { email } = useSelector( state => state.client);
    let history = useHistory();
    const showTotal = () => {
       let total = 0; 
       card.map((obj)=>{
        total+= obj.count*obj.cost
        return 0 ;
       })  
       total= total.toFixed(2);

       return total;
    }

    const handleLogin = () => {
      let total = 0; 
       card.map((obj)=>{
        total+= obj.count*obj.cost
        return 0 ;
       })  
      
      total= total.toFixed(2);

      let items = card.map((obj)=>{
        
        if(obj.cost.toString().indexOf(".") === -1 ){
          obj.cost = `${obj.cost}.00`
        }
        
        if(obj.cost.toString().indexOf(".")  > obj.cost.toString().length -3 ){
          obj.cost = `${obj.cost}0`
        }

        return {
          "name": obj.name,
          "sku" : "001",
          "price": obj.cost,
          "currency": "MXN",
          "quantity": obj.count.toString()
        }
      });

      let data = {
        "amount": {
          "currency": "MXN",
          "total": total
        },
        "description": "Compra sigamos juntos",
        "item_list": {
          "items": items
        },
        "email": !!email ? email : "sincorreo@gmail.com"
      }
      
      dispatch(paypalPayment(data));
    }

    const handlePayInStore = () =>{
      let total = 0; 
      card.map((obj)=>{
      total+= obj.count*obj.cost
      return 0 ;
      })  
      
      total= total.toFixed(2);

      dispatch(payment({
        purchase: {
          products : card.map((obj)=>{
            return {
              name: obj.name,
              description: obj.description,
              amount: obj.count,
              cost: obj.cost
            }
          }),
          amount : parseFloat(total),
        },
        email : !!email ? email : ""
      }));

    }

    const handleClearProducts = () =>{
      dispatch(shopClear());
    }

    const handleGoShoping = () =>{
      history.push('/home/products');
    }

    if(url!==null){
      window.location.replace(url);
    }

    return (
        <div>
            <div className="view intro-2">
              <div className="full-bg-img">
                <div className="mask rgba-black-strong flex-center">
                  <div className="container">
                    <div className="white-text text-center wow fadeInUp">
                      <h2>Card</h2>
                      <h5>Lista de productos</h5>
                      <br/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CustomizedTables></CustomizedTables>

            <div className="mt-5 d-flex flex-row justify-content-center">
              <Button
                disabled={card.length <= 0}
                onClick = {()=>{
                    handleClearProducts() 
                  }}
                  className="mr-4"
                  variant="contained"
                  color="secondary"
                  endIcon={<ClearAllIcon />}
                >
                  Limpiar carrito
                </Button>
                <Button
                      disabled={card.length <= 0}
                      onClick= {()=>{
                        handleGoShoping();
                      }}
                      variant="contained"
                      color="primary"
                      endIcon={<StorefrontIcon />}
                      
                >
                  Volver a comprar
                </Button> 
            </div>

            <div className="card text-center mt-5">
                <div className="card-header">
                    Card Total
                </div>
                <div className="card-body">
                    <h5 className="card-title">Subtotal : $ {card.length > 0 ? showTotal() : 0}</h5>
                    <p className="card-text">Entrega en tienda.</p>
                    <Button
                     disabled={card.length <= 0}
                     onClick = {()=>{
                        handlePayInStore() 
                      }}
                      className="mr-4"
                      variant="contained"
                      color="secondary"
                      endIcon={<StoreIcon />}
                    >
                      Pagar en tienda 
                    </Button>
                    <Button
                      disabled={card.length <= 0}
                      onClick= {()=>{
                        handleLogin();
                      }}
                      variant="contained"
                      color="primary"
                      endIcon={<PaymentIcon/>}
                      
                    >
                      Comprar en Linea
                    </Button>  
                </div>
            </div>

            <DialogDownload open = {!!image}></DialogDownload>

        </div>
    )
}


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { card } = useSelector( state => state.card );

  const handleUpdateCount = (target, product)=>{
    if(parseInt(target.target.value, 10) <= 0 ||  parseInt(target.target.value, 10) > product.stack){
      product = {
        ...product,
        count: 1
      }
    }else{
      product = {
        ...product,
        count: parseInt(target.target.value, 10) || 0
      }
    }
    
    dispatch(shopUpdated(product));
  }

  const handleDelete = (product) =>{
    dispatch(productSetActive(product));
    dispatch(shopDeleted());
  }


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Imagen</StyledTableCell>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">Descripción</StyledTableCell>
            <StyledTableCell align="right">Precio</StyledTableCell>
            <StyledTableCell align="right">Cantidad</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {card.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                  <img src={row.image} style = {{ maxWidth: 106, height: 'auto'}} className="img-fluid" alt="Responsive"/>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.description}</StyledTableCell>
              <StyledTableCell align="right">$ {row.cost}</StyledTableCell>
              <StyledTableCell align="right"><input type="number" value={row.count} onChange={e=>{
                handleUpdateCount(e,row);
              }} /> </StyledTableCell>
              <StyledTableCell align="right">{(row.cost*row.count).toFixed(2)}</StyledTableCell>
              <Button
                  className="mt-5"
                  onClick= {()=>{
                    handleDelete(row);
                  }}
                  variant="contained"
                  color="secondary"
                >
                <CancelIcon></CancelIcon>
                </Button> 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
