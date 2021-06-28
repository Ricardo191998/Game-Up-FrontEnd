import React from 'react'
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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './styles';

export const PurchaseUser = (props) => {
    
  const { purchases } = props;
    

  return (
      <div>
          <AppBar position="static" className="mt-5 mb-3">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
              Compras de usuario
              </Typography>
            </Toolbar>
          </AppBar>
          <PurchasesTable className="mb-5 " purchases = {purchases}></PurchasesTable>
      </div>
  )
}


function Row(props) {
  const { row } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.date_operation}</TableCell>
        <TableCell align="right">{row.hour_operation}</TableCell>
        <TableCell align="right">
            {
              row.status === "true" ? <CheckCircleOutlineIcon/> : <CancelIcon/>
            } 
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Productos
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
                    <TableRow key={productRow.name}>
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
    email: PropTypes.string,
    name: PropTypes.string,
    date_operation: PropTypes.string.isRequired,
    hour_operation: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        cost: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};


export default function PurchasesTable(props) {
  const {purchases} = props;
  const [open, setOpen] = React.useState(false);
 

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Hora</TableCell>
            <TableCell align="right">Entregado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((row) => (
            <Row open = {open} setOpen = {setOpen}  key={row._id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
