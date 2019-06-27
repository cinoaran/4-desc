import { 
    CONTACT_SUCCESS,
    CONTACT_FAIL,
    CONTACT_CLEAR } from '../actions/types/constTypes';

    const initState = {
        msg: {}     
    }

    export default (state = initState, action) => {

        switch(action.type){               
       
            
        case CONTACT_SUCCESS:                    
            return {
                    ...state,
                    msg: action.payload.msg

                    
                };
        
        case CONTACT_FAIL:              
                return {
                    ...state
                };

        case CONTACT_CLEAR:
                return {
                    ...state,
                    msg: {}
                };


        default: 
            return state 
        }      
    }
