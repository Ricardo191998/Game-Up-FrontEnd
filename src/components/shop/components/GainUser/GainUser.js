import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {startUserGainLoaded , startUserInfoLoaded } from '../../../../actions/auth';
import moment from 'moment';
import 'moment/locale/es';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import useStyles from './styles';
import {Gains} from './components/Gains'

export const GainUser = () => {
    const { gain_info } = useSelector( state => state.client );
    const { user_info } = useSelector( state => state.client );
    const classes = useStyles();
    const dispatch = useDispatch();
    moment.locale('es'); 
    let total = 0;

    if(user_info == null){
        dispatch( startUserInfoLoaded() );
    }

    if( gain_info == null){
        dispatch( startUserGainLoaded() );
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
                    gain_info.length <= 0 ? 
                    <div className="alert alert-dark mt-1" role="alert">
                       Aún no generan tus embajadores!
                    </div> : <Gains gain= {gain_info}></Gains>
                }
            </div>
        )
    }
    
}
