import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
  } from 'react-router-dom';
  
import { useDispatch, useSelector } from 'react-redux';

import { LoginAdminScreen } from '../components/auth/LoginAdminScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { HomeScreen } from '../components/shop/HomeScreen';
import AdminScreen from '../components/admin/AdminHomeScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);
    
    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div>
                <Switch>
                    <Route
                        exact
                        path="/admin"
                        render={() => <Redirect to="/admin/home" />}
                    />
                    <PrivateRoute    
                        path="/admin" 
                        component={ AdminScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                            exact 
                            path="/login/admin" 
                            redirect = "/admin"
                            component= { LoginAdminScreen}
                            isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        path="/" 
                        redirect = "/admin"
                        component={ HomeScreen } 
                        isAuthenticated={ !!uid }
                    />

        
                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
