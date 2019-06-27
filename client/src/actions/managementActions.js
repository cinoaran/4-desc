import axios from 'axios';
import {     
    GET_MANAGEMENT_DATA,
    MANAGEMENT_DATA_LOADING
} from './types/constTypes';      

// GET MANAGEMENT DATA

export const getManagementData = () => (dispatch) => {

    dispatch(managementDataLoading());
    axios
        .get('/api/management')
        .then(res => {
            dispatch({
                type: GET_MANAGEMENT_DATA,
                payload: res.data
            })
            
        })
        .catch(err => {
            console.log(err)
        })
    
}

export const managementDataLoading = () => {
    return {
        type: MANAGEMENT_DATA_LOADING
    }
}