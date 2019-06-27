import { GET_MANAGEMENT_DATA, MANAGEMENT_DATA_LOADING } from '../actions/types/constTypes'

    const initState = { 
        data: {},
        loading: false  
        
    }

    export default (state = initState, action) => {       
        
        switch(action.type){

        case GET_MANAGEMENT_DATA:
            return {
                ...state,
                data: action.payload,
                loading: false                
            };

        case MANAGEMENT_DATA_LOADING:
            return {
                ...state,
                loading: true
            };

        default: 
            return state 
        }      
    }