import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {  useTheme } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import {PaymentScreen} from '../PaymentScreen/PaymentScreen';
import {Products} from '../ProductsScreen/ProductsScreen';
import {DashBoardUser} from '../DashBoardUser/DashBoardUser';
import {GainUser} from  '../GainUser/GainUser';

import { useDispatch } from 'react-redux';

import {
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
  
import {startLogout} from '../../../../actions/auth';
import useStyles from './styles';

export default function HomeUserScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () =>{
    dispatch(startLogout());
  }

  const data = [
    {text : "Inicio", item : <HomeIcon/>,route : "/user/home"},
    {text : "Productos", item : <StorefrontIcon/>,route : "/user/products"},
    {text : "Comprar", item : <ShoppingCartIcon/>,route : "/user/purchase"}
  ]

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
                    <Link className="text-white" to="/">Game Up</Link>
          </Typography>
          <Button onClick={()=>{
            handleLogout()
          }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {data.map((obj) => (
            <Link to= {obj.route}>
            <ListItem button key={obj.text+"row"}>
              <ListItemIcon key={obj.text+"icon"} >{obj.item}</ListItemIcon>
              <ListItemText key={obj.text+"text"} primary={obj.text} />
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
        <Route
                exact
                path="/user"
                render={() => <Redirect to="/user/home" />}
            />
          <Route path="/user/home" component={DashBoardUser} />
          <Route path="/user/products" component={Products} />
          <Route path="/user/purchase" component={PaymentScreen} />
          <Route path="/user/gain" component={GainUser} />
        </Switch>
      </main>
    </div>
  );
}
