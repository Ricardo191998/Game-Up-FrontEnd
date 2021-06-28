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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import useStyles from './styles';

export const Gains = (props) => {
    
  const { gain } = props;
    

  return (
      <div>
          <AppBar position="static" className="mt-5 mb-3">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                Registro de ganancias por compra de usuario invitado
              </Typography>
            </Toolbar>
          </AppBar>
          <GainTable className="mb-5 " gain = {gain}></GainTable>
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
        <TableCell align="right">{row.user_buy.name}</TableCell>
        <TableCell align="right">{row.user_buy.email}</TableCell>
        <TableCell align="right">
            {row.amount.toFixed(2)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles de compra
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Pago de Usuario total (MXN)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.purchases.date_operation}>
                      <TableCell component="th" scope="row">
                        {row.purchases.date_operation}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.purchases.amount}
                      </TableCell>
                    </TableRow>
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
    amount: PropTypes.number,
    purchases: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        date_operation: PropTypes.string.isRequired,
        }),
    user_buy: 
        PropTypes.shape({
          email: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
  }).isRequired,
};


export default function GainTable(props) {
  const {gain} = props;
  const [open, setOpen] = React.useState(false);
 

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Nombre Usuario</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Ganancia (MXN)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gain.map((row) => (
            <Row open = {open} setOpen = {setOpen}  key={row._id} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
