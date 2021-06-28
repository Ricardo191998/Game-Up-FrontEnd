import React, { useEffect } from 'react'
import {
    Switch,
    Redirect
  } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


import { PublicRoute } from '../../router/PublicRoute';
import { LoginScreen } from '../auth/LoginScreen';
import {HomeBody} from '../shop/HomeBody';
import ShopScreen from './components/Shop/ShopScreen';
import { startCheckingUser } from '../../actions/auth';
import { PrivateRoute } from '../../router/PrivateRoute';
import HomeUserScreen from './components/UserScreen/HomeUserScreen';

export const HomeScreen = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.client);
    
    useEffect(() => {
        
        dispatch( startCheckingUser() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <div>
            
            <Switch>
                <PublicRoute 
                        exact 
                        path="/" 
                        component={ HomeBody }
                        isAuthenticated={ !!uid }
                        redirect = "/user"
                />
                <PublicRoute 
                        exact 
                        path="/login" 
                        redirect = "/user"
                        component={ LoginScreen}
                        isAuthenticated={ !!uid }
                />
                <PublicRoute 
                        path="/home" 
                        redirect = "/user"
                        component={ ShopScreen}
                        isAuthenticated={ !!uid }
                />
                <PrivateRoute
                        path="/user" 
                        component={ HomeUserScreen}
                        isAuthenticated={ !!uid }
                />
                <Redirect to="/user" />
            </Switch>
            
        </div>   
    )
}
