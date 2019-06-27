import axios from 'axios';
import {     
    GET_OWNER_DATA,
    OWNER_DATA_LOADING
} from './types/constTypes';  

// GET OWNER DATA

export const addOwnerData = (owner) => (dispatch, getState) => {
    
    
    const user = getState().auth

    console.log(user.token)
    
    // Headers

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    if(user) {
        config.headers['x-auth-token'] = user.token       
        const body = JSON.stringify( owner);
    
        axios
                .post('http://localhost:9000/api/owner', body, config)
                .then(res => {
                    dispatch({
                        type: GET_OWNER_DATA,
                        payload: res.data
                    })
                    
                })
                .catch(err => {
                    console.log(err)
                })
    }
}

export const ownerDataLoading = () => {
    return {
        type: OWNER_DATA_LOADING
    }
}