import React, {useEffect, useState} from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from "react-router-dom";


import Divider from '@material-ui/core/Divider';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import CreateDialog from './components/AddUsers';
import {userStartLoading, userSetActive} from '../../../actions/users';
import DialogUser from './components/DialogUpdateUser';
import DialogDeleteUser from './components/DialogDeleteUser';


export const Users = () => {
    
  const dispatch = useDispatch();
  
  let { users } = useSelector( state => state.users );
    
  const [isEmail, setisEmail] = useState(true);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
        
      dispatch( userStartLoading() );

  }, [ dispatch ])
    
    const handleClickOpen = () =>{
      setOpen(true)
    };

    const handleClick = ()=>{
      setisEmail(!isEmail);
    }
  
    const handleChange = (e)=>{
      setSearch(e.target.value);
    }
  
    if(search.length > 0){
      let er = new RegExp(search, 'i')
      if(!isEmail){
        users = users.filter((obj)=> {
          if(obj.email.match(er) != null && obj.email.match(er).index === 0 ){
            return true;
          }
          return false;
        });
      }else{
        users = users.filter((obj)=> {
          if(obj.invitation_code.match(er) != null && obj.invitation_code.match(er).index === 0 ){
            return obj;
          }
          return false;
        });
      }
    }

    return (
        <div>
            <Fab onClick = {()=>{handleClickOpen()}} color="primary" aria-label="add" >
                <AddIcon />
            </Fab>

            <div className= "mb-5 d-flex justify-content-end">
            <h5 className= "mr-3 mt-2">Buscar por: </h5>
            <Button className = "mr-2" variant="contained" onClick = {()=>{handleClick()}} color="primary" disabled={isEmail}>
              Código embajador
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
            
            {
              typeof users != 'undefined'? <UsersTab users = {users}></UsersTab> : <LinearProgress className= "mt-5" />
            }
            
            <CreateDialog
              open={open}
              setOpen={setOpen}
            />
        </div>
    )
}

function Row(props) {
  const { row, setOpenModal,  setUser } = props;
  const dispatch = useDispatch();
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [deleteUserOpen, setDeleteUserOpen] = React.useState(false);
  
  const handleDelete = (user)=>{
    dispatch(userSetActive(user));
    setDeleteUserOpen(true);
 }

  const handleRedirect = (user_id)=>{
    localStorage.setItem('user_client_id', user_id);
    history.push('/admin/user_detail');
  }

 const handleUpdate = (user)=>{
   setUser(user);
   setOpenModal(true);
 }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.lastname}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.invitation_code}</TableCell>
        <TableCell align="right">{row.type_user}</TableCell>
        <TableCell  align="right"key={row._id}>
            <Button onClick = {()=>{
              handleRedirect(row._id);
            }}>
              <VisibilityIcon/>
            </Button>
            <Fab onClick = {()=>{
                  handleUpdate(row);
                  }}className = {classes.icon} color="primary" aria-label="edit">
              <EditIcon />
            </Fab>
            <Fab onClick = {()=>{
              handleDelete(row)
            }} className = {classes.icon} color="secondary" aria-label="delete">
              <DeleteIcon />
            </Fab>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Invitó
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Código Embajador</TableCell>
                    <TableCell align="right">Rol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={"iv"+row.user_invite.name}>
                      <TableCell component="th" scope="row">
                        {row.user_invite.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.user_invite.email}
                      </TableCell>
                      <TableCell scope="row" align="right">{row.user_invite.invitation_code}</TableCell>
                      <TableCell align="right">{row.user_invite.type_user}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Inivitados
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell align="right">Código Embajador</TableCell>
                    <TableCell align="right">Rol</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.invite_users.map((userRow) => (
                    <TableRow key={userRow.name}>
                      <TableCell component="th" scope="row">
                        {userRow.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {userRow.email}
                      </TableCell>
                      <TableCell scope="row" align="right">{userRow.invitation_code}</TableCell>
                      <TableCell align="right">{userRow.type_user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DialogDeleteUser open = {deleteUserOpen} setOpen = {setDeleteUserOpen}></DialogDeleteUser>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};


function UsersTab(props) {
  const {users} = props;
  const [open, setOpen] = React.useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const [user, setUser] = useState({});

  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Apellido</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Código Embajador</TableCell>
            <TableCell align="right">Rol</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Row open = {open} setOpen = {setOpen}  key={row._id} row={row}  setOpenModal={setOpenModal} setUser={setUser} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {
      !!user.name?<DialogUser open={openModal} setOpen={setOpenModal} setUser={setUser} user={user}></DialogUser>:<Divider/>
    }
    </>
  );
}