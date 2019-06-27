import React, { Component } from 'react';

import { Link, NavLink, withRouter } from 'react-router-dom';



class Navbar extends Component{ 

   render() {
     
        return(       
        
            <nav className="navbar d-block navbar-dark mb-5">
                <div className="navbar">
                    <Link to="/" className="navbar-brand justify-content-between align-items-center"><h2 className="d-inline mr-2 owner-span">RO</h2><span className='owner-span'><i className="fas fa-desktop"></i></span><h2 className="d-inline ml-2 owner-span">OM</h2></Link>
                    <ul className="nav justify-content-center">
                        <li className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/"><i className="fas fa-home" title="Home"></i></NavLink></li>
                        <li className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/about"><i className="fas fa-users" title="About"></i></NavLink></li>
                        <li className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/contact"><i className="fas fa-envelope" title="Contact"></i></NavLink></li>                    
                        { !this.props.isAuthenticatedRoutes
                        ?
                        
                        <li key="loginFalse" className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/login"><i className="fas fa-sign-in-alt" title="Log in"></i></NavLink></li>
                        :
                        null
                        }
                        { this.props.isAuthenticatedRoutes
                        ?
                        [
                        <li key="logoutTrue" className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/logout"><i className="fas fa-sign-out-alt" title="Log out"></i></NavLink></li>,
                        <li key="dashboardTrue" className="nav-item"><NavLink className="navbar-brand d-flex align-items-center" to="/dashboard"><i className="fas fa-tachometer-alt" title="Dashboard"></i></NavLink></li>,
                        <li key="userTrue" className="nav-item"><NavLink className="navbar-brand d-flex align-items-center user" to="#"><i className="fas fa-user" title={this.props.user + ' Logged in'}></i></NavLink></li>
                        ]
                        :
                        null
                        }
                    </ul>
                </div>
            </nav>
    
        )
    }
}




export default withRouter((Navbar))