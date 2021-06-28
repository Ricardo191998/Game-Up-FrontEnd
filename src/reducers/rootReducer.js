import { combineReducers } from 'redux';

//import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';
import {productReducer} from './productReducer';
import {userReducer} from './userReducer';
import {purchaseReducer} from './purchaseReducer';
import {userAuthReducer} from './clientReducer'
import { shopReducer } from './shopReducer';

export const rootReducer = combineReducers({
    // ui: uiReducer,
    card : shopReducer,
    purchases: purchaseReducer,
    users:  userReducer,
    products : productReducer,
    auth: authReducer,
    client : userAuthReducer
})

