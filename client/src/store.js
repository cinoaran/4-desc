import { createStore, applyMiddleware, compose  } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import rootReducer from './reducers/rootReducer';

const jwtToken = localStorage.getItem('token');
const userData = localStorage.getItem('user');

axios.defaults.headers.common['Authorization'] = jwtToken;

const store = createStore(
    rootReducer,{
      auth:{
          token: jwtToken,
          isAuthenticated: jwtToken ? true: false,
          user: userData ? userData: null
         
      }
  }, 
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      ));

export default store;