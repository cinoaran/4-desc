import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from './Partials/Navbar';
import Footer from './Partials/Footer';
import { getManagementData } from '../actions/managementActions';

import '../App.css';

class App extends Component {
  componentDidMount() {
    this.props.getManagementData(); 
  }

  render() { 
    
    return (
      <div>
      <Navbar isAuthenticatedRoutes = {this.props.isAuthenticated} user={(this.props.user) ? this.props.user.logName : this.props.user}/>
        <div className="container">
          { this.props.children}
        </div>
        
        <Footer/>
       
      </div>
    )
  }
}

const mapStateToProps = state => ({ 

  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
  
});

export default connect(mapStateToProps, { getManagementData })(App);
