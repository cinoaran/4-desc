import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  
  render() {
    const actualUser = localStorage.getItem('user');
    return (
      <div className="container">
        <div className="card p-4 text-center">
          <h5>Welcome to Dashboard <strong>{ actualUser }</strong></h5>
          <div className="row">
        <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-desktop"></i></h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <Link to="/create" className="btn btn-primary btn-sm btn-block">Create new owner</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="far fa-clock"></i></h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><i className="fas fa-chart-line"></i></h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
            </div>
          </div>
        </div>       
        </div>
      </div>
    )
  }
}

export default Dashboard;
