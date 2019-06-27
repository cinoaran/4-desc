import React, { Component } from 'react';
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Page404 from './components/Page404/Page404';
import Navbar from './components/Partials/Navbar';
import Footer from './components/Partials/Footer';
import Dashboard from './components/Dashboard';
import CreateOwner from './components/CreateOwner';
import './App.css';



class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <React.Fragment>      
       <Navbar />
         <div className="container">
          <Switch>
            <Route exact path="/" component = {Home} />
            <Route path="/about" component = {About} />
            <Route path="/contact" component = {Contact} />
            <Route path="/login" component = {Login} />
            <Route path="/logout" component = {Logout} />
            <Route path="/dashboard" component = {Dashboard} />
            <Route path="/create" component = {CreateOwner} />
            <Route component={Page404} />             
          </Switch>
          </div>
        <Footer/> 
        </React.Fragment>
      </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
