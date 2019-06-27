import {  
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL } from '../actions/types/constTypes';

    const initState = {
        token: '',       
        isAuthenticated: false,        
        user: null      
        
    }

    export default (state = initState, action) => {

        switch(action.type){               
       

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:            
            localStorage.setItem('token', action.payload.token);
            if(action.payload.management) {
            localStorage.setItem('user', action.payload.management.logName) 
            };
                return {
                    ...state,
                    token:action.payload.token, 
                    user: (action.payload.management) ?  { logName: action.payload.management.logName }: null,
                    isAuthenticated: true              
                    
                };
        
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('user');            
                return {
                    ...state,
                    token: '',                    
                    user: null,
                    isAuthenticated: false
                }


        default: 
            return state 
        }      
    }
