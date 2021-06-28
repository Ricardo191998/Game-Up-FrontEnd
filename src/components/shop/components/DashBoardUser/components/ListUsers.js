import React from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

export const ListUsers = (props) => {
     
    const { users } = props;
    
    return (
        <div>
        <AppBar position="static" className="mt-5 mb-3">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
              Lista de Usuarios invitados
              </Typography>
            </Toolbar>
          </AppBar>
        <UsersTable users = {users}></UsersTable>
        </div>
    )
}

const columns = [
  { id: 'name', label: 'Name', minWidth: 140 },
  { id: 'lastname', label: 'LastName', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 140,
    align: 'right',
  },
  {
    id: 'type_user',
    label: 'Rol',
    minWidth: 110,
    align: 'right',
  }
];


export default function UsersTable(props) {
  const classes = useStyles();
  const {users} = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { typeof users != 'undefined'?(
              users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                    })}
                  </TableRow>
                );
              })
            ): <TableRow> <TableCell>...Wait </TableCell></TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={!!users ? users.length: 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    
  );
}
