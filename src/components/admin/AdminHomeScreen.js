import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';

import {Dashboard} from './Dashboard/Dashboard';
import {Products} from './Products/Products';
import {Purchases} from './Purchases/Purchases';
import {Users} from './Users/Users';

import {
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';



import useStyles from './styles';

import { startLogout } from '../../actions/auth';
import { DashBoardUser } from './User/UserDetail';

export default function AdminScreen(){
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const data = [
       {text: 'Inicio',component : <PeopleIcon/>, url : "/admin"}, 
       {text: 'Usuarios',component : <PeopleIcon/>, url : "/admin/users"}, 
       {text: 'Productos', component: <ShoppingCartIcon/> , url: "/admin/products"}, 
       {text: 'Compras', component: <MonetizationOnIcon/>,  url: "/admin/purchases"}, 
       ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = ()=>{
    dispatch( startLogout() );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Game Up
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path="/admin/home" component={Dashboard} />
          <Route path="/admin/products" component={Products} />
          <Route path="/admin/purchases" component={Purchases} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/user_detail" component={DashBoardUser} />
          <Redirect to="/admin/home" />  
        </Switch>
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {data.map((obj, index) => (
            <Link key={"sl"+obj.text} to = {obj.url}>
              <ListItem button key={obj.text}>
                  <ListItemIcon>{obj.component}</ListItemIcon>
                  <ListItemText primary={obj.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem onClick={handleLogout} button key={'logout'}>
              <ListItemIcon>
                    <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary={'logout'} />
            </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
