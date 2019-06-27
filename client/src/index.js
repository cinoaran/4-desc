import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route , Switch} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';



import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Page404 from './components/Page404/Page404';
import Dashboard from './components/Dashboard';
import CreateOwner from './components/CreateOwner';
import authGuard from './components/HOCs/authGuard';


import * as serviceWorker from './serviceWorker';



ReactDOM.render(
<Provider store={store}>    
    <BrowserRouter>      
         <App>
            <Switch>
            <Route exact path="/" component = {Home} />
            <Route path="/about" component = {About} />
            <Route path="/contact" component = {Contact} />
            <Route path="/login" component = {Login} />
            <Route path="/logout" component = {Logout} />
            <Route path="/dashboard" component = {authGuard(Dashboard)} />
            <Route path="/create" component = {authGuard(CreateOwner)} />

            <Route component={Page404} />             
        </Switch> 
          
          </App>        
      </BrowserRouter>    
</Provider>
, document.getElementById('root'));


serviceWorker.unregister();
