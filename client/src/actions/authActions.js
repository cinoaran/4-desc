import axios from 'axios';
import  { returnErrors } from './errorActions';
import {     
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from './types/constTypes';      

// Logout User

export const logout = (dispatch) => {
    
    return{
        type: LOGOUT_SUCCESS
    }
}

// Login User

export const login = ({ mail, password }) => dispatch =>{

    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify( { mail, password });

    axios
        .post('/api/auth/management', body, config)
        .then(res => 
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
        }))
        .catch (err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL                
            });

        })
}

 // Setup config/headers and token



export const tokenConfig = (getState) => {
  
        // Get token from LocalStorage to send it along axios getState().auth.user.token
        const token = getState().auth.user;

        // Headers     
        const config = {
            headers: {
                "Content-type": 'application/json'
            }
        }
    
        // Check for token and add it to headers
    
        if(token) {
            config.headers['x-auth-token'] = token
        }
}
