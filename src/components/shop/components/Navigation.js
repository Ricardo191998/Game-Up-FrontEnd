import React from 'react'
import { Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
      color: "#fffff",
  }
}));


export const Navigation = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link className="text-white" to="/">Game Up</Link>
                </Typography>
                <Button ><Link  className="p-3 mb-2 bg-dark text-white" to='/login'>INICIA SESIÓN</Link> </Button>
            </Toolbar>
            </AppBar>
        </div>
    )
}
