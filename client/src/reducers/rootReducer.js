import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import managementReducer from './managementReducer';
import contactReducer from './contactReducer';
import ownerReducer from './ownerReducer';


const rootReducer = combineReducers({  
    management: managementReducer,
    auth: authReducer,
    error: errorReducer,
    contact: contactReducer,
    owner: ownerReducer

   
})

export default rootReducer;