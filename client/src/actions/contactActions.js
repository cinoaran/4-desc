import axios from 'axios';
import  { returnErrors } from './errorActions';
import {     
    CONTACT_FAIL,
    CONTACT_SUCCESS,
    CONTACT_CLEAR
} from './types/constTypes';      



// Contact data send

export const sendContactData = ({ name, lastName, mail, comment }) => dispatch =>{

   

    const body = { name, lastName, mail, comment };
    

    axios
        .post('/api/management/contact', body)
        .then(res =>
            
            dispatch({
                type: CONTACT_SUCCESS,
                payload: res.data
        }))
        .catch (err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, 'CONTACT_FAIL'));
            dispatch({
                type: CONTACT_FAIL                
            });

        })
    }
    // Clear Errors

    export const clearContact = () => {
        return {
            type: CONTACT_CLEAR
        }
    }


