import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import moment from 'moment';
import 'moment/locale/es';

import {startUserInfoLoaded, startUserGainLoaded } from '../../../actions/auth';
import { ListUsers } from '../../shop/components/DashBoardUser/components/ListUsers';
import { PurchaseUser } from '../../shop/components/DashBoardUser/components/PurchaseUser';
import {Gains} from '../../shop/components/GainUser/components/Gains';
import useStyles from './styles';

export const DashBoardUser = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    let total = 0;
    let compro = false;
    const { user_info } = useSelector( state => state.client );
    const { gain_info } = useSelector( state => state.client );
    
    moment.locale('es'); 
    let user_id = localStorage.getItem('user_client_id');

    if(user_info == null || user_id !== user_info._id){
        dispatch( startUserInfoLoaded(user_id) );   
    }

    if( gain_info == null){
        dispatch( startUserGainLoaded(user_id) );
    }

    if(user_info!= null){
        let actual_year = moment().format('YYYY');
        let actual_month = moment().format('MM');
        let month_ago = (actual_month-1).toString();

        if(actual_month.length === 1){
            actual_month = `0${actual_month}`;
        }

        if(month_ago.length === 1){
            month_ago= `0${month_ago}`;
        }

        if(user_info.gain.length > 0 && total === 0 ){
            user_info.gain.map((obj)=>{
                if(obj.date_operation > `${actual_year}${month_ago}26` &&
                   obj.date_operation <= `${actual_year}${actual_month}26`){
                    total += obj.amount; 
                }
                return 0;
            });
        }
        
        for(let i = 0; i< user_info.purchases.length ; i++){
            if(moment(user_info.purchases[i].createdAt).format('YYYYMMDD') > `${actual_year}${month_ago}26` && 
            moment(user_info.purchases[i].createdAt).format('YYYYMMDD') <= `${actual_year}${actual_month}26` ){
                if(user_info.purchases[i].is_pay === "true"){
                    compro =  true;
                    break;
                }
            }
        }

        total = parseFloat(total).toFixed(2);
    
    }
    
    if(user_info==null || gain_info == null){
        return(
            <div>
                <CircularProgress />
            </div>
        )
    }else{
        
        return (

            <div>

                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                    <Avatar className={classes.orange} >{user_info.name[0].toUpperCase()}</Avatar>
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                {user_info.name + " " + user_info.lastname}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {user_info.email}
                                </Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>

                    {
                       compro ? 
                            <div class="p-3 mb-2 bg-danger text-white">El usuario no ha comprado en el ultimo mes!</div>
                        : <br/>
                    }

                    <AppBar position="static" className={classes.appBar} style={{display: 'flex', alignItems: 'center'}}>
                        <Toolbar variant="dense">
                            <AccountBalanceWalletIcon edge="start" className = "mt-3 mr-5" style={{ fontSize: 40 }} />
                            <div className = "mr-5 ml-5 mt-4">
                                <Typography variant="h3"  color="inherit">
                                    Ganancias 
                                </Typography>
                                <Typography  className= "ml-5 mb-3" variant="h6"  color="inherit">
                                    {moment().format('MMMM YYYY')}
                                </Typography>
                            </div>
                            <Typography variant="h3" className = "mr-5 ml-4 mt-3" color="inherit">
                              ${total}
                            </Typography>
                        </Toolbar>
                    </AppBar>

                {
                    user_info.purchases.length <= 0 ? 
                    <div className="alert alert-dark mt-1" role="alert">
                       Aún no haces ninguna compra!
                    </div> : <Gains gain= {gain_info}></Gains>
                }    
                    

                {
                    user_info.purchases.length <= 0 ? 
                    <div className="alert alert-dark mt-1" role="alert">
                       Aún no haces ninguna compra!
                    </div> : <PurchaseUser purchases= {user_info.purchases}></PurchaseUser>
                }
                {
                    user_info.invite_users.length <= 0 ? <div className="alert alert-dark mt-5" role="alert">
                    Aún no invitas a ningún usuario!
                  </div>: <ListUsers users = {user_info.invite_users}></ListUsers>
                }
            </div>
        )
    }
    
}
