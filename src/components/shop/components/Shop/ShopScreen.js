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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Button from '@material-ui/core/Button';
import {  useTheme } from '@material-ui/core/styles';

import {PaymentScreen} from '../PaymentScreen/PaymentScreen';
import {Products} from '../ProductsScreen/ProductsScreen';

import {
    Switch,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';
  

import useStyles from './styles';

export default function ShopScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const data = [
    {text : "Productos", item :<StorefrontIcon/>,route : "/home/products"},
    {text : "Comprar", item : <ShoppingCartIcon/>,route : "/home/purchase"}
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
            color="danger"
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
                <Button ><Link  className="p-3 mb-2 bg-dark text-white" to='/login'>INICIA SESIÓN</Link> </Button>
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
            <Link key={"df"+obj.text} to = {obj.route}>
              <ListItem button key={"df"+obj.text}>
                <ListItemIcon>{obj.item}</ListItemIcon>
                <ListItemText primary={obj.text} />
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
                path="/home"
                render={() => <Redirect to="/home/products" />}
            />
          <Route exact path="/home/products" component={Products} />
          <Route path="/home/purchase" component={PaymentScreen} />
        </Switch>
      </main>
    </div>
  );
}
