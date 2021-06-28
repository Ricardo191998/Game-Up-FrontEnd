import React, {useEffect, useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Switch from '@material-ui/core/Switch';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import AlertDialogSlide from './components/AcceptChange';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import {purchaseStartLoading, purchaseSetActive} from '../../../actions/purchases';


export const Purchases = () => {
    
  const dispatch = useDispatch();
  const [isEmail, setisEmail] = useState(true);
  const [search, setSearch] = useState("");
  let  { purchases } = useSelector( state => state.purchases );
    
  useEffect(() => {
      dispatch( purchaseStartLoading() );
  }, [ dispatch])

  const handleClick = ()=>{
    setisEmail(!isEmail);
  }

  const handleChange = (e)=>{
    setSearch(e.target.value);
  }

  if(search.length > 0){
    let er = new RegExp(search, 'i')
    if(!isEmail){
      purchases = purchases.filter((obj)=> {
        if(obj.email.match(er) != null && obj.email.match(er).index === 0 ){
          return true;
        }
        return false;
      });
    }else{
      purchases = purchases.filter((obj)=> {
        if(obj._id.match(er) != null && obj._id.match(er).index === 0 ){
          return obj;
        }
        return false;
      });
    }
  }

  return (
      <div>
          <div className= "mb-5 d-flex justify-content-end">
            <h5 className= "mr-3 mt-2">Buscar por: </h5>
            <Button className = "mr-2" variant="contained" onClick = {()=>{handleClick()}} color="primary" disabled={isEmail}>
              ID
            </Button>
            <Button className = "mr-3"  variant="contained" onClick = {()=>{handleClick()}} color="secondary" disabled={!isEmail}>
              Email
            </Button>
            <TextField
              className = "mr-2" 
              id="outlined-secondary"
              label="Buscar"
              variant="outlined"
              color="primary"
              onChange={e=>{handleChange(e)}}
              value = {search}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                    <SearchIcon/> 
                  </IconButton>
                </InputAdornment>
                ),
              }}
  
            />
          </div>
          <PurchasesTable purchases = {purchases}></PurchasesTable>
      </div>
  )
}

function Row(props) {
  const { row , handleChange} = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow  key = {row.id+"user"} className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.date_operation}</TableCell>
        <TableCell align="right">{row.hour_operation}</TableCell>
        <TableCell align="right">
            {
              row.is_pay === "true" ? <CheckCircleOutlineIcon/> : 
              <CancelIcon/>
          }  
        </TableCell>
        <TableCell align="right">
            {
              row.status === "true" ? <CheckCircleOutlineIcon/> : 
              <Switch
              checked={false}
              onChange={()=>{
                handleChange(row);
              } 
              }
              color="primary"
              name="checkedB"
              inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          }  
        </TableCell>
      </TableRow>
      <TableRow key = {row.id+"product"}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Precio (MXN)</TableCell>
                    <TableCell align="right">Precio Total (MXN)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow) => (
                    <TableRow key={productRow.name+"product"}>
                      <TableCell component="th" scope="row">
                        {productRow.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {productRow.amount}
                      </TableCell>
                      <TableCell scope="row" align="right">{productRow.cost}</TableCell>
                      <TableCell align="right">{productRow.cost * productRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date_operation: PropTypes.string.isRequired,
    hour_operation: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.any.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};


export default function PurchasesTable(props) {
  const dispatch = useDispatch();
  const {purchases} = props;
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleChange = (purchase) => {
    setOpenModal(true);
    dispatch(purchaseSetActive(purchase));
  };

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>

            <TableCell align="left">ID COMPRA</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Hora</TableCell>
            <TableCell align="right">Pagado</TableCell>
            <TableCell align="right">Entregado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((row) => (
            <Row open = {open} setOpen = {setOpen} handleChange= {handleChange} key={row._id+"row"} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <AlertDialogSlide open = {openModal} setOpen={setOpenModal}/>
    </>
  );
}
