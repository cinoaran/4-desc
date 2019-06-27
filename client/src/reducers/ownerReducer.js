import { GET_OWNER_DATA, OWNER_DATA_LOADING } from '../actions/types/constTypes'

    const initState = { 
        data: {},
        loading: false  
        
    }

    export default (state = initState, action) => {       
        
        switch(action.type){

        case GET_OWNER_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false                
            };

        case OWNER_DATA_LOADING:
            return {
                ...state,
                loading: true
            };

        default: 
            return state 
        }      
    }